import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { getEvent } from "../core/event-queries";
import { useEvents } from "../context/EventsContext";
import NotFoundPage from "./NotFoundPage";

export default function EventDetailPage() {
  const { events } = useEvents();
  const { id } = useParams();
  const selected = getEvent(events, id);
  return selected ? (
    <><h2 className="sayfa-baslik">{selected.title}</h2><EventDetail event={selected} /></>
  ) : <NotFoundPage />;
}
