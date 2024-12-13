import { enrollment } from "./enrollment";

export interface Payment
{
    id:number ,
    amount: number,
    date:Date ,
    entrollment: enrollment,
    entrollmentId:number,
    status:string
}