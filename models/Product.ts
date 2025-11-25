import mongoose, { Schema, Document, models } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image: string;
  category: string;
  highlight?: string;
  description?: string;
  price: number;
  discount: number;
  stock: number;
  ratings?: number;
  totalReviews?: number;
  createdAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    highlight: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Virtual to check if product is new (added in last 7 days)
ProductSchema.virtual("isNew").get(function (this: IProduct) {
  if (!this.createdAt) return false;
  const daysSinceCreation =
    (Date.now() - new Date(this.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreation <= 7;
});

const Product = models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
