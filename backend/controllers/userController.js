import User from "../models/User.js";
import userService from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.registerUser({ name, email, password });
    return successResponse(
      res,
      "User registered successfully",

      { ...user, token: generateToken(user._id) },
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (user) {
      return successResponse(
        res,
        "Login successful",
        { ...user, token: generateToken(user._id) },
        200
      );
    }
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

// @desc forgot password
// @route POST /api/users/forgot-password
// @access Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return errorResponse(res, "User not found", 404);
  }
  // Here you would typically generate a reset token and send an email
};

// @desc reset password
// @route POST /api/users/reset-password
// @access Public
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // Here you would typically verify the reset token and update the password

  return successResponse(res, "Password reset successful", {}, 200);
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);

  if (user) {
    return successResponse(
      res,
      "User profile fetched successfully",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
      },
      200
    );
  } else {
    return errorResponse(res, "User not found", 404);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(
      req.user._id,
      req.body
    );

    return successResponse(
      res,
      "User profile updated successfully",
      updatedUser,
      200
    );
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
};
