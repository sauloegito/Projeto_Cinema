import { Injectable } from '@angular/core';
import { Sala } from '../models/sala';
import { Assento } from '../models/assento';
import { BehaviorSubject } from 'rxjs';
import { Filme, TipoSessoes } from '../models/filmes';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public readonly INTERVALO_LIMPEZA = 20;
  public readonly HORARIO_LIMITE = 23 * 60; // Termina em 23:00 


  private readonly salas: Sala[] = [
    { id: 1, tipo: '3D', linhas: 6, colunas: 7, inutilizados: [12, 38] },
    { id: 2, tipo: 'IMAX', linhas: 8, colunas: 9, inutilizados: [4, 9 + 4, 18 + 4, 27 + 4, 36 + 4] },
    { id: 3, tipo: '2D', linhas: 8, colunas: 12, inutilizados: [2, 10 + 2, 20 + 2, 30 + 2, 40 + 2] }
  ];

  public readonly filmesSubject = new BehaviorSubject<Filme[]>([
    {
      id: 1,
      titulo: 'The Matrix',
      inicio: '14:00',
      duracao: 140,
      sessoes: 2,
      posterURL: 'https://media.fstatic.com/Dsnc8_BpNuQaIP04acXtB2V8sU0=/322x478/smart/filters:format(webp)/media/movies/covers/2011/07/6aa590bdfc94c6589dba4dc303057495.jpg',
      sinopse: 'Em um futuro próximo, Thomas Anderson, um jovem programador de computador' +
        ' que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais ' +
        'encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro.',
      salaId: 1,
    },

    {
      id: 2,
      titulo: 'O ilusionista',
      inicio: '14:20',
      duracao: 90,
      posterURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-mi1hGavFqyhmD_Xm7JVQnbm6_XiKIEGM7BIPhHxOA20vR7cp',
      sinopse: 'O famoso ilusionista Eisenheim assombra as platéias de Viena com seu impressionante ' +
        'espetáculo de mágica. Suas apresentações despertam a curiosidade de um dos mais poderosos ' +
        'e céticos homens da Europa, o Príncipe Leopold.',
      salaId: 2,
    },

    {
      id: 3,
      titulo: 'Terrifier',
      inicio: '15:10',
      duracao: 82,
      posterURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS64MQjQg496AMli5m1k6-JBNaZdSDcRXjL2NBr3_bpVfwCOfQX',
      sinopse: 'Em Terrifier, um programa de televisão passa. Nele, um repórter entrevista uma mulher gravemente ' +
        'desfigurada, a única sobrevivente de um massacre ocorrido no Halloween anterior.',
      salaId: 3,
    },


  ]);

  constructor() { }

  getSalas(): { id: number, capacidade: number, tipo: string }[] {
    return this.salas.map(sala => ({
      ...sala,
      capacidade: this.capacidade(sala)
    }));
  }

  private getSalaById(salaId: number | undefined): Sala | undefined {
    return this.salas.find(sala => sala.id === salaId);
  }

  quantidadeColunas(salaId: number): number {
    const sala = this.getSalaById(salaId);
    return (sala?.colunas ?? 0);
  }

  buscarTipo(salaId: number | undefined): string {
    const sala = this.getSalaById(salaId);
    return (sala) ? sala.tipo : 'Tipo Desconhecido';
  }

  private capacidade(sala: Sala | undefined): number {
    if (!sala) {
      return 0;
    }

    let total = sala.linhas * sala.colunas;

    const ocultos = sala.inutilizados?.length;
    if (ocultos) {
      total -= ocultos;
    }
    return total;
  }

  getFilmeById(filmeId: number): Filme | undefined {
    return this.filmesSubject.getValue().find(filme => filme.id === filmeId);
  }

  getAssentos(filmeId: number, horario: string, salaId: number): Assento[] | undefined {
    const filme = this.getFilmeById(filmeId);
    if (filme) {
      if (!filme.horarios) {
        filme.horarios = {};
      }
      if (!filme.horarios[horario]) {
        // Cria os assentos para a sessão se ainda não existir
        filme.horarios[horario] = this.gerarAssentos(salaId);

      }
      return filme.horarios[horario];
    }
    return undefined;
  }

  getSessoes(filmeId: number): string[] {
    let assentos: TipoSessoes = {};
    const filme = this.getFilmeById(filmeId);
    if (filme?.horarios) {
      assentos = filme.horarios;
    }
    return Object.keys(assentos || {})
  }

  private gerarAssentos(salaId: number): Assento[] {
    const assentos: Assento[] = [];
    const sala = this.getSalaById(salaId);
    let idAssento = 0;
    for (let linha = 0; linha < (sala?.linhas || 0); linha++) {
      for (let coluna = 0; coluna < (sala?.colunas || 0); coluna++) {
        const ocultar = sala?.inutilizados?.includes(++idAssento)
        const assento: Assento = {
          numero: idAssento, linha, coluna,
          visivel: Boolean(!ocultar),
          ocupado: false, nome: '', cpf: ''
        }
        assentos.push(assento);
      }
    }
    return assentos;
  }

  private converterHorario(horario: string | undefined): number {
    if (horario) {
      const [horas, minutos] = horario.split(':');
      return (+horas * 60 + +minutos);
    }
    return 14 * 60; // valor default 14:00
  }

  inicializarSessoes(filmeId: number): void {
    const filme = this.getFilmeById(filmeId);
    if (!filme) {
      return;
    }
    filme.horarios = {}

    const sala = filme.salaId || 0;

    const iteracao = (horarioAtual: number): void => {
      const hora = Math.floor(horarioAtual / 60);
      const minuto = horarioAtual % 60;
      const horarioFormatado = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;

      if (!filme.horarios) {
        filme.horarios = {};
      }
      filme.horarios[horarioFormatado] = this.gerarAssentos(sala);
    }
    
    this.mapearHorarios(filme, iteracao);
  }

  mapearHorarios(filme: MontadorHorarios, iteracao?: (horarioAtual: number) => void): { inicio: number, final: number } {
    const qntdSessoes = filme.sessoes || 10;
    const horarioInicial = this.converterHorario(filme.inicio);
    const duracaoEmMinutos = filme.duracao + this.INTERVALO_LIMPEZA;

    let horarioAtual = horarioInicial;
    let proximaSessao = horarioAtual + duracaoEmMinutos;

    for (let contaSessao = 0; contaSessao < qntdSessoes && horarioAtual < this.HORARIO_LIMITE; contaSessao++) {
      if (iteracao) {
        iteracao(horarioAtual);
      }

      horarioAtual = proximaSessao;
      proximaSessao += duracaoEmMinutos; // Próximo horário
    }
    return { inicio: horarioInicial, final: horarioAtual };
  }

}

interface MontadorHorarios {
  inicio?: string;
  duracao: number;
  sessoes?: number;
}

