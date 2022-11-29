import { Router } from "express";
import registerNewPoll from "../controllers/polls.controllers.js";
import registerPollValidation from "../middlewares/polls.middlewares.js";

const router = Router();

router.post("/poll", registerPollValidation, registerNewPoll);

export default router;

/*
**POST** `/poll`
        
        ```jsx
        {
            title: "Qual a sua linguagem favorita?",
        		expireAt: "2022-02-28 01:00" 
        }
        ```

/*
POST`/poll`;
GET`/poll`;
GET`/poll/:id/choice`;
GET`/poll/:id/result`;
POST`/choice`;
POST`/choice/:id/vote`;
*/
