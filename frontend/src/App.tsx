import { AuthProvider, useAuth } from "./auth";
import { LangProvider } from "./i18n/LangContext";
import { AuthPage } from "./auth";
import { HomePage } from "./home";

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LangProvider>
  );
}
