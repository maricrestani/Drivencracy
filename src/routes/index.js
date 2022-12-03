import { Router } from "express";
import choicesRouter from "./choices.routes.js";
import pollsRouter from "./polls.routes.js";
import resultsRouter from "./results.routes.js";
import votesRouter from "./votes.routes.js";

const route = Router();

route.use(pollsRouter);
route.use(choicesRouter);
route.use(votesRouter);
route.use(resultsRouter)

export default route;
