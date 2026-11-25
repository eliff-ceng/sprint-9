import { EVENT_CATEGORIES, type CampusEvent, type Category, type EventFormData } from "../types/campus-event";

// Etkinliklerin eklenmesi, değiştirilmesi ve silinmesi tek bir veri akışından geçer.
export type EventAction =
  | { type: "created"; event: CampusEvent }
  | { type: "edited"; event: CampusEvent }
  | { type: "removed"; id: string };

export function eventReducer(state: CampusEvent[], action: EventAction): CampusEvent[] {
  switch (action.type) {
    case "created":
      return state.concat(action.event);
    case "edited":
      return state.map((record) => record.id === action.event.id ? action.event : record);
    case "removed":
      return state.filter((record) => record.id !== action.id);
  }
}

export function buildEvent(id: string, input: EventFormData): CampusEvent {
  const { title, location, description, capacity, category, ...other } = input;
  if (!EVENT_CATEGORIES.some((item) => item === category)) {
    throw new Error("Geçerli bir etkinlik kategorisi seçilmelidir.");
  }
  return {
    id,
    ...other,
    category: category as Category,
    title: title.trim(),
    location: location.trim(),
    description: description.trim(),
    capacity: Number(capacity),
  };
}

export function toFormData(record: CampusEvent): EventFormData {
  return {
    title: record.title,
    category: record.category,
    date: record.date,
    time: record.time,
    location: record.location,
    description: record.description,
    capacity: String(record.capacity),
  };
}

export const blankEventForm: EventFormData = {
  title: "", category: "", date: "", time: "", location: "", capacity: "", description: "",
};
