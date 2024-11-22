export interface Sala {
    id: number;
    tipo: string;
    linhas: number;
    colunas: number;
    inutilizados?: number[];
}
