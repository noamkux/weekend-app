import { useState, useCallback } from "react";
import { getAuthToken } from "../../auth";
import type {
  Expense,
  UserBalance,
  Settlement,
} from "../../types/settlement.types";

const API = "http://localhost:3001/api";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  };
}

export function useSettlement(tripId: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, setBalances] = useState<UserBalance[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/trips/${tripId}/expenses`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setExpenses(data);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  const fetchSettlement = useCallback(async () => {
    try {
      const res = await fetch(`${API}/trips/${tripId}/settlement`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setBalances(data.balances ?? []);
      setSettlements(data.transfers ?? []);
    } catch {
      setError("Failed to load settlement");
    }
  }, [tripId]);

  const refresh = useCallback(async () => {
    await Promise.all([fetchExpenses(), fetchSettlement()]);
  }, [fetchExpenses, fetchSettlement]);

  const addExpense = useCallback(
    async (payload: {
      amount: number;
      description: string;
      paidBy: string;
      participantIds: string[];
    }) => {
      const res = await fetch(`${API}/trips/${tripId}/expenses`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add expense");
      await refresh();
    },
    [tripId, refresh],
  );

  const deleteExpense = useCallback(
    async (expenseId: string) => {
      await fetch(`${API}/trips/${tripId}/expenses/${expenseId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      await refresh();
    },
    [tripId, refresh],
  );

  return {
    expenses,
    balances,
    settlements,
    loading,
    error,
    addExpense,
    deleteExpense,
    refresh,
  };
}
