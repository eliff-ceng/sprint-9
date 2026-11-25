import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
import { isEmail } from "../core/form-rules";
import { useAuthForm } from "../hooks/useAuthForm";

export default function LoginPage() {
  const form = useAuthForm({ email: "", password: "" });
  const check = (input: { email: string; password: string }) => ({
    ...(!isEmail(input.email) ? { email: "Geçerli bir e-posta girin." } : {}),
    ...(input.password.length < 6 ? { password: "Şifre en az 6 karakter olmalı." } : {}),
  });

  return (
    <section className="auth-kart">
      <h2 className="sayfa-baslik">Giriş Yap</h2>
      <form noValidate onSubmit={form.onSubmit(check)}>
        <AuthField id="login-email" label="E-posta" type="email" value={form.values.email} error={form.errors.email} onChange={(e) => form.setField("email", e.target.value)} />
        <AuthField id="login-password" label="Şifre" type="password" value={form.values.password} error={form.errors.password} onChange={(e) => form.setField("password", e.target.value)} />
        <button className="buton auth-buton" type="submit">Giriş yap</button>
      </form>
      {form.sent && <p className="mesaj basari-kutusu">Gerçek giriş Sprint 10'da</p>}
      <p className="auth-linkler">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </section>
  );
}
