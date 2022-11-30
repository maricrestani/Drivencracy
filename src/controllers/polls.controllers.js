import { pollsCollection } from "../database/db.js";

export async function registerNewPoll(req, res) {
  const poll = req.body;
  // const title = res.locals.title;
  //const expireAt = res.locals.expireAt;
  // const poll = { title, expireAt };
  console.log("poll", poll);
  try {
    await pollsCollection.insertOne({ poll });
    console.log("ver se chega aqui");
    res.send({ poll }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnPolls(req, res) {
  try {
    const polls = await pollsCollection.find({}).toArray();
    console.log("polls");
    console.log(polls);
    res.send(polls);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
