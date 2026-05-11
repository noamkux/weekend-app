import { useState } from "react";
import { AuthProvider, useAuth } from "./auth";
import { LangProvider } from "./i18n/LangContext";
import { AuthPage } from "./auth";
import { HomePage } from "./home";
import SettlementPage from "./pages/SettlementPage";

interface Member {
  id: string;
  displayName: string;
}

type Page =
  | { name: "home" }
  | { name: "settlement"; tripId: string; members: Member[] };

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState<Page>({ name: "home" });

  if (!user) return <AuthPage />;

  if (page.name === "settlement") {
    return (
      <SettlementPage
        tripId={page.tripId}
        members={page.members}
        onBack={() => setPage({ name: "home" })}
      />
    );
  }

  return (
    <HomePage
      onNavigateToSettlement={(tripId, members) =>
        setPage({ name: "settlement", tripId, members })
      }
    />
  );
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
