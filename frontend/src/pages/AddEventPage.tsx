import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { blankEventForm } from "../core/event-store";
import { useEvents } from "../context/EventsContext";

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const go = useNavigate();
  return (
    <>
      <h2 className="sayfa-baslik">Etkinlik Ekle</h2>
      <EventForm initialData={blankEventForm} submitText="Kaydet" onSubmit={(form) => {
        addEvent(form);
        go("/admin");
      }} />
    </>
  );
}
