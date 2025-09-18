import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Categories", categorySchema);

export default Category;
