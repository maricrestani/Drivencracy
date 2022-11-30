import { pollsCollection, choicesCollection } from "../database/db.js";

export async function choiceValidation(req, res, next) {
  const { title, pollId } = req.body;

  try {
    const pollExists = await pollsCollection
      .find({ _id: ObjectId(pollId) })
      .toArray();

    if (!pollExists) {
      return res.send("Enquete não existe").status(404);
    }

    // Se a enquete já estiver expirado deve retornar erro com status 403.

    if (!title) {
      return res.status(422);
    }

    const titleExists = await choicesCollection.find({ title }).toArray();
    if (titleExists) {
      return res.send("Tittle já existe").status(409);
    }

    res.locals.title = title;
    res.locals.pollId = pollId;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
