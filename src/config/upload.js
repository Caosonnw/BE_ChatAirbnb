// yarn add multer
import multer, { diskStorage } from "multer";
// khai báo nơi lưu
// đổi tên file
export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img", // qui định url chưa lưu file
    filename: (req, file, callback) => {
      // DD / MM / YYYY hh:mm:ss:ms
      // get milisecond => 1/1/1970
      let mSecond = new Date().getTime();
      // đổi tên file
      callback(
        null,
        mSecond +
          "_" +
          Math.round(Math.random() * 1e9) +
          "_" +
          file.originalname
      ); // => function convert char special
    },
  }),
});
