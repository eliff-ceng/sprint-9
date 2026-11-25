import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { getEvent } from "../core/event-queries";
import { toFormData } from "../core/event-store";
import { useEvents } from "../context/EventsContext";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams();
  const go = useNavigate();
  const { events, updateEvent } = useEvents();
  const found = getEvent(events, id);
  const initialData = useMemo(() => found && toFormData(found), [found]);

  if (!found || !initialData) return <NotFoundPage />;
  return (
    <>
      <h2 className="sayfa-baslik">Etkinlik Güncelle</h2>
      <EventForm key={found.id} initialData={initialData} submitText="Güncelle" onSubmit={(form) => {
        updateEvent(found.id, form);
        go("/admin");
      }} />
    </>
  );
}
