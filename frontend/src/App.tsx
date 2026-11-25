import { Route, Routes } from "react-router-dom";
import SiteFrame from "./components/layout/SiteFrame";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

// Görüntü aynı kalsın diye yerleşim katmanı ayrı tutuldu.
const pages = [
  { path: "/", Component: HomePage },
  { path: "/events", Component: EventsPage },
  { path: "/events/:id", Component: EventDetailPage },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  { path: "/forgot-password", Component: ForgotPasswordPage },
  { path: "/admin", Component: AdminPage },
  { path: "/admin/new", Component: AddEventPage },
  { path: "/admin/:id/edit", Component: EditEventPage },
];

export default function App() {
  return (
    <SiteFrame>
      <Routes>
        {pages.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteFrame>
  );
}
