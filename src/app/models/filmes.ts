import { Assento } from './assento';

export type TipoSessoes = { [horario: string]: Assento[] };

export interface Filme {
    id: number;
    titulo: string;
    inicio?: string;
    duracao: number;
    sessoes?: number;
    posterURL: string;
    sinopse: string;
    salaId?: number;
    horarios?: TipoSessoes;
}
