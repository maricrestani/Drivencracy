import { pollsCollection } from "../database/db.js";

export async function registerNewPoll(req, res) {
  const poll = res.locals.poll;
  console.log("poll no controller", poll);

  try {
    await pollsCollection.insertOne({ poll });
    res.send(poll).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
