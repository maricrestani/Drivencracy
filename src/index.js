import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pollsRoutes from "./routes/polls.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(pollsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
