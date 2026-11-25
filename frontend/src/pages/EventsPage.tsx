import { useMemo, useState } from "react";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";
import { selectEvents } from "../core/event-queries";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const categories = useMemo(() => Array.from(new Set(events.map(({ category }) => category))), [events]);
  const visible = useMemo(() => selectEvents(events, { search: searchText, category }), [events, searchText, category]);
  const noResult = visible.length === 0;

  return (
    <>
      <h2 className="sayfa-baslik">Tüm Etkinlikler</h2>
      <EventFilter {...{ searchText, category, categories }} onSearchChange={setSearchText} onCategoryChange={setCategory} />
      <p id="sonuc" role="status" aria-live="polite">
        {noResult ? "Aramanıza uygun etkinlik bulunamadı." : `${visible.length} etkinlik listeleniyor.`}
      </p>
      <EventList events={visible} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}
