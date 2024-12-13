import { enrollment } from "./enrollment"

export interface User {
    id: number,
  firstName: string,
  lastName: string,
  passwordHash: string,
  contactNumber: string,
  email: string,
  nic: string,
  age: number,
  gender?: Gender,
  height?: number,
  weight?:number,
  creationDate: Date,
  memberStatus?: boolean,
  address?: string,
  profileImage?: string,
  entrollments : enrollment[]
  role: UserRoles
}

    export enum UserRoles
    {   Member,
        Admin ,
        
    }

    export enum Gender
    {
    Male,
    Female,
    Other
    }