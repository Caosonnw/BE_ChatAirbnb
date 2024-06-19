// yarn add jsonwebtoken
import jwt from "jsonwebtoken";

// Tạo token
export const createToken = (data) => {
  return jwt.sign({ data: data }, "BI_MAT", { expiresIn: "5y" });
};

// Kiểm tra token
// export const checkToken = (token) => {
//   return jwt.verify(token, "BI_MAT", (error) => {
//     return error;
//   });
// };
export const checkToken = (token) =>
  jwt.verify(token, "BI_MAT", (error) => error);

// Tạo refresh token
export const createTokenRef = (data) => {
  return jwt.sign({ data: data }, "BI_MAT_REF", { expiresIn: "30d" });
};

// Check refresh token
export const checkTokenRef = (token) =>
  jwt.verify(token, "BI_MAT_REF", (error) => error);

// Giải mã token
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;

  let error = checkToken(token);

  if (error == null) {
    // check token
    next();
    return;
  }
  res.status(401).send(error.name);
};
