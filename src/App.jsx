import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import MessagesPage from "./pages/MessagesPage";
import MapPage from "./pages/MapPage";
import AdminPage from "./pages/AdminPage";
import OwnerPage from "./pages/OwnerPage";

// Inner component that reads page from context
function AppRouter() {
  const { page } = useApp();

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage />;
      case "auth":     return <AuthPage />;
      case "search":   return <SearchPage />;
      case "detail":   return <DetailPage />;
      case "messages": return <MessagesPage />;
      case "map":      return <MapPage />;
      case "admin":    return <AdminPage />;
      case "owner":    return <OwnerPage />;
      default:         return <HomePage />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", minHeight: "100vh", background: "#f2f4f8" }}>
      <Navbar />
      <Toast />
      <Modal />
      {renderPage()}
    </div>
  );
}

// Root App wraps everything in the context provider
export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
