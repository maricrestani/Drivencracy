import { Router } from "express";
import { returnPollResults } from "../controllers/results.controller.js";

const resultsRouter = Router();

resultsRouter.get("/poll/:id/result", returnPollResults);

export default resultsRouter;
