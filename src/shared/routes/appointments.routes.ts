import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../../modules/appointments/services/CreateAppointmentsService';
import AppointmentsRepoistory from '../../modules/appointments/repositories/AppoitmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepoistory);
  const appointments = await appointmentRepository.find();
  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line camelcase
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appointment = await createAppointment
    .execute({ date: parsedDate, providerId: provider_id });
  return response.json(appointment);
});

export default appointmentsRouter;
