import Product from "../models/Product.js";
import Category from "../models/Category.js";

const createProduct = async (productData) => {
  const { name, price, description, thumbnail, categoryId, brand, discount } =
    productData;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  const product = new Product({
    name,
    price,
    description,
    thumbnail,
    categoryId,
    brand,
    discount,
  });
  const savedProduct = await product.save();
  return savedProduct;
};

export default {
  createProduct,
};
