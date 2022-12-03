import { ObjectId } from "mongodb";
import { pollsCollection } from "../database/db.js";

export async function returnPollResults(req, res) {
  const { id } = req.params;

  try {
    const poll = await pollsCollection.find({ _id: ObjectId(id) }).toArray();

   // console.log("poll no controller", poll);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

/*
{
	_id: "54759eb3c090d83494e2d222",
	title: "Qual a sua linguagem de programação favorita?"
	expireAt: "2022-02-14 01:00",
	result : {
		title: "Javascript",
		votes: 487
	}
}
*/
