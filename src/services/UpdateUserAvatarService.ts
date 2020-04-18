import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import User from '../models/User';

import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Somente usuários autenticados podem alterar o seu avatar!');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
