export function returnPollResults(req, res) {
  const results = res.locals.result;
  res.send(results);
}
