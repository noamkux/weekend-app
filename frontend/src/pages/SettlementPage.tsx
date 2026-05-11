import { useContext } from "react";
import { LangContext } from "../i18n/LangContext";

const SettlementPage: React.FC<{ tripId: string }> = () => {
  const { t, dir } = useContext(LangContext)!;

  return (
    <div className="p-4" dir={dir}>
      <h1 className="text-2xl font-bold mb-4">{t.settlementTitle}</h1>

      {/* TODO: AddExpenseForm */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">{t.settlementAddExpense}</h2>
        {/* <AddExpenseForm tripId={tripId} /> */}
      </section>

      {/* TODO: ExpensesList */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">{t.settlementExpenses}</h2>
        {/* <ExpensesList tripId={tripId} /> */}
      </section>

      {/* TODO: SettlementSummary */}
      <section>
        <h2 className="text-lg font-semibold mb-2">{t.settlementSummary}</h2>
        {/* <SettlementSummary tripId={tripId} /> */}
      </section>
    </div>
  );
};

export default SettlementPage;
