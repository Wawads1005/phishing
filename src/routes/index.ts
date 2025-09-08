import express from "express";
import { apiRouter } from "@/routes/api";

const appRouter = express.Router();

appRouter.use("/api", apiRouter);

export { appRouter };
