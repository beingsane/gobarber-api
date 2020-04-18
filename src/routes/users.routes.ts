import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User.model';
import CreateUserService from '../services/CreateUser.service';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(422).json({ error: err.message });
  }
});

export default usersRouter;
