import { Router } from "express";
import { returnPollResults } from "../controllers/results.controller.js";
import { resultsValidation } from "../middlewares/results.middleware.js";

const resultsRouter = Router();

resultsRouter.get("/poll/:id/result", resultsValidation, returnPollResults);

export default resultsRouter;
