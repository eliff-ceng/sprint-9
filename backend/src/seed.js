import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { seedEvents } from "./data/seed-events.js";
import { Event } from "./models/event-model.js";

try {
  await connectDatabase();
  // Veriyi biriktirmemek icin her seed oncesi mevcut etkinlikler silinir.
  await Event.deleteMany({});
  const inserted = await Event.insertMany(seedEvents);
  console.log(`Seed tamamlandi: ${inserted.length} etkinlik eklendi.`);
} catch (error) {
  console.error("Seed basarisiz:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
