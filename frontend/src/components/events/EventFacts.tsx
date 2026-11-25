import type { CampusEvent } from "../../types/campus-event";
import { presentDate } from "../../core/event-queries";

type FactKey = "date" | "time" | "location" | "category" | "capacity";

const labels: Record<FactKey, string> = {
  date: "Tarih", time: "Saat", location: "Yer", category: "Kategori", capacity: "Kontenjan",
};

function factValue(event: CampusEvent, key: FactKey, personSuffix: boolean): string {
  if (key === "date") return presentDate(event.date);
  if (key === "capacity") return `${event.capacity}${personSuffix ? " kişi" : ""}`;
  return event[key];
}

export function EventFacts({ event, fields, className, personSuffix = false }: {
  event: CampusEvent;
  fields: FactKey[];
  className?: string;
  personSuffix?: boolean;
}) {
  return (
    <dl className={className}>
      {fields.map((field) => (
        <div key={field}>
          <dt>{labels[field]}</dt>
          <dd>{factValue(event, field, personSuffix)}</dd>
        </div>
      ))}
    </dl>
  );
}
