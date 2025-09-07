import express from "express";
import { authRouter } from "@/routes/api/auth";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

export { apiRouter };
