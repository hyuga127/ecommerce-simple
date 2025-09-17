import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Fuse from "fuse.js";

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

const searchByKeyword = async (keyword) => {
  const products = await getAllProducts();

  if (keyword) {
    // Giải thích: Sử dụng Fuse.js để tìm kiếm sản phẩm theo từ khóa (keys) và độ chính xác (threshold)
    // keys: Các trường trong sản phẩm để tìm kiếm (ví dụ: name, description, brand)
    // threshold: Độ chính xác của kết quả tìm kiếm (giá trị từ 0 đến 1, càng thấp càng chính xác)
    const fuse = new Fuse(products, {
      keys: ["name", "description", "brand"],
      threshold: 0.5,
    });
    const results = fuse.search(keyword);
    const matchedProducts = results.map((result) => result.item);
    return matchedProducts;
  } else {
    return products;
  }
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

export default {
  insertOneProduct,
  insertMultiProducts,
  getProductById,
  searchByKeyword,
  getAllProducts,
};
