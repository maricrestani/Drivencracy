import { ObjectId } from "mongodb";
import { choicesCollection } from "../database/db.js";

export async function registerNewChoice(req, res) {
  const { title, pollId } = req.body;

  try {
    await choicesCollection.insertOne({ title, pollId: ObjectId(pollId) });
    const newChoice = await choicesCollection.findOne({ title });
    res.send({ newChoice }).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function returnChoices(req, res) {
  const { id } = req.params;

  try {
    const pollChoices = await choicesCollection
      .find({ pollId: ObjectId(id) })
      .toArray();

    if (pollChoices.length === 0) {
      return res.send("Enquete não existe").status(404);
    }

    res.send(pollChoices);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
