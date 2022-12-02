import { pollsCollection } from "../database/db.js";

export async function registerNewPoll(req, res) {
  //const poll = req.body;
  const { title, expireAt } = req.body;
  console.log("title e expire no controller", title, expireAt);

  try {
    await pollsCollection.insertOne({ title, expireAt });
    console.log("ver se chega aqui");
    res.send({ title, expireAt, _id }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnPolls(req, res) {
  try {
    const polls = await pollsCollection.find({}).toArray();
    console.log("polls", polls);
    res.send(polls);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
