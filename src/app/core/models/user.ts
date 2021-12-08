import { Facture } from "./facture";
import {Role} from "./role";

export class User {
  idUser: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  phone: string;
  email: string;
  cin: string;
  password: string;
  isDarkMode : boolean;
  categorieUser: string;
  proffesion: string;
  factures: Facture[];
  roles: Role[];



}
