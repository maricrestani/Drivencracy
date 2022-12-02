import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { pollsCollection, choicesCollection } from "../database/db.js";
import { registerChoiceSchema } from "../models/choices.models.js";

export async function choiceValidation(req, res, next) {
  const { title, pollId } = req.body;

  const validation = registerChoiceSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    const erros = validation.error.details.map((d) => d.message);
    res.status(422).send(erros);
    return;
  }

  const pollExists = await pollsCollection.findOne({ _id: ObjectId(pollId) });

  if (!pollExists) {
    return res.status(404).send("Enquete não existe");
  }

  const dateToday = new Date(dayjs().format("YYYY-MM-DD hh:mm"));
  const pollDate = new Date(pollExists.expireAt);
  const pollExpired = dateToday.getTime() > pollDate.getTime();

  if (pollExpired) {
    return res.status(403).send("Enquete expirou");
  }

  const titleExists = await choicesCollection.findOne({ title: title });
  if (titleExists) {
    return res.status(409).send("Tittle já existe");
  }

  next();
}
