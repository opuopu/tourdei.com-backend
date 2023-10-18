import express from "express";
import { roomController } from "./rooms.controller";
const router = express.Router();

router.post("/", roomController.createAroom);
router.get("/", roomController.getallRooms);
router.get("/:id", roomController.getsingleRooms);
router.patch("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);
router.patch("/review/:id", roomController.reviewAndRatings);
router.get("/review/:id", roomController.reviewAndRatings);
export const roomRoutes = router;
