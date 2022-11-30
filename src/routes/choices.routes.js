import { Router } from "express";
import { choiceValidation } from "../middlewares/choices.middlewares.js";
import { registerNewChoice } from "../controllers/choices.controllers.js";
const router = Router();

router.post("/choice", choiceValidation, registerNewChoice);

export default router;
