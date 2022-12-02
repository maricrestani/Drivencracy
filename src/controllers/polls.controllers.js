import { pollsCollection } from "../database/db.js";

export async function registerNewPoll(req, res) {
  const expireAt = res.locals.expireAt;
  const title = res.locals.title;

  try {
    await pollsCollection.insertOne({ title, expireAt });
    const newPoll = await pollsCollection.findOne({ title });
    res.send({ newPoll }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnPolls(req, res) {
  try {
    const polls = await pollsCollection.find({}).toArray();
    res.send(polls);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
