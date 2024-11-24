export interface User {
    id: number,
  firstName: string,
  lastName: string,
  passwordHash: string,
  contactNumber: string,
  email: string,
  nic: string,
  age: number,
  gender: Gender,
  height: number,
  weight:number,
  creationDate: Date,
  memberStatus: boolean,
  address: string,
  profileImage: string,
  role: UserRoles
}

    export enum UserRoles
    {
        Admin,
        Member
    }

    export enum Gender
    {
    Male,
    Female,
    Other
    }