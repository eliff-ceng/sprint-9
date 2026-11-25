import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import mongoose from "mongoose";
import app from "../src/app.js";
import { Event } from "../src/models/event-model.js";
import { seedEvents } from "../src/data/seed-events.js";

// Bu testler Mongoose metodlarini taklit eder; Atlas hesabi gerektirmez.
// Gercek veri kaliciligi ayrica README'deki Postman/Atlas adimlariyla sinanir.
let server;
let baseUrl;
const validId = "507f1f77bcf86cd799439011";

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  return { status: response.status, data: await response.json() };
}

function post(body) {
  return request("/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("GET /health: 200, timestamp ve ogrenci numarasi", async () => {
  const { status, data } = await request("/health");
  assert.equal(status, 200);
  assert.equal(data.status, "ok");
  assert.equal(data.student, "2416501075");
  assert.ok(!Number.isNaN(Date.parse(data.time)));
});

test("Seed: alti etkinlik, Sprint 7 id alanlari olmadan", () => {
  assert.equal(seedEvents.length, 6);
  for (const item of seedEvents) {
    assert.equal("id" in item, false);
    assert.equal(new Event(item).validateSync(), undefined);
  }
});

test("GET /events: veritabanindan liste ve kategori filtresi", async (t) => {
  const calls = [];
  t.mock.method(Event, "find", (filter) => {
    calls.push(filter);
    return { sort: async () => seedEvents };
  });
  const all = await request("/events");
  const filtered = await request("/events?category=At%C3%B6lye");
  assert.equal(all.status, 200);
  assert.equal(all.data.length, 6);
  assert.equal(filtered.status, 200);
  assert.deepEqual(calls, [{}, { category: "Atölye" }]);
});

test("GET /events/:id: kayit varsa 200", async (t) => {
  t.mock.method(Event, "findById", async (id) => ({
    _id: id, title: "Robotik Tasarim Atolyesi", category: "Atölye",
  }));
  const result = await request(`/events/${validId}`);
  assert.equal(result.status, 200);
  assert.equal(result.data._id, validId);
});

test("GET /events/yok: gecersiz ObjectId -> 404", async () => {
  const result = await request("/events/yok");
  assert.equal(result.status, 404);
  assert.equal(result.data.error.message, "Event not found");
});

test("GET /events/:id: gecerli fakat bulunamayan ID -> 404", async (t) => {
  t.mock.method(Event, "findById", async () => null);
  const result = await request(`/events/${validId}`);
  assert.equal(result.status, 404);
  assert.equal(result.data.error.message, "Event not found");
});

test("POST /events: gecerli veri -> 201 ve yeni _id", async (t) => {
  t.mock.method(Event, "create", async (data) => ({
    _id: validId, ...data, createdAt: new Date().toISOString(),
  }));
  const result = await post({
    title: "Akilli Devre Tasarimi Atolyesi", category: "Atölye", date: "10-12-2026",
    time: "14:00", location: "Laboratuvar", capacity: 30,
  });
  assert.equal(result.status, 201);
  assert.equal(result.data._id, validId);
  assert.ok(result.data.createdAt);
});

test("POST /events: eksik alan -> 400 (gercek Mongoose schema validation)", async (t) => {
  t.mock.method(Event, "create", async (data) => {
    const error = new Event(data).validateSync();
    if (error) throw error;
    throw new Error("Test verisi hata uretmedi");
  });
  const result = await post({ title: "Eksik Etkinlik" });
  assert.equal(result.status, 400);
  assert.match(result.data.error.message, /required/i);
});

test("POST /events: enum ve minlength kurallari", () => {
  const badCategory = new Event({title:"Ornek", category:"Parti",date:"01-12-2026"});
  assert.match(badCategory.validateSync().message, /enum/i);
  const shortTitle = new Event({title:"X",category:"Seminer",date:"01-12-2026"});
  assert.match(shortTitle.validateSync().message, /shorter|minimum|minimum allowed|short/i);
});

test("Bilinmeyen route -> 404", async () => {
  const result = await request("/bu-adres-yok");
  assert.equal(result.status, 404);
  assert.equal(result.data.error.message, "Route not found");
});

test("Hatali JSON -> 400; sunucu sonraki istekte ayakta", async () => {
  const response = await fetch(`${baseUrl}/events`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{broken",
  });
  assert.equal(response.status, 400);
  assert.equal((await request("/health")).status, 200);
});

test("Tarih formatı ve geçersiz takvim tarihi", async () => {
  const event = new Event(seedEvents[0]);
  assert.ok(event.get("date", null, { getters: false }) instanceof Date);
  assert.equal(event.toJSON().date, seedEvents[0].date);
  for (const date of ["2026-12-01", "31-02-2026"]) {
    assert.ok(new Event({...seedEvents[0], date}).validateSync());
  }
});
test("PATCH yalnızca gönderilen alan ve validator seçenekleri", async (t) => {
  t.mock.method(Event, "findByIdAndUpdate", async (id, body, options) => {
    assert.equal(id, validId);
    assert.deepEqual(body, {capacity:55});
    assert.deepEqual(options, {returnDocument:"after",runValidators:true});
    return {...seedEvents[0], ...body};
  });
  const result = await request(`/events/${validId}`, {method:"PATCH",headers:{"Content-Type":"application/json"},body:'{"capacity":55}'});
  assert.equal(result.status,200);
  assert.equal(result.data.capacity,55);
});
test("DELETE 204 ve boş gövde", async (t) => {
  t.mock.method(Event,"findByIdAndDelete",async()=>({_id:validId}));
  const response = await fetch(`${baseUrl}/events/${validId}`,{method:"DELETE"});
  assert.equal(response.status,204);
  assert.equal(await response.text(),"");
});
test("Upcoming sabit route ve Date sorgusu", async (t) => {
  t.mock.method(Event,"find",filter=>{
    assert.ok(filter.date.$gte instanceof Date);
    return {sort:async order=>{assert.deepEqual(order,{date:1,time:1});return [];}};
  });
  assert.equal((await request('/events/upcoming')).status,200);
});
