import { Schedule } from './schedule.interface';

export interface Change {
    applicantEmployee: string;
    affectedEmployee: string;
    shiftApplicant: Schedule;
    shiftAffected: Schedule;
    changeDate: string;
    status: string
}
