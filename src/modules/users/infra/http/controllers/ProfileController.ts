import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id, name, email, old_password, password,
    });

    delete user.password;

    return response.json(user);
  }
}

export default ProfileController;
