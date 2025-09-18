import Category from "../models/Category.js";

const createCategory = async (categoryData) => {
  const { name, description } = categoryData;
  const category = new Category({ name, description });
  const savedCategory = await category.save();
  return savedCategory;
};

const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

const updateCategory = async (id, categoryData) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
  return updatedCategory;
};

const deleteCategory = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  return deletedCategory;
};

export default {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
