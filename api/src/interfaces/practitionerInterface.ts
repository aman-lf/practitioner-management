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
}

export type PractitionerToCreate = Omit<PractitionerInterface, 'id'>;
