import {Classe} from './classe';

export class Friend {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public department: string,
    public email: string,
    public country: string,
    public classe: Classe
  ) {
  }
}
