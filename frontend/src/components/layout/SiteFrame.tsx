import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

const navigationItems = [
  ["/", "Ana Sayfa"],
  ["/events", "Etkinlikler"],
  ["/admin", "Yönetim"],
  ["/login", "Giriş"],
] as const;

// Tek bir sayfa iskeleti: içerik alanı değişir, çevresindeki görünüm değişmez.
export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="header-icerik">
          <div className="site-baslik">
            <h1>Kampüs Etkinlikleri</h1>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
          </div>
          <nav className="site-nav" aria-label="Ana menü">
            {navigationItems.map(([to, title]) => (
              <NavLink key={to} to={to} end={to === "/"}>{title}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-icerik">2416501075 - Elif Nur Özek - 2026</div>
      </footer>
    </>
  );
}
