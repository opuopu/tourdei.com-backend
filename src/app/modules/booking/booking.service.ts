/* eslint-disable no-unused-expressions */
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/paginations";
import Booking from "./booking.model";
import { generateBookingId } from "./booking.utiles";
// import { bookingSearchableFields } from "./booking.constant";
// import { bookingSearchableFields } from "./booking.constant";

/* eslint-disable @typescript-eslint/no-explicit-any */
const createAbooking = async (payload: any, id: string) => {
  const bookingNo = await generateBookingId();
  const { checkInDate, checkOutDate } = payload;
  const inDate = new Date(checkInDate).toISOString().split("T")[0];
  const outDate = new Date(checkOutDate).toISOString().split("T")[0];
  (payload.checkInDate = inDate), (payload.checkOutDate = outDate);
  payload.room = id;
  payload.bookingNo = bookingNo;
  const result = await Booking.create(payload);
  return result;
};

const getallBooking = async (
  payload: any,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  const query: any = {};

  if (payload.phone) {
    query["user.phone"] = { $regex: new RegExp(payload.phone), $options: "i" };
  }

  if (payload.email) {
    query["user.email"] = { $regex: new RegExp(payload.email), $options: "i" };
  }

  if (payload.bookingNo) {
    query.bookingNo = { $regex: new RegExp(payload.bookingNo), $options: "i" };
  }

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Booking.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};
const updateBooking = async (payload: any, id: string) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};
export const bookingServices = {
  createAbooking,
  getallBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};