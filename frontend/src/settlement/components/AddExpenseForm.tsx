import { useContext, useState } from "react";
import { LangContext } from "../../i18n/LangContext";

interface Member {
  id: string;
  displayName: string;
}

interface Props {
  members: Member[];
  currentUserId: string;
  onAdd: (payload: {
    amount: number;
    description: string;
    paidBy: string;
    participantIds: string[];
  }) => Promise<void>;
}

export function AddExpenseForm({ members, currentUserId, onAdd }: Props) {
  const { t, dir } = useContext(LangContext)!;
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState(currentUserId);
  const [participantIds, setParticipantIds] = useState<string[]>(
    members.map((m) => m.id),
  );
  const [loading, setLoading] = useState(false);

  const toggleParticipant = (id: string) => {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    if (!amount || !description || participantIds.length === 0) return;
    setLoading(true);
    try {
      await onAdd({
        amount: parseFloat(amount),
        description,
        paidBy,
        participantIds,
      });
      setAmount("");
      setDescription("");
      setPaidBy(currentUserId);
      setParticipantIds(members.map((m) => m.id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4" dir={dir}>
      {/* תיאור */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          {t.settlementDescription}
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="למשל: דגים, אלכוהול..."
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* סכום */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          {t.settlementAmount} (₪)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* מי שילם */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          {t.settlementPaidBy}
        </label>
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.displayName}
            </option>
          ))}
        </select>
      </div>

      {/* משתתפים */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          {t.settlementParticipants}
        </label>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleParticipant(m.id)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                participantIds.includes(m.id)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {m.displayName}
            </button>
          ))}
        </div>
        {participantIds.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            {parseFloat(amount || "0") > 0
              ? `${(parseFloat(amount) / participantIds.length).toFixed(1)} ₪ לאדם`
              : `${participantIds.length} משתתפים`}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={
          loading || !amount || !description || participantIds.length === 0
        }
        className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
      >
        {loading ? t.loading : `+ ${t.settlementAddExpense}`}
      </button>
    </div>
  );
}
