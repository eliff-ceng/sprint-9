import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Sprint 7 sozlesmesini ve ogrenci numarasini aynen koru.
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501075",
  });
});

app.use("/events", eventRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Express hata yakalayicisi tam olarak dort parametre alir.
app.use((error, _req, res, _next) => {
  console.error("API error:", error);
  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON" } });
  }
  return res.status(500).json({ error: { message: "Server error" } });
});

export default app;
