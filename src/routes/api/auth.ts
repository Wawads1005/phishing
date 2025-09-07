import { signIn } from "@/controllers/api/auth/signin";
import express from "express";

const authRouter = express.Router();

authRouter.post("/signin", signIn);

export { authRouter };
