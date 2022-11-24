export default interface IPractitioner {
    id: number;
    name: string;
    email: string | null;
    contact: string | null;
    dob: Date | null;
    working_day: string | null;
    start_time: Date | null;
    end_time: Date | null;
    is_specialist: number | null;
    photo: string | null;
    specialization: string[] | null;
}
