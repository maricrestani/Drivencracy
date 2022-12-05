import { ObjectId } from "mongodb";
import {
  choicesCollection,
  pollsCollection,
  votesCollection,
} from "../database/db.js";

export async function returnPollValidation(req, res, next) {
  const { id } = req.params;

  try {
    const pollExists = await pollsCollection.findOne({ _id: ObjectId(id) });

    if (!pollExists) {
      return res.send("Enquete não existe").status(404);
    }

    const pollChoices = await choicesCollection
      .find({ pollId: ObjectId(id) })
      .toArray();

    const choiceIdVotesArray = [];
    const sumVoteOptions = [];
    let mostVotes = 0;
    let mostVotedId = 0;

    for (let i = 0; i < pollChoices.length; i++) {
      const idVoteOption = pollChoices[i]._id;

      choiceIdVotesArray.push(idVoteOption);

      const votesArray = await votesCollection
        .find({ choiceId: ObjectId(idVoteOption) })
        .toArray();

      const numVotesInOption = votesArray.length;
      sumVoteOptions.push(numVotesInOption);

      if (numVotesInOption > mostVotes) {
        mostVotes = numVotesInOption;
        mostVotedId = idVoteOption;
      }
    }

    const optionTitle = await choicesCollection.findOne({
      _id: ObjectId(mostVotedId),
    });

    const result = {
      _id: id,
      title: pollExists.title,
      expireAt: pollExists.expireAt,
      result: {
        title: optionTitle.title,
        votes: mostVotes,
      },
    };
    res.locals.result = result;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
