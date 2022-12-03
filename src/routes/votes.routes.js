import { Router } from "express";
import { registerNewVote } from "../controllers/votes.controller.js";
import { registerVoteValidation } from "../middlewares/votes.middlewares.js";

const votesRouter = Router();

votesRouter.post("/choice/:id/vote", registerVoteValidation, registerNewVote);

export default votesRouter;
