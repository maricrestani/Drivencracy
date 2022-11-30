import { Router } from "express";
import {
  registerNewPoll,
  returnPolls,
} from "../controllers/polls.controllers.js";
import { registerPollValidation } from "../middlewares/polls.middlewares.js";

const pollsRouter = Router();

pollsRouter.post("/poll", registerPollValidation, registerNewPoll);
pollsRouter.get("/poll", returnPolls);

export default pollsRouter;
