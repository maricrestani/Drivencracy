import joi from "joi";

export const registerChoiceSchema = joi.object({
  title: joi.string().min(1).required(),
  pollId: joi.string().min(1).required(),
});
