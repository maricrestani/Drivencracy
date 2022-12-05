import { Router } from "express";
import { returnPollResults } from "../controllers/results.controller.js";
import { returnPollValidation } from "../middlewares/results.middlewares.js";

const resultsRouter = Router();
returnPollValidation

resultsRouter.get("/poll/:id/result", returnPollValidation, returnPollResults);

export default resultsRouter;
