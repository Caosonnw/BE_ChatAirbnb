import nodemailer from "nodemailer";

export const sendMail = (to, subject, text) => {
  let configMail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zzadsonprok@gmail.com",
      pass: "hrcvjzdgebzzujus",
      // tách ra biến môi trường .env
    },
  });
  let infoMail = {
    from: "zzadsonprok@gmail.com",
    to,
    subject,
    text,
  };
  return configMail.sendMail(infoMail, (err) => err);
};
