import dayjs from "dayjs";
import { registerPollSchema } from "../models/polls.models.js";

export function registerPollValidation(req, res, next) {
  const { title, expireAt } = req.body;
  let newExpireAt = expireAt;

  const validation = registerPollSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    const erros = validation.error.details.map((d) => d.message);
    res.status(422).send(erros);
    return;
  }

  if (!expireAt) {
    const addedDaysToExpire = dayjs().add(30, "day");
    newExpireAt = addedDaysToExpire.format("YYYY-MM-DD hh:mm");
  }

  res.locals.expireAt = newExpireAt;
  res.locals.title = title;
  next();
}
