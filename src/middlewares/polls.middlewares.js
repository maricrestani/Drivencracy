import dayjs from "dayjs";

export function registerPollValidation(req, res, next) {
  const { title, expireAt } = req.body;

  if (!title) {
    return res.status(422).send({ message: error.detail || error.message });
  }

  if (!expireAt) {
    const newExpireAt = dayjs().format("YYYY-MM-DD hh:mm").add(30, "day");
    expireAt = newExpireAt;
  }

  next();
}
