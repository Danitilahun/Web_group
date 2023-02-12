export class CreateJobDto{
    readonly status:string;
    readonly job_title: string;
    readonly company:string;
    readonly job_type:string;
    readonly level_of_education:string;
    readonly experience:string;
    readonly location:string;
    readonly vacancies:number;
    readonly salary:number;
    readonly deadline:string;
}