import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import settlementRoutes from "./routes/settlements";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter }); // ← export כדי שה-routes ישתמשו בו

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", settlementRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
