import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { errorResponse, successResponse } from "../utils/response.js";

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return errorResponse(res, "User already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    return successResponse(
      res,
      "User registered successfully",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
      201
    );
  } else {
    return errorResponse(res, "Invalid user data", 400);
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return successResponse(
      res,
      "Login successful",
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
        token: generateToken(user._id),
      },
      200
    );
  } else {
    return errorResponse(res, "Invalid email or password", 401);
  }
});

// @desc forgot password
// @route POST /api/users/forgot-password
// @access Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return errorResponse(res, "User not found", 404);
  }
  // Here you would typically generate a reset token and send an email
});

// @desc reset password
// @route POST /api/users/reset-password
// @access Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  // Here you would typically verify the reset token and update the password

  return successResponse(res, "Password reset successful", {}, 200);
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
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
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();

    return successResponse(
      res,
      "User profile updated successfully",
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      },
      200
    );
  } else {
    return errorResponse(res, "User not found", 404);
  }
});
