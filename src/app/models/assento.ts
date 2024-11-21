import { Sala } from "./sala";

export interface Assento {
    numero: number;
    ocupado: boolean;
    selecionado?: boolean;
    nome?: string;
    cpf?: string;
  }
  