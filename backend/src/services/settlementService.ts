import { PrismaClient } from "@prisma/client";

// --- Types ---

export interface Expense {
  id: string;
  tripId: string;
  paidBy: string; // userId
  amount: number;
  description: string;
  participantIds: string[]; // who shares this expense
  createdAt: Date;
}

export interface UserBalance {
  userId: string;
  displayName: string;
  totalPaid: number; // sum of expenses they initiated
  totalOwed: number; // sum of their share across all expenses they're in
  balance: number; // totalPaid - totalOwed (positive = they're owed money)
}

export interface Transfer {
  fromUserId: string;
  fromName: string;
  toUserId: string;
  toName: string;
  amount: number;
  isPaid: boolean;
}

// --- Service functions (stubs) ---

/**
 * Calculate each member's balance for a trip.
 * Formula: balance = totalPaid - totalOwed
 */
export async function calculateBalances(
  prisma: PrismaClient,
  tripId: string,
): Promise<UserBalance[]> {
  // TODO: implement
  // 1. fetch all expenses for tripId (with participants)
  // 2. for each expense: perPerson = amount / participantIds.length
  // 3. accumulate totalPaid and totalOwed per user
  throw new Error("Not implemented");
}

/**
 * Simplify balances into minimum transfers (Splitwise algorithm).
 * Creditors (balance > 0) receive from debtors (balance < 0).
 */
export async function calculateTransfers(
  prisma: PrismaClient,
  tripId: string,
): Promise<Transfer[]> {
  // TODO: implement greedy min-transfers algorithm
  // 1. get balances from calculateBalances()
  // 2. sort: debtors ascending, creditors descending
  // 3. greedily match largest debtor with largest creditor
  throw new Error("Not implemented");
}

/**
 * Add a new expense with its participant list.
 */
export async function addExpense(
  prisma: PrismaClient,
  data: {
    tripId: string;
    paidBy: string;
    amount: number;
    description: string;
    participantIds: string[]; // can exclude paidBy — that's valid
  },
): Promise<Expense> {
  // TODO: implement
  // prisma.expense.create + prisma.expenseParticipant.createMany
  throw new Error("Not implemented");
}
