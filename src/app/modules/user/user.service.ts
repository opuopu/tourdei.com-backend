/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiError from "../../../errors/Apierror";
import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData);

  return newUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, "User not found !");
  }

  const { role, ...UserData } = payload;

  const updatedUserData: Partial<IUser> = { ...UserData };
  if (role) {
    throw new ApiError(
      500,
      "something went wrong. you cannot update your role"
    );
  }
  // dynamically handling

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach((key) => {
  //     const nameKey = `name.${key}` as keyof Partial<IUser>;
  //     (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

const manageRole = async (payload: any, id: string) => {
  const { role }: any = payload;
  const result = await User.findByIdAndUpdate(
    { id },
    {
      $set: {
        role:
          (role === "admin" && "admin") ||
          (role === "super_admin" && "super_admin") ||
          (role === "user" && "user"),
      },
    },
    {
      new: true,
    }
  );
  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  manageRole,
};
