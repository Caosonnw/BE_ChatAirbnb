export const response = (res, data, message, statusCode) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    data: data,
    message: message,
    date: new Date(),
  });
};
