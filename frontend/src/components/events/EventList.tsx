import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

export default function EventList({ events, emptyText = "Gösterilecek etkinlik bulunamadı." }: {
  events: CampusEvent[]; emptyText?: string;
}) {
  return events.length ? (
    <section className="etkinlik-listesi">
      {events.map((item) => <EventCard event={item} key={item.id} />)}
    </section>
  ) : <p className="bos-sonuc">{emptyText}</p>;
}
