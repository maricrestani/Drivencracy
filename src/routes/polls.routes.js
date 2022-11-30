import { Router } from "express";
import {
  registerNewPoll,
  returnPolls,
} from "../controllers/polls.controllers.js";
import { registerPollValidation } from "../middlewares/polls.middlewares.js";

const router = Router();

router.post("/poll", registerPollValidation, registerNewPoll);
router.get("/poll", returnPolls);

export default router;
