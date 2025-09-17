import Product from "../models/Product.js";
import Category from "../models/Category.js";

const insertOneProduct = async (productData) => {
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

const insertMultiProducts = async (productData) => {
  // Kiểm tra tất cả category trước khi insert
  const categoryIds = productData.map((p) => p.categoryId);
  const categories = await Category.find({ _id: { $in: categoryIds } });
  // if (categories.length !== categoryIds.length) {
  //   console.log(categories, categoryIds);

  //   throw new Error("Some categories not found");
  // }

  // Thêm nhiều product 1 lần
  const savedProducts = await Product.insertMany(productData);
  return savedProducts;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

export default {
  insertOneProduct,
  insertMultiProducts,
  getAllProducts,
};
