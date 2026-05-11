import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  addExpense,
  calculateBalances,
  calculateTransfers,
} from "../services/settlementService";
import { prisma } from "../index";

const router = Router();
router.use(authMiddleware);

// GET /api/trips/:tripId/expenses
router.get("/trips/:tripId/expenses", async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId as string;
    const expenses = await prisma.expense.findMany({
      where: { tripId },
      include: { participants: true, paidBy: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/trips/:tripId/expenses
router.post("/trips/:tripId/expenses", async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId as string;
    const { amount, description, paidBy, participantIds } = req.body;
    const expense = await addExpense(prisma, {
      tripId,
      paidBy,
      amount,
      description,
      participantIds,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/trips/:tripId/expenses/:expenseId
router.delete(
  "/trips/:tripId/expenses/:expenseId",
  async (req: Request, res: Response) => {
    try {
      const expenseId = req.params.expenseId as string;
      await prisma.expense.delete({
        where: { id: expenseId },
      });
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// GET /api/trips/:tripId/settlement
router.get("/trips/:tripId/settlement", async (req: Request, res: Response) => {
  try {
    const tripId = req.params.tripId as string;
    const [balances, transfers] = await Promise.all([
      calculateBalances(prisma, tripId),
      calculateTransfers(prisma, tripId),
    ]);
    res.json({ balances, transfers });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/trips/:tripId/settlement/mark-paid
router.post(
  "/trips/:tripId/settlement/mark-paid",
  async (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented yet" });
  },
);

export default router;
