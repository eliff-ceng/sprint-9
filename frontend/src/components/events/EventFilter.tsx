import type { ChangeEvent, FormEvent } from "react";
import type { Category } from "../../types/campus-event";

type Props = {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
};

export default function EventFilter(props: Props) {
  return (
    <form className="filtre" onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}>
      <div className="alan-grubu">
        <label htmlFor="arama">Etkinlik ara</label>
        <input id="arama" type="search" placeholder="atölye, kariyer, yapay..." value={props.searchText} onChange={(e: ChangeEvent<HTMLInputElement>) => props.onSearchChange(e.target.value)} />
      </div>
      <div className="alan-grubu">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select id="kategori-filtre" value={props.category} onChange={(e: ChangeEvent<HTMLSelectElement>) => props.onCategoryChange(e.target.value as Category | "")}>
          <option value="">Tümü</option>
          {props.categories.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>
    </form>
  );
}
