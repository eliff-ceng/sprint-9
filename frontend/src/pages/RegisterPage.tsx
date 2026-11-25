import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
import { isEmail } from "../core/form-rules";
import { useAuthForm } from "../hooks/useAuthForm";

export default function RegisterPage() {
  const form = useAuthForm({ name: "", email: "", password: "", password2: "" });
  const check = (input: typeof form.values) => {
    const found: Partial<Record<keyof typeof input, string>> = {};
    if (input.name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!isEmail(input.email)) found.email = "Geçerli bir e-posta girin.";
    if (input.password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (input.password2 !== input.password) found.password2 = "Şifreler aynı değil.";
    return found;
  };

  return (
    <section className="auth-kart">
      <h2 className="sayfa-baslik">Kayıt Ol</h2>
      <form noValidate onSubmit={form.onSubmit(check)}>
        <AuthField id="register-name" label="Ad Soyad" type="text" value={form.values.name} error={form.errors.name} onChange={(e) => form.setField("name", e.target.value)} />
        <AuthField id="register-email" label="E-posta" type="email" value={form.values.email} error={form.errors.email} onChange={(e) => form.setField("email", e.target.value)} />
        <AuthField id="register-password" label="Şifre" type="password" value={form.values.password} error={form.errors.password} onChange={(e) => form.setField("password", e.target.value)} />
        <AuthField id="register-password2" label="Şifre (tekrar)" type="password" value={form.values.password2} error={form.errors.password2} onChange={(e) => form.setField("password2", e.target.value)} />
        <button className="buton auth-buton" type="submit">Kayıt ol</button>
      </form>
      {form.sent && <p className="mesaj basari-kutusu">Gerçek kayıt Sprint 10'da</p>}
      <p className="auth-linkler"><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></p>
    </section>
  );
}
