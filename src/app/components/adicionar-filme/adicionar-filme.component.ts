import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-adicionar-filme',
  templateUrl: './adicionar-filme.component.html',
  styleUrls: ['./adicionar-filme.component.css']
})
export class AdicionarFilmeComponent {

  titulo: string = '';
  posterURL: string = '';
  sinopse: string = '';
  tipo!: string;
  duracao: number | null = null;
  salaId: number | null = null;
  salas: { id: number, capacidade: number, tipo: string }[] = [];

  constructor(private router: Router, private filmeService: FilmeService, private cinemaService: CinemaService) { } 

  ngOnInit(): void {
    this.salas = this.cinemaService.getSalas(); // Pega a lista de salas do serviço
  }

  adicionarFilme(titulo: string, numeroSala: string, numero: string, posterURL: string, sinopse: string) {
    this.titulo = titulo;
    this.duracao = Number(numero);
    this.posterURL = posterURL;
    this.sinopse = sinopse;
    this.salaId = Number(numeroSala);

    if (this.titulo && this.salaId, this.posterURL && this.duracao !== null && this.sinopse) { // Verifica se todos os campos estão preenchidos
      this.filmeService.adicionarFilmeService(this.titulo,this.salaId, this.duracao, this.posterURL, this.sinopse);
      alert('Filme adicionado com sucesso!');
      this.router.navigate(['/']);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
  
  
}
