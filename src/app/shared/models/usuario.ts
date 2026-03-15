import { Role } from "./role";

export interface Usuario {
  id : number,
  userName: String,
  password: String,
  email : String,
  role : Role
}
