import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../entities/Appointment';
import AppointmentsRepoistory from '../repositories/AppoitmentsRepository';

import AppError from '../../../shared/errors/AppErros';

interface Request {
  providerId: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepoistory);
    const appointmentDate = startOfHour(date);
    const appointmentSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (appointmentSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
