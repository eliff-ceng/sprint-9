import type { ChangeEvent } from "react";

export default function AuthField({ id, label, type, value, error, onChange }: {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="form-alan">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} aria-invalid={error ? true : undefined} />
      {error && <span className="hata-metni">{error}</span>}
    </div>
  );
}
