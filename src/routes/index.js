import { Router } from "express";
import choicesRouter from "./choices.routes.js";
import pollsRouter from "./polls.routes.js";

const route = Router();

route.use(pollsRouter);
route.use(choicesRouter);

export default route;
