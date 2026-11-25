import { Link } from "react-router-dom";
import { presentDate } from "../core/event-queries";
import { useEvents } from "../context/EventsContext";
import type { CampusEvent } from "../types/campus-event";

function AdminRow({ item, onRemove }: { item: CampusEvent; onRemove: (id: string) => void }) {
  return (
    <tr>
      <td data-baslik="Etkinlik">{item.title}</td>
      <td data-baslik="Tarih">{presentDate(item.date)}</td>
      <td data-baslik="Kategori">{item.category}</td>
      <td className="islemler">
        <Link className="buton" to={`/admin/${item.id}/edit`}>Düzenle</Link>
        <button className="buton buton-sil" type="button" onClick={() => onRemove(item.id)}>Sil</button>
      </td>
    </tr>
  );
}

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();
  function confirmDelete(id: string) {
    const selected = events.find((item) => item.id === id);
    if (selected && window.confirm(`"${selected.title}" silinsin mi?`)) deleteEvent(id);
  }
  return (
    <>
      <h2 className="sayfa-baslik">Etkinlik Yönetimi</h2>
      <p><Link className="buton" to="/admin/new">+ Yeni etkinlik</Link></p>
      <table className="tablo">
        <thead><tr><th>Etkinlik</th><th>Tarih</th><th>Kategori</th><th>İşlemler</th></tr></thead>
        <tbody>{events.map((item) => <AdminRow key={item.id} item={item} onRemove={confirmDelete} />)}</tbody>
      </table>
    </>
  );
}
