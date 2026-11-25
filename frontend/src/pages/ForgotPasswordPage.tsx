import { Link } from "react-router-dom";
import AuthField from "../components/forms/AuthField";
import { isEmail } from "../core/form-rules";
import { useAuthForm } from "../hooks/useAuthForm";

export default function ForgotPasswordPage() {
  const form = useAuthForm({ email: "" });
  return (
    <section className="auth-kart">
      <h2 className="sayfa-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {form.sent && <p className="mesaj basari-kutusu">Bağlantı {form.values.email} adresine gönderildi (demo).</p>}
      <form noValidate onSubmit={form.onSubmit((input) => isEmail(input.email) ? {} : { email: "Geçerli bir e-posta girin." })}>
        <AuthField id="forgot-email" label="E-posta" type="email" value={form.values.email} error={form.errors.email} onChange={(e) => form.setField("email", e.target.value)} />
        <button className="buton auth-buton" type="submit">Bağlantı gönder</button>
      </form>
      <p className="auth-linkler"><Link to="/login">← Girişe dön</Link></p>
    </section>
  );
}
