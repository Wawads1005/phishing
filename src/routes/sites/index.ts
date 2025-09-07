import { getSite } from "@/controllers/api/sites";
import express from "express";

const sitesRouter = express.Router();

sitesRouter.get("/:siteId", getSite);

export { sitesRouter };
