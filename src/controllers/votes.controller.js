import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { votesCollection } from "../database/db.js";

export async function registerNewVote(req, res) {
  const { id } = req.params;
  const dateNow = dayjs().format("YYYY-MM-DD hh:mm");

  await votesCollection.insertOne({
    createdAt: dateNow,
    choiceId: ObjectId(id),
  });

  res.sendStatus(201);
}


