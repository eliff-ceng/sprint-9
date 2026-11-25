import { Link } from "react-router-dom";
import { selectEvents } from "../core/event-queries";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";

export default function HomePage() {
  const { events } = useEvents();
  return (
    <>
      <section className="intro"><h2 className="sayfa-baslik">Yaklaşan 2 Etkinlik</h2></section>
      <EventList events={selectEvents(events, { chronological: true, limit: 2 })} />
      <p className="sayfa-aksiyon"><Link className="buton" to="/events">Tüm etkinlikleri gör</Link></p>
    </>
  );
}
