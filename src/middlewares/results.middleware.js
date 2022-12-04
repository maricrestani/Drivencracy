import { ObjectId } from "mongodb";
import { choicesCollection, votesCollection } from "../database/db.js";

export async function resultsValidation(req, res, next) {
  const { id } = req.params;

  try {
    // ENCONTRO AS CHOICES DA POLL DESSE ID RECEBIDO POR PARAMS = POLLCHOICES
    const pollChoices = await choicesCollection
      .find({ pollId: ObjectId(id) })
      .toArray();

    if (pollChoices.length === 0) {
      return res.send("Enquete não existe").status(404);
    }

    /*
    const choiceTitles = pollChoices.map((item) => item.title);
    console.log("choiceTitles", choiceTitles);
*/

    // ENCONTRO AS IDS DE TODAS AS CHOICES CRIADAS NA POLL
    const choiceId = pollChoices.map((item) => item._id);
    console.log("choiceiD", choiceId);

    // ENCONTRO A COLLECTION VOTES
    const votesArray = await votesCollection.find({}).toArray();

    // console.log("votesarray", votesArray);

    //econtro o id de cada voto
    const choiceIdVotesArray = votesArray.map((item) => item.choiceId);

    console.log("choiceIdVotesArray", choiceIdVotesArray);

    let votesInThisPoll = [];
    for (let i = 0; i < choiceIdVotesArray.length; i++) {
      let vote = JSON.stringify(choiceIdVotesArray[i]);

      for (let i = 0; i < choiceId.length; i++) {
        let choice = JSON.stringify(choiceId[i]);
        if (vote === choice) {
          votesInThisPoll.push(vote);
        }
      }
    }

    console.log("votesInThisPoll ", typeof votesInThisPoll, votesInThisPoll);

    /*
   let titlesOfVotesInThisPoll = []

    for (let i = 0; i < votesInThisPoll.length; i++) {
      let vote = JSON.stringify(votesInThisPoll[i]);

      for (let i = 0; i < choiceId.length; i++) {
        let choice = JSON.stringify(choiceId[i]);

        if (vote === choice) {
          titlesOfVotesInThisPoll.push(vote);
        }
      }
    }
console.log("titlesOfVotesInThisPoll", titlesOfVotesInThisPoll);
*/

    function countItems(array) {
      const countMap = Object.create(null);

      for (const element of array) {
        if (!countMap[element]) {
          // Se ainda não existir elemento, definimos como um, já que
          // estamos na primeira ocorrência.
          countMap[element] = 1;
        } else {
          // Caso contrário, incrementamos um no número atual.
          countMap[element] += 1;
        }
      }

      console.log("here", JSON.parse(JSON.stringify(countMap)));
      return countMap;
    }

    countItems(votesInThisPoll);

    // res.send(pollChoices).status(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

/*
VOTES COLLECTION É ASSIM:
{ 
	_id: ObjectId("54759eb3c090d83494e2d000")
	createdAt: "2022-02-13 01:00", 
	choiceId: ObjectId("54759eb3c090d83494e2d999"), 
}

*/
