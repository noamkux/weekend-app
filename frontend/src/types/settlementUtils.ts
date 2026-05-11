// settlementUtils.ts
// פונקציות עזר לחישוב התחשבנות — שלד מוכן לפיתוח עתידי
// TODO: לממש את הגוף של כל פונקציה כשמגיעים לשלב ה-settlement

import type {
  Expense,
  UserBalance,
  Settlement,
} from "../types/settlement.types";

/**
 * מחשב את היתרה של כל משתתף בטיול.
 * לכל הוצאה: חלק לאדם = סכום / מספר משתתפים בהוצאה.
 * תומך במקרה שהמשלם עצמו אינו בין המשתתפים.
 */
export function calculateBalances(
  expenses: Expense[],
  participantIds: string[],
): UserBalance[] {
  void expenses;
  void participantIds;
  // TODO: implement
  return [];
}

/**
 * אלגוריתם פישוט תשלומים (Splitwise-style).
 * ממיר רשימת יתרות למינימום העברות הכספיות.
 * מי שחייב הכי הרבה → משלם למי שמגיע לו הכי הרבה, חוזר עד שמאוזן.
 */
export function simplifySettlements(balances: UserBalance[]): Settlement[] {
  void balances;
  // TODO: implement
  return [];
}

/**
 * מחשב כמה עולה ההוצאה לכל משתתף.
 * מחיר לאדם = amount / participantIds.length
 */
export function costPerPerson(expense: Expense): number {
  if (expense.participantIds.length === 0) return 0;
  return expense.amount / expense.participantIds.length;
}

/**
 * מחזיר את סך ההוצאות של הטיול.
 */
export function totalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}
