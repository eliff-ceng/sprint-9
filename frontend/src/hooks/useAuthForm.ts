import { useState, type FormEvent } from "react";

// Giriş ve kayıt sayfaları aynı temel form denetimini paylaşır.
export function useAuthForm<T extends string>(initial: Record<T, string>) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<T, string>>>({});
  const [sent, setSent] = useState(false);

  function setField(field: T, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(validate: (input: Record<T, string>) => Partial<Record<T, string>>) {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const problems = validate(values);
      setErrors(problems);
      setSent(Object.keys(problems).length === 0);
    };
  }

  return { values, errors, sent, setField, onSubmit };
}
