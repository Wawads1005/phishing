import express from "express";
import { apiRouter } from "@/routes/api";
import { sitesRouter } from "@/routes/sites";

const appRouter = express.Router();

appRouter.use("/sites", sitesRouter);
appRouter.use("/api", apiRouter);

export { appRouter };
