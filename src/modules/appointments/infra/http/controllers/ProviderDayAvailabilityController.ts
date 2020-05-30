import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderDayAvailability.execute({ provider_id, day, month, year });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;