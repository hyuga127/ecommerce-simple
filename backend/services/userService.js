import userResponse from "../mappers/userMapper.js";
import User from "../models/User.js";

const updateUserProfile = async (userId, userData) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.name = userData.name || user.name;
  user.email = userData.email || user.email;
  user.avatar = userData.avatar || user.avatar;

  const updatedUser = await user.save();
  return userResponse(updatedUser);
};

const registerUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const user = await User.create(userData);
  if (!user) {
    throw new Error("Invalid user data");
  }

  return userResponse(user);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return userResponse(user);
  } else {
    throw new Error("Invalid email or password");
  }
};

export default {
  updateUserProfile,
  registerUser,
  loginUser,
};
