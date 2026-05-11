import { PrismaClient } from "@prisma/client";

export interface Expense {
  id: string;
  tripId: string;
  paidBy: string;
  amount: number;
  description: string;
  participantIds: string[];
  createdAt: Date;
}

export interface UserBalance {
  userId: string;
  displayName: string;
  totalPaid: number;
  totalOwed: number;
  balance: number;
}

export interface Transfer {
  fromUserId: string;
  fromName: string;
  toUserId: string;
  toName: string;
  amount: number;
  isPaid: boolean;
}

export async function addExpense(
  prisma: PrismaClient,
  data: {
    tripId: string;
    paidBy: string;
    amount: number;
    description: string;
    participantIds: string[];
  },
): Promise<Expense> {
  const expense = await prisma.expense.create({
    data: {
      tripId: data.tripId,
      paidById: data.paidBy,
      amount: data.amount,
      description: data.description,
      participants: {
        createMany: {
          data: data.participantIds.map((userId) => ({ userId })),
        },
      },
    },
    include: { participants: true },
  });

  return {
    id: expense.id,
    tripId: expense.tripId,
    paidBy: expense.paidById,
    amount: expense.amount,
    description: expense.description,
    participantIds: expense.participants.map((p) => p.userId),
    createdAt: expense.createdAt,
  };
}

export async function calculateBalances(
  prisma: PrismaClient,
  tripId: string,
): Promise<UserBalance[]> {
  const expenses = await prisma.expense.findMany({
    where: { tripId },
    include: { participants: true, paidBy: true },
  });

  const members = await prisma.tripMember.findMany({
    where: { tripId },
    include: { user: true },
  });

  const balanceMap = new Map<string, UserBalance>();

  for (const member of members) {
    balanceMap.set(member.userId, {
      userId: member.userId,
      displayName: member.user.displayName,
      totalPaid: 0,
      totalOwed: 0,
      balance: 0,
    });
  }

  for (const expense of expenses) {
    const perPerson = expense.amount / expense.participants.length;

    const payer = balanceMap.get(expense.paidById);
    if (payer) payer.totalPaid += expense.amount;

    for (const participant of expense.participants) {
      const entry = balanceMap.get(participant.userId);
      if (entry) entry.totalOwed += perPerson;
    }
  }

  for (const entry of balanceMap.values()) {
    entry.balance = entry.totalPaid - entry.totalOwed;
  }

  return Array.from(balanceMap.values());
}

export async function calculateTransfers(
  prisma: PrismaClient,
  tripId: string,
): Promise<Transfer[]> {
  const balances = await calculateBalances(prisma, tripId);

  const debtors = balances
    .filter((b) => b.balance < -0.01)
    .map((b) => ({ ...b }))
    .sort((a, b) => a.balance - b.balance);

  const creditors = balances
    .filter((b) => b.balance > 0.01)
    .map((b) => ({ ...b }))
    .sort((a, b) => b.balance - a.balance);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(-debtor.balance, creditor.balance);

    transfers.push({
      fromUserId: debtor.userId,
      fromName: debtor.displayName,
      toUserId: creditor.userId,
      toName: creditor.displayName,
      amount: Math.round(amount * 100) / 100,
      isPaid: false,
    });

    debtor.balance += amount;
    creditor.balance -= amount;

    if (Math.abs(debtor.balance) < 0.01) i++;
    if (Math.abs(creditor.balance) < 0.01) j++;
  }

  return transfers;
}
