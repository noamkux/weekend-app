// settlement.types.ts
// תשתית טיפוסים למודול ההתחשבנות — מוכן לפיתוח עתידי

export interface Expense {
  id: string;
  tripId: string;
  paidBy: string; // user_id
  amount: number;
  description: string;
  participantIds: string[]; // מי משתתף בהוצאה הזו (לא בהכרח כולם)
  createdAt: string;
}

export interface ExpenseParticipant {
  expenseId: string;
  userId: string;
}

// יתרה לכל משתמש אחרי החישוב
export interface UserBalance {
  userId: string;
  displayName: string;
  totalPaid: number; // כמה שילם בפועל
  totalOwes: number; // כמה חייב לשלם (לפי חלקו בהוצאות)
  balance: number; // totalPaid - totalOwes (חיובי = מגיע לו, שלילי = חייב)
}

// העברה בודדת בין שני אנשים (תוצאת אלגוריתם הפישוט)
export interface Settlement {
  fromUserId: string;
  toUserId: string;
  amount: number;
  isPaid: boolean;
}

// כל נתוני ההתחשבנות של טיול
export interface TripSettlement {
  tripId: string;
  expenses: Expense[];
  balances: UserBalance[];
  settlements: Settlement[]; // הרשימה הפשוטה — מי משלם למי כמה
}
