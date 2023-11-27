import { models, model, Schema } from 'mongoose';
let ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The product name is required'],
    },
    images: { type: [String], default: [] },
    price: {
      type: Number,
      required: [true, 'ad price must be provided'],
    },
    catagorie: {
      type: String,
      enum: {
        values: [
          'uncategorized',
          'accessories',
          'laptop spare parts',
          'screens',
        ],
        message: '{VALUE} is not supported',
      },
      default: 'uncategorized',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'author is required'],
    },
    tags: [String],
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  },
);
// delete models.Product;

let Product = models.Product;
if (!Product) {
  Product = model('Product', ProductSchema);
}
export default Product;
