import mongoose from "mongoose";
import { parseDate, formatDate } from "../utils/date.js";

export const EVENT_CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: EVENT_CATEGORIES,
    },
    date: {
      type: Date,
      required: true,
      set: parseDate,
      get: formatDate,
    },
    capacity: {
      type: Number,
      min: 0,
      default: 0,
    },
    time: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export const Event = mongoose.model("Event", eventSchema);
