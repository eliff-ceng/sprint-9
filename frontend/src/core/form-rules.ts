import type { EventFormData, EventFormErrors } from "../types/campus-event";

type Validator = (value: string, values: EventFormData) => boolean;
type Rule = { field: keyof EventFormData; check: Validator; error: string };

const eventRules: Rule[] = [
  { field: "title", check: (v) => v.trim().length >= 3, error: "Etkinlik adı en az 3 karakter olmalı." },
  { field: "category", check: (v) => v.length > 0, error: "Bir kategori seçin." },
  { field: "date", check: (v) => v !== "", error: "Tarih seçin." },
  { field: "time", check: (v) => v !== "", error: "Saat seçin." },
  { field: "location", check: (v) => v.trim() !== "", error: "Yer boş olamaz." },
  { field: "capacity", check: (v) => Number.isInteger(+v) && +v >= 1 && +v <= 1000, error: "1 ile 1000 arası tam sayı girin." },
  { field: "description", check: (v) => v.trim().length >= 10, error: "Açıklama en az 10 karakter olmalı." },
];

export function getEventErrors(values: EventFormData): EventFormErrors {
  return eventRules.reduce<EventFormErrors>((result, rule) => {
    if (!rule.check(values[rule.field], values)) result[rule.field] = rule.error;
    return result;
  }, {});
}

export const isEmail = (value: string) => value.includes("@");
