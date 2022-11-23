export default interface IPractitioner {
    id: number;
    name: string;
    email: string;
    contact: string;
    dob: Date;
    working_day: string;
    start_time: Date;
    end_time: Date;
    is_specialist: number;
    photo: string;
    specialization: Array<string>;
}
