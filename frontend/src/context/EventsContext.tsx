import { createContext, useContext, useMemo, useReducer, useRef, type ReactNode } from "react";
import { events as seedEvents } from "../data/events";
import { buildEvent, eventReducer } from "../core/event-store";
import type { CampusEvent, EventFormData } from "../types/campus-event";

type EventContextApi = {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
};

const EventContext = createContext<EventContextApi | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, dispatch] = useReducer(eventReducer, seedEvents);
  const nextSequence = useRef(0);

  const api = useMemo<EventContextApi>(() => ({
    events,
    addEvent: (input) => {
      nextSequence.current += 1;
      dispatch({ type: "created", event: buildEvent(`event-${Date.now()}${nextSequence.current}`, input) });
    },
    updateEvent: (id, input) => dispatch({ type: "edited", event: buildEvent(id, input) }),
    deleteEvent: (id) => dispatch({ type: "removed", id }),
  }), [events]);

  return <EventContext.Provider value={api}>{children}</EventContext.Provider>;
}

export function useEvents(): EventContextApi {
  const context = useContext(EventContext);
  if (!context) throw new Error("Etkinlik verisi için EventsProvider gerekli.");
  return context;
}
