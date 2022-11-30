import { pollsCollection } from "../database/db.js";

export async function registerNewPoll(req, res) {
  const title = (res.locals.title = title);
  const expireAt = (res.locals.expireAt = expireAt);
  // const poll = { title, expireAt };

  try {
    await pollsCollection.insertOne({ poll });
    res.send({ title, expireAt }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnPolls(req, res) {
  try {
    const polls = await pollsCollection.find({}).toArray();
    res.send({ polls });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
