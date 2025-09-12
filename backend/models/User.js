import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
  },
  {
    timestamps: true,
  }
);

// Kiểm tra và mã hóa mật khẩu trước khi lưu

userSchema.pre("save", async function (next) {
  // Chỉ mã hóa nếu mật khẩu được thay đổi hoặc mới tạo
  if (!this.isModified("password")) {
    return next();
  }
  // Mã hóa mật khẩu với bcrypt và salt
  // Salt là một chuỗi ngẫu nhiên được thêm vào mật khẩu trước khi băm để tăng cường bảo mật
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next() được gọi để tiếp tục quá trình lưu trữ
  next();
});

// Phương thức để so sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
