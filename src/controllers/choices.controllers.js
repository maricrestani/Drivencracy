import { choicesCollection } from "../database/db.js";

export async function registerNewChoice(req, res) {
  const title = res.locals.title;
  const pollId = res.locals.pollId;

  try {
    await choicesCollection.insertOne({ title, pollId });
    res.send({ title, pollId }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
