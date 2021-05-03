import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepoistory extends Repository<Appointment> {
 private appointments: Appointment[];

 public async findByDate(date: Date): Promise<Appointment | null> {
   const findAppointment = await this.findOne({
     where: { date },
   });
   return findAppointment || null;
 }
}

export default AppointmentsRepoistory;
