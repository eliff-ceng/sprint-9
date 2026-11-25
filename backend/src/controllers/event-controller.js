import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

const protectedFields = ["_id", "createdAt", "updatedAt", "__v"];
const editableFields = ["title", "category", "date", "capacity", "time", "location", "description"];
const badRequest = (res, message) => res.status(400).json({ error: { message } });
const notFound = res => res.status(404).json({ error: { message: "Event not found" } });
function handleError(error, res, next) {
  if (["ValidationError", "CastError"].includes(error.name)) return badRequest(res, error.message);
  return next(error);
}
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) {
      if (typeof category !== "string") return badRequest(res, "Invalid category");
      filter.category = category;
    }
    if (search) {
      if (typeof search !== "string") return badRequest(res, "Invalid search");
      filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    }
    return res.json(await Event.find(filter).sort({ date: 1 }));
  } catch (error) { return next(error); }
}
export async function getUpcomingEvents(req, res, next) {
  try {
    return res.json(await Event.find({ date: { $gte: todayStart() } }).sort({ date: 1, time: 1 }));
  } catch (error) { return next(error); }
}
export async function getEventById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    return event ? res.json(event) : notFound(res);
  } catch (error) { return next(error); }
}
export async function createEvent(req, res, next) {
  try {
    return res.status(201).json(await Event.create(req.body ?? {}));
  } catch (error) { return handleError(error, res, next); }
}
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const body = req.body ?? {};
    if (typeof body !== "object" || Array.isArray(body)) return badRequest(res, "Invalid body");
    const keys = Object.keys(body);
    if (!keys.length) return badRequest(res, "Body is empty");
    const blocked = keys.filter(key => protectedFields.includes(key));
    if (blocked.length) return badRequest(res, `${blocked.join(", ")} cannot be changed`);
    if (keys.some(key => !editableFields.includes(key))) return badRequest(res, "Unknown field");
    const event = await Event.findByIdAndUpdate(req.params.id, body, { returnDocument: "after", runValidators: true });
    return event ? res.json(event) : notFound(res);
  } catch (error) { return handleError(error, res, next); }
}
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res);
    return res.status(204).end();
  } catch (error) { return next(error); }
}
