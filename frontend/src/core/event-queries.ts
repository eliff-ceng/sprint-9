import type { CampusEvent, Category } from "../types/campus-event";

// Veriyi değiştirmeden, sayfaların ihtiyaç duyduğu alt kümeleri hesaplıyoruz.
const simplify = (value: string) => value.trim().toLocaleLowerCase("tr-TR");

export function selectEvents(
  collection: readonly CampusEvent[],
  criteria: { search?: string; category?: Category | ""; limit?: number; chronological?: boolean } = {},
): CampusEvent[] {
  const keyword = simplify(criteria.search ?? "");
  const matching = collection.filter(({ title, description, category }) => {
    const hasTerm = keyword === "" || [title, description].some((part) => simplify(part).includes(keyword));
    return hasTerm && (!criteria.category || category === criteria.category);
  });
  const ordered = criteria.chronological
    ? matching.sort((a, b) => a.date.localeCompare(b.date))
    : matching;
  return criteria.limit === undefined ? ordered : ordered.slice(0, criteria.limit);
}

export function getEvent(collection: readonly CampusEvent[], id: string | undefined) {
  return collection.find((item) => item.id === id);
}

export function presentDate(value: string): string {
  const parts = value.split("-").map(Number);
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const [year, month, day] = iso ? parts : [parts[2], parts[1], parts[0]];
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
  });
}
