import { Program } from "./program";
import { User } from "./user";

export interface enrollment{
    id:number,
    userId:number,
    user:User,
    programId: number,
    program : Program,
    createdDate:Date,
    dueDate:Date,
    payment: number
   
}