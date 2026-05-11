import { useContext, useEffect } from "react";
import { LangContext } from "../i18n/LangContext";
import { useAuth } from "../auth";
import {
  AddExpenseForm,
  ExpensesList,
  SettlementSummary,
  useSettlement,
} from "../settlement";

interface Member {
  id: string;
  displayName: string;
}

interface Props {
  tripId: string;
  members: Member[];
  onBack: () => void;
}

const SettlementPage: React.FC<Props> = ({ tripId, members, onBack }) => {
  const { t, dir } = useContext(LangContext)!;
  const { user } = useAuth();
  const {
    expenses,
    balances,
    settlements,
    loading,
    error,
    addExpense,
    deleteExpense,
    refresh,
  } = useSettlement(tripId);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) return <p className="p-4">{t.loading}</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 space-y-8 max-w-lg mx-auto" dir={dir}>
      <button
        onClick={onBack}
        className="text-sm text-gray-500 flex items-center gap-1"
      >
        ← חזרה
      </button>

      <h1 className="text-2xl font-bold">{t.settlementTitle}</h1>

      <section>
        <h2 className="text-lg font-semibold mb-3">{t.settlementAddExpense}</h2>
        <AddExpenseForm
          members={members}
          currentUserId={user?.id ?? ""}
          onAdd={addExpense}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">{t.settlementExpenses}</h2>
        <ExpensesList
          expenses={expenses}
          members={members}
          onDelete={deleteExpense}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">{t.settlementSummary}</h2>
        <SettlementSummary balances={balances} settlements={settlements} />
      </section>
    </div>
  );
};

export default SettlementPage;
