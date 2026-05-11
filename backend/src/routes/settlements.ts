import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/trips/:tripId/expenses — list all expenses for a trip
router.get("/trips/:tripId/expenses", async (req: Request, res: Response) => {
  // TODO: implement - return all expenses with their participants
  res.status(501).json({ message: "Not implemented yet" });
});

// POST /api/trips/:tripId/expenses — add a new expense
router.post("/trips/:tripId/expenses", async (req: Request, res: Response) => {
  // body: { amount, description, paidBy, participantIds: string[] }
  // TODO: implement - create expense + expense_participants rows
  res.status(501).json({ message: "Not implemented yet" });
});

// DELETE /api/trips/:tripId/expenses/:expenseId — remove an expense
router.delete(
  "/trips/:tripId/expenses/:expenseId",
  async (req: Request, res: Response) => {
    // TODO: implement
    res.status(501).json({ message: "Not implemented yet" });
  },
);

// GET /api/trips/:tripId/settlement — calculate who owes whom
router.get("/trips/:tripId/settlement", async (req: Request, res: Response) => {
  // TODO: implement - return simplified payment list
  // Response shape: { balances: UserBalance[], transfers: Transfer[] }
  res.status(501).json({ message: "Not implemented yet" });
});

// POST /api/trips/:tripId/settlement/mark-paid — mark a transfer as paid
router.post(
  "/trips/:tripId/settlement/mark-paid",
  async (req: Request, res: Response) => {
    // body: { fromUserId, toUserId, amount }
    // TODO: implement
    res.status(501).json({ message: "Not implemented yet" });
  },
);

export default router;
