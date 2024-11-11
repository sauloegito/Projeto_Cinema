// filme.service.ts
import { Injectable } from '@angular/core';
import { Filme } from '../models/filmes';
import { Assento } from '../models/assento';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private filmes: Filme[] = [
    { id: 1, titulo: 'The Matrix', duracao: 140, posterURL: 'https://media.fstatic.com/Dsnc8_BpNuQaIP04acXtB2V8sU0=/322x478/smart/filters:format(webp)/media/movies/covers/2011/07/6aa590bdfc94c6589dba4dc303057495.jpg'},
    { id: 2, titulo: 'O ilusionista', duracao: 90, posterURL: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-mi1hGavFqyhmD_Xm7JVQnbm6_XiKIEGM7BIPhHxOA20vR7cp'},
    { id: 3, titulo: 'Terrifier' , duracao: 82, posterURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS64MQjQg496AMli5m1k6-JBNaZdSDcRXjL2NBr3_bpVfwCOfQX'}
  ];

  private assentosPorFilmeESessao: { [filmeId: number]: { [horario: string]: Assento[] } } = {};

  private horariosDeSessao: string[] = [];

  constructor() {
    this.filmes.forEach(filme => {
      this.inicializarSessoes(filme.id);
    });
  }

  private nextId = 4;

  getFilmes(): Filme[] {
    return this.filmes;
  }

  adicionarFilmeService(titulo: string, duracao: number, posterURL: string): void {
    const novoFilme: Filme = { id: this.nextId++, titulo, duracao , posterURL };
    this.filmes.push(novoFilme);
    this.inicializarSessoes(novoFilme.id); // Inicializa as sessões e assentos para o novo filme
  }

  getAssentos(filmeId: number, horario: string): Assento[] {
    if (!this.assentosPorFilmeESessao[filmeId][horario]) {
      this.assentosPorFilmeESessao[filmeId][horario] = this.gerarAssentos(); // Cria os assentos para a sessão se ainda não existir
    }
    return this.assentosPorFilmeESessao[filmeId][horario];
  }

  ocuparAssento(filmeId: number, horario: string, numeroAssento: number, nome: string, cpf: string): void {
    const assento = this.assentosPorFilmeESessao[filmeId][horario]?.find(a => a.numero === numeroAssento);
    if (assento && !assento.ocupado) {
      assento.ocupado = true;
      assento.nome = nome;
      assento.cpf = cpf;
      console.log(`Assento ${assento.numero} agora está ocupado`);
    } else {
      console.log(`Erro: Assento já ocupado ou não encontrado.`);
    }
  }

  private gerarAssentos(): Assento[] {
    return Array.from({ length: 40 }, (_, i) => ({
      numero: i + 1,
      ocupado: false,
      nome: '',
      cpf: '' }));
  }
  
  
  private inicializarSessoes(filmeId: number): void {
    this.assentosPorFilmeESessao[filmeId] = {};
    const duracao = this.filmes.find(f => f.id === filmeId)?.duracao || 0;
    const duracaoEmMinutos = duracao + 20; // Duração do filme mais intervalo de 20 minutos
    const horarioInicial = 14 * 60; 

    let horarioAtual = 14 * 60; // Inicia em 14:00 
    const horarioFim = 23 * 60; // Termina em 23:00 
    
    while (horarioAtual < horarioFim) {
        const hora = Math.floor(horarioAtual / 60);
        const minuto = horarioAtual % 60;
        const horarioFormatado = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
        
        this.assentosPorFilmeESessao[filmeId][horarioFormatado] = this.gerarAssentos();
        horarioAtual += duracaoEmMinutos; // Próximo horário
    }
  }
}
