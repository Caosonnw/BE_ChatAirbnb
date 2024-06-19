import express from "express";
import {
  getUser,
  saveUser,
  getUserById,
  getUserByIDParam,
  getListFriends,
  searchUserById,
  addFriend,
  changeStatusLogin,
  changeStatusLogout,
  unFriend,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-user", getUser);
userRouter.post("/save-user", saveUser);
userRouter.get("/get-user-by-id", getUserById);
userRouter.get("/get-user-by-id-param/:id", getUserByIDParam);
userRouter.get("/get-list-friends/:id", getListFriends);
userRouter.get("/search-user-by-id/:id", searchUserById);
userRouter.post("/add-friend/:id/:friend_id", addFriend);
userRouter.put("/change-status-login", changeStatusLogin);
userRouter.put("/change-status-logout", changeStatusLogout);
userRouter.delete("/unfriend/:id/:friend_id", unFriend);

export default userRouter;
