/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchasync";
import sendResponse from "../../../shared/sendResponse";
import { roomservices } from "./rooms.service";
import pick from "../../../shared/pick";
import { roomFilterableFields } from "./rooms.constant";
import paginationFields from "../../../constants/pagination";

const createAroom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.createAroom(req.body);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "room created  successfully",
    data: result,
  });
});
const getallRooms = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await roomservices.getallRooms(filters, paginationOptions);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "rooms retrive  successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getsingleRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.getsingleRooms(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "room retrive  successfully",
    data: result,
  });
});
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.updateRoom(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "room updated  successfully",
    data: result,
  });
});
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.deleteRoom(req.params.id);
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: "room deleted  successfully",
    data: result,
  });
});
export const roomController = {
  createAroom,
  getallRooms,
  getsingleRooms,
  deleteRoom,
  updateRoom,
};