import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
// import { validateRequest } from "../../middlewares/validateRequest";
// import { UserValidation } from "./user.validations";
// import { ENUM_USER_ROLE } from "../../../enums/user";
// import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/signup",
  // validateRequest(UserValidation.create),
  UserController.createUser
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers
);
router.get(
  "/my-profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  // auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);
router.patch(
  "/my-profile/:id",
  // validateRequest(UserValidation.update),
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateUser
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.getSingleUser
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteUser
);
router.patch(
  "/:id",
  // validateRequest(UserValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateUser
);
router.patch(
  "/manage-role/:id",
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.manageRole
);

export const UserRoutes = router;
