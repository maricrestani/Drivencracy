import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";

export async function registerVoteValidation(req, res, next) {
  const { id } = req.params;
  const pollChoice = await choicesCollection.findOne({ _id: ObjectId(id) });

  if (!pollChoice) {
    return res.send("Opção não existe").status(404);
  }

  const findPollID = pollChoice.pollId;
  const findPoll = await pollsCollection.findOne({
    _id: ObjectId(findPollID),
  });

  const dateToday = new Date(dayjs().format("YYYY-MM-DD hh:mm"));
  const pollDate = new Date(findPoll.expireAt);
  const pollExpired = dateToday.getTime() > pollDate.getTime();

  if (pollExpired) {
    return res.status(403).send("Enquete expirou");
  }

  next();
}
