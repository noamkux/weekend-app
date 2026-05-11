import { Router, Request, Response } from "express";
import { prisma } from "../index";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// POST /api/users/match-contacts
// מקבל מערך מספרי טלפון, מחזיר מי רשום במערכת
router.post(
  "/users/match-contacts",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { phones } = req.body; // string[]

    if (!Array.isArray(phones)) {
      res.status(400).json({ error: "phones must be an array" });
      return;
    }

    // נרמול מספרים — המרה לפורמט +972
    const normalized = phones.map(normalizePhone).filter(Boolean) as string[];

    const users = await prisma.user.findMany({
      where: { phone: { in: normalized } },
      select: { id: true, displayName: true, phone: true, avatarUrl: true },
    });

    res.json({ users });
  },
);

// נרמול מספר טלפון ישראלי ל-+972XXXXXXXXX
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("972") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 10)
    return `+972${digits.slice(1)}`;

  return null;
}

export default router;
