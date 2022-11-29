//import { registerPollSchema } from "../models/polls.models";

export function registerPollValidation(req, res, next) {
  const { title, expireAt } = req.body;
  console.log("title e expire no middleware", title, expireAt);

  if (!title) {
    // **Title** não pode ser uma string vazia, retornar status 422.
    //se não for suficiente, tentar se length da string ===0 || >1 para verificar se é vazia
    return res.status(422).send({ message: error.detail || error.message });
  }

  if (!expireAt) {
    // Se **expireAt** for vazio deve ser considerado 30 dias de enquete por padrão.
    // expireAt = dayJs() + 30;
    console.log("resolver expire");
  }

  /*
    const { error } = registerPollSchema.validate(title, expireAt, { abortEarly: false }); 
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send("Erro: ", errors);
    }
*/

  res.locals.poll = req.body;

  next();
}
