import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../models/filmes';
import { CinemaService } from './cinema.service';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private nextId = 4;
  filmes$: Observable<Filme[]>;

  constructor(
    private readonly cinemaService: CinemaService) {
    this.filmes$ = this.cinemaService.filmesSubject.asObservable();
    this.filmes$.subscribe(filmes => {
      filmes.forEach(filme => {
        this.cinemaService.inicializarSessoes(filme.id);
      });
    });
  }

  getFilmes(): Observable<Filme[]> {
    return this.filmes$;
  }

  adicionarFilmeService(titulo: string, salaId: number,
    inicio: string | undefined, duracao: number, sessoes: number | undefined,
    posterURL: string, sinopse: string): void {

    const novoFilme: Filme = { id: this.nextId++, titulo, salaId, inicio, duracao, sessoes, posterURL, sinopse, horarios: {} };
    const filmes = [...this.cinemaService.filmesSubject.getValue(), novoFilme];
    this.cinemaService.filmesSubject.next(filmes); // Inicializa as sessões e assentos para o novo filme
  }

  atualizarFilme(filmeAtualizado: Filme): void {
    const filmes = this.cinemaService.filmesSubject.getValue();
    const index = filmes.findIndex(f => f.id === filmeAtualizado.id);

    if (index !== -1) {
      filmeAtualizado.salaId = Number(filmeAtualizado.salaId);
      filmes[index] = { ...filmeAtualizado };
      this.cinemaService.filmesSubject.next([...filmes]); // Emite a nova lista de filmes
    } else {
      alert('Filme não encontrado para atualização.');
    }
  }

  excluirFilme(filmeId: number): void {
    const filmes = this.cinemaService.filmesSubject.getValue();
    const filmesAtualizados = filmes.filter(filme => filme.id !== filmeId);

    if (filmes.length !== filmesAtualizados.length) {
      this.cinemaService.filmesSubject.next(filmesAtualizados);
      alert(`Filme com ID ${filmeId} excluído com sucesso.`);
    } else {
      alert('Filme não encontrado para exclusão.');
    }
  }

}
