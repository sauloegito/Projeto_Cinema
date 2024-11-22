export interface Assento {
    numero: number;
    linha: number;
    coluna: number;
    ocupado: boolean;
    visivel: boolean;
    selecionado?: boolean;
    nome?: string;
    cpf?: string;
  }
  