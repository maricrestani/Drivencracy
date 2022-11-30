import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/index.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(route);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
