import joi from "joi";

export const registerPollSchema = joi.object({
  title: joi.string().min(3).required(),
  expireAt: joi.string()
});
