import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { EventFacts } from "./EventFacts";

function EventPoster({ event }: { event: CampusEvent }) {
  if (!event.image) return null;
  return (
    <figure className="afis-figure">
      <img className="afis-gorsel" src={event.image} alt={`${event.title} afişi`} />
      <figcaption>{event.title} afişi</figcaption>
    </figure>
  );
}

export default function EventDetail({ event }: { event: CampusEvent }) {
  return (
    <article className={event.image ? "detay-karti" : "detay-karti detay-afissiz"}>
      <EventPoster event={event} />
      <div className="detay-icerik">
        <section className="kunye-karti">
          <h2>Etkinlik Künyesi</h2>
          <EventFacts event={event} fields={["date", "time", "location", "category", "capacity"]} personSuffix />
        </section>
        <section className="aciklama">
          <h2>Açıklama</h2>
          <p>{event.description}</p>
        </section>
        <div className="detay-butonlari">
          <Link className="buton ikincil" to="/events">← Listeye dön</Link>
          <Link className="buton" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
        </div>
      </div>
    </article>
  );
}
