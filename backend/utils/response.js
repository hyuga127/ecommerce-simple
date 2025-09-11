export const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    code: statusCode,
    message,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    data: null,
  });
};
