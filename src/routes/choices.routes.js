import { Router } from "express";
import { choiceValidation } from "../middlewares/choices.middlewares.js";
import { registerNewChoice, returnChoices } from "../controllers/choices.controllers.js";

const choicesRouter = Router();

choicesRouter.post("/choice", choiceValidation, registerNewChoice);
choicesRouter.get("/poll/:id/choice", returnChoices);

//   /poll/:id/choice

export default choicesRouter;
