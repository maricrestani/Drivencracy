import dayjs from "dayjs";

export function registerPollValidation(req, res, next) {
  const { title, expireAt } = req.body;
  let newExpireAt = expireAt;

  if (!title) {
    return res.status(422).send({ message: error.detail || error.message });
  }

  if (!expireAt) {
    const addedDaysToExpire = dayjs().add(30, "day");
    newExpireAt = addedDaysToExpire.format("YYYY-MM-DD hh:mm");
  }

  res.locals.expireAt = newExpireAt;
  res.locals.title = title;
  next();
}
