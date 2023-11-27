import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Put,
  Param,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import connectDB from 'utils/database';
import { Request } from 'express';
import { CreateOneProduct } from './dtos/createproduct.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async getProducts(@Query() options) {
    await connectDB();
    let products = await this.productsService.getProducts(options);
    return products;
  }
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    await connectDB();
    let product = await this.productsService.getProduct(id);
    return product;
  }
  @Post()
  async setProduct(@Req() req: Request, @Body() data: CreateOneProduct) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let msg = await this.productsService.createProduct(token, data);
    return msg;
  }
  @Put(':id')
  async updateProduct(
    @Req() req: Request,
    @Body() data,
    @Param('id') id: string,
  ) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let product = await this.productsService.updateProduct(token, id, data);
    return product;
  }
  @Delete(':id')
  async removeProduct(@Req() req: Request, @Param('id') id: string) {
    await connectDB();
    let token = req.headers.authorization.split(' ')[1];
    let msg = await this.productsService.deleteProduct(token, id);
    return msg;
  }
}
