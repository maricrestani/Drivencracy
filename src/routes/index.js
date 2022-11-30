import { Router } from "express";
import pollsRouter from "./polls.routes.js";

const route = Router();

route.use(pollsRouter);

export default route;
