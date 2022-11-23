export interface PractitionerInterface {
  id: number;
  name: string;
  email: string;
  contact: string;
  dob: Date;
  working_day: string;
  start_time: Date;
  end_time: string;
  is_specialist: boolean;
  photo: string;
  specialization: Array<string>;
}

export type PractitionerToCreate = Omit<PractitionerInterface, 'id'>;
