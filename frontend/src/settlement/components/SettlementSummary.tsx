import { useContext } from "react";
import { LangContext } from "../../i18n/LangContext";
import type { UserBalance, Settlement } from "../../types/settlement.types";

interface Props {
  balances: UserBalance[];
  settlements: Settlement[];
}

export function SettlementSummary({ balances, settlements }: Props) {
  const { t, dir } = useContext(LangContext)!;

  if (balances.length === 0) {
    return <p className="text-gray-400 text-sm">אין נתונים עדיין</p>;
  }

  return (
    <div className="space-y-6" dir={dir}>
      {/* יתרות */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">יתרות</h3>
        <ul className="space-y-2">
          {balances.map((b) => (
            <li
              key={b.userId}
              className="flex justify-between items-center bg-white rounded-xl shadow-sm px-4 py-3"
            >
              <span className="font-medium">{b.displayName}</span>
              <span
                className={`text-sm font-semibold ${
                  b.balance > 0
                    ? "text-green-500"
                    : b.balance < 0
                      ? "text-red-500"
                      : "text-gray-400"
                }`}
              >
                {b.balance > 0
                  ? `${t.settlementIsOwed} ${b.balance.toFixed(1)} ₪`
                  : b.balance < 0
                    ? `${t.settlementOwes} ${Math.abs(b.balance).toFixed(1)} ₪`
                    : "מאוזן ✓"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* העברות */}
      {settlements.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            מי משלם למי
          </h3>
          <ul className="space-y-2">
            {settlements.map((s, i) => (
              <li
                key={i}
                className="bg-white rounded-xl shadow-sm px-4 py-3 flex justify-between items-center"
              >
                <span className="text-sm">
                  <span className="font-medium">{s.fromUserId}</span>
                  {" → "}
                  <span className="font-medium">{s.toUserId}</span>
                </span>
                <span className="text-sm font-semibold text-blue-500">
                  {s.amount.toFixed(1)} ₪
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
