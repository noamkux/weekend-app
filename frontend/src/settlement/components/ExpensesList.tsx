import { useContext } from "react";
import { LangContext } from "../../i18n/LangContext";
import type { Expense } from "../../types/settlement.types";

interface Props {
  expenses: Expense[];
  onDelete: (expenseId: string) => void;
  members: { id: string; displayName: string }[];
}

export function ExpensesList({ expenses, onDelete, members }: Props) {
  const { t, dir } = useContext(LangContext)!;

  const getName = (userId: string) =>
    members.find((m) => m.id === userId)?.displayName ?? userId;

  if (expenses.length === 0) {
    return <p className="text-gray-400 text-sm">אין הוצאות עדיין</p>;
  }

  return (
    <ul className="space-y-3" dir={dir}>
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-start"
        >
          <div>
            <p className="font-semibold">{expense.description}</p>
            <p className="text-sm text-gray-500">
              {t.settlementPaidBy}: {getName(expense.paidBy)} • {expense.amount}{" "}
              ₪
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {expense.participantIds.length} {t.settlementParticipants} •{" "}
              {(expense.amount / expense.participantIds.length).toFixed(1)} ₪
              לאדם
            </p>
          </div>
          <button
            onClick={() => onDelete(expense.id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
