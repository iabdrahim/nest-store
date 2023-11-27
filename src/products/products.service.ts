import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Product from './product.model';
import { AuthService } from 'src/auth/auth';

@Injectable()
export class ProductsService {
  async getProducts(options: any) {
    let {
      page,
      sort,
      perpage,
      q,
      fields,
      catagorie,
      tags,
      priceRange,
      city,
      userId,
      ids,
    } = options;
    let pg = Number(page) || 1; // Current page number
    let pageLen = +(perpage || 12); // Number of results per page
    let queryObject: any = {};
    if (q) {
      queryObject.name = { $regex: q, $options: 'i' };
    }
    if (catagorie) {
      queryObject.catagorie = catagorie;
    }
    if (userId) {
      queryObject.author = userId;
    }
    if (city) {
      queryObject.city = city;
    }
    if (ids) {
      let idis = (ids as string).split(',');
      let products = await Product.find({ _id: { $in: idis } });
      return products;
    }
    let products = Product.find(queryObject)
      .skip((pg - 1) * pageLen)
      .limit(pageLen);
    if (priceRange) {
      let [min, max] = (priceRange as string).split('-');
      if (!(min == '0' && max == '0') && max > min)
        products.where('price').gte(Number(min)).lte(Number(max));
    }
    if (sort) {
      let sortList = (sort as string).split(',').join(' ');
      products = products.sort(sortList);
    } else {
      products = products.sort('-createdAt');
    }
    if (tags) {
      let tagsList = (tags as string).split(',');
      products = products.where('tags').in(tagsList);
    }

    if (fields) {
      let fieldsList = (fields as string).split(',').join(' ');
      products = products.select(fieldsList);
    }
    let resulte = await products;
    return resulte;
  }
  async getProduct(id: string) {
    let product = await Product.findById(id).populate(
      'author',
      'name _id avatar',
    );
    return product;
  }

  async createProduct(token: string, data: any) {
    let user = await AuthService.prototype.getCurrentUserFromToken(token);

    let product = new Product({
      ...data,
      author: user._id,
    });
    await product.save();
    return product;
  }
  async deleteProduct(token: string, id: string) {
    let user = await AuthService.prototype.getCurrentUserFromToken(token);
    let product = await Product.findOneAndDelete({ _id: id, author: user._id });
    if (!product) {
      throw new HttpException(
        'This product is not found or your not allowed to do this action',
        HttpStatus.NOT_FOUND,
      );
    }
    return 'product is deleted';
  }
  async updateProduct(token: string, id: string, data: any) {
    let user = await AuthService.prototype.getCurrentUserFromToken(token);
    let product = await Product.findOneAndUpdate(
      { _id: id, author: user._id },
      { $set: { ...data } },
    );
    if (!product) {
      throw new HttpException(
        'This product is not found or your not allowed to do this action',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
