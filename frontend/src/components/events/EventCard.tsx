import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { EventFacts } from "./EventFacts";

export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p className="kategori-etiketi">{event.category}</p>
      <EventFacts event={event} fields={["date", "time", "location", "capacity"]} className="kart-kunye" />
      <p>{event.description}</p>
      <Link className="buton" to={`/events/${event.id}`}>Detayları gör</Link>
    </article>
  );
}
