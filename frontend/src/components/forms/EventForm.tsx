import type { ChangeEvent } from "react";
import { EVENT_CATEGORIES, type EventFormData, type EventFormErrors } from "../../types/campus-event";
import { useEventEditor } from "../../hooks/useEventEditor";

type FormKey = keyof EventFormData;
type FieldInfo = {
  key: FormKey;
  label: string;
  kind: "text" | "select" | "date" | "time" | "number" | "textarea";
  placeholder?: string;
};

const formLayout: FieldInfo[] = [
  { key: "title", label: "Etkinlik Adı", kind: "text", placeholder: "Örn. Kariyer Günleri 2026" },
  { key: "category", label: "Kategori", kind: "select" },
  { key: "date", label: "Tarih", kind: "date" },
  { key: "time", label: "Saat", kind: "time" },
  { key: "location", label: "Yer", kind: "text", placeholder: "Örn. A Blok Konferans Salonu" },
  { key: "capacity", label: "Kontenjan", kind: "number" },
  { key: "description", label: "Açıklama", kind: "textarea" },
];

type ControlProps = {
  field: FieldInfo;
  value: string;
  invalid: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

function FormControl({ field, value, invalid, onChange }: ControlProps) {
  const shared = { id: field.key, name: field.key, value, onChange, "aria-invalid": invalid || undefined };

  if (field.kind === "textarea") return <textarea {...shared} rows={5} />;
  if (field.kind === "select") return (
    <select {...shared}>
      <option value="">Seçiniz</option>
      {EVENT_CATEGORIES.map((name) => <option key={name} value={name}>{name}</option>)}
    </select>
  );
  if (field.kind === "number") return <input {...shared} type="number" min={1} max={1000} />;
  if (field.key === "title") return <input {...shared} type="text" maxLength={80} placeholder={field.placeholder} />;
  return <input {...shared} type={field.kind} placeholder={field.placeholder} />;
}

function FormField({ field, data, errors, onChange }: {
  field: FieldInfo;
  data: EventFormData;
  errors: EventFormErrors;
  onChange: ControlProps["onChange"];
}) {
  return (
    <div className="form-alan">
      <label htmlFor={field.key}>{field.label}</label>
      <FormControl field={field} value={data[field.key]} invalid={Boolean(errors[field.key])} onChange={onChange} />
      {errors[field.key] && <span className="hata-metni">{errors[field.key]}</span>}
    </div>
  );
}

export default function EventForm({ initialData, submitText, onSubmit }: {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}) {
  const { data, errors, updateField, save } = useEventEditor(initialData, onSubmit);
  return (
    <form className="form-karti" noValidate onSubmit={save}>
      {formLayout.map((field) => <FormField key={field.key} field={field} data={data} errors={errors} onChange={updateField} />)}
      <button className="buton" type="submit">{submitText}</button>
    </form>
  );
}
