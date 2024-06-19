import { response } from "../config/response.js";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

const getUser = async (req, res) => {
  let data = await prisma.users.findMany();

  response(res, data, "Get user success", 200);
};

const saveUser = async (req, res) => {
  const { id, name, email, password, phone, birthday, avatar, gender, role } =
    req.body;

  const [day, month, year] = birthday.split("/");
  const formattedBirthday = `${month}/${day}/${year}`;
  const isoBirthday = new Date(formattedBirthday).toISOString();
  try {
    let user;

    // Tìm kiếm người dùng dựa trên id
    const existingUser = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (existingUser) {
      // Nếu người dùng đã tồn tại, cập nhật thông tin
      user = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
          password: password,
          phone: phone,
          birthday: isoBirthday,
          avatar: avatar,
          gender: gender,
          role: role,
        },
      });
    } else {
      // Nếu người dùng chưa tồn tại, tạo bản ghi mới
      user = await prisma.users.create({
        data: {
          id: id,
          name: name,
          email: email,
          password: password,
          phone: phone,
          birthday: isoBirthday,
          avatar: avatar,
          gender: gender,
          role: role,
        },
      });
    }

    response(res, user, "User saved successfully", 200);
  } catch (error) {
    console.error(error);
    response(res, null, "Failed to save user", 500);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.body;

  try {
    let user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    response(res, user, "Get user by id success", 200);
  } catch (error) {
    response(res, null, "Failed to get user by id", 500);
  }
};

const getUserByIDParam = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  try {
    let user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    response(res, user, "Get user by id success", 200);
  } catch (error) {
    response(res, null, "Failed to get user by id", 500);
  }
};

const getListFriends = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);

  try {
    const friends = await prisma.user_friends.findMany({
      where: {
        OR: [{ id: userId }, { friend_id: userId }],
      },
      include: {
        users_user_friends_idTousers: true,
        users_user_friends_friend_idTousers: true,
      },
    });

    // Chuyển đổi dữ liệu để lấy danh sách bạn bè đúng định dạng
    const listFriends = friends.map((friendship) => {
      if (friendship.id === userId) {
        return friendship.users_user_friends_friend_idTousers;
      } else {
        return friendship.users_user_friends_idTousers;
      }
    });

    response(res, listFriends, "Get friends list success", 200);
  } catch (error) {
    response(res, error, "Failed to get friends list", 500);
  }
};

const searchUserById = async (req, res) => {
  const { id } = req.params;
  const userId = parseInt(id);
  try {
    let user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    response(res, user, "Get user by id success", 200);
  } catch (error) {
    response(res, null, "Failed to get user by id", 500);
  }
};

const addFriend = async (req, res) => {
  const { id, friend_id } = req.params;
  const userId = parseInt(id);
  const friendId = parseInt(friend_id);

  try {
    let friendship = await prisma.user_friends.create({
      data: {
        id: userId,
        friend_id: friendId,
      },
    });

    response(res, friendship, "Add friend success", 200);
  } catch (error) {
    response(res, null, "Failed to add friend", 500);
  }
};

const changeStatusLogin = async (req, res) => {
  const { id } = req.body;
  const userId = parseInt(id);
  try {
    let user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        status: "success",
      },
    });

    response(res, user, "Change status success", 200);
  } catch (error) {
    response(res, null, "Failed to change status", 500);
  }
};

const changeStatusLogout = async (req, res) => {
  const { id } = req.body;
  const userId = parseInt(id);
  try {
    let user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        status: "error",
      },
    });

    response(res, user, "Change status success", 200);
  } catch (error) {
    response(res, null, "Failed to change status", 500);
  }
};

const unFriend = async (req, res) => {
  const { id, friend_id } = req.params;
  const userId = parseInt(id);
  const friendId = parseInt(friend_id);

  try {
    let friendship = await prisma.user_friends.delete({
      where: {
        id_friend_id: {
          id: userId,
          friend_id: friendId,
        },
      },
    });

    response(res, null, "Unfriend success", 200);
  } catch (error) {
    console.log(error);
    response(res, null, "Failed to unfriend", 500);
  }
};

export {
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
};
