import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-adicionar-filme',
  templateUrl: './adicionar-filme.component.html',
  styleUrls: ['./adicionar-filme.component.css']
})
export class AdicionarFilmeComponent {

  titulo: string = '';
  posterURL: string = '';
  duracao: number | null = null;

  constructor(private router: Router, private filmeService: FilmeService) { } 

  adicionarFilme(titulo: string, numero: string, posterURL: string) {
    this.titulo = titulo;
    this.duracao = Number(numero);
    this.posterURL = posterURL;

    if (this.titulo && this.posterURL && this.duracao !== null) { // Verifica se todos os campos estão preenchidos
      this.filmeService.adicionarFilmeService(this.titulo, this.duracao, this.posterURL);
      alert('Filme adicionado com sucesso!');
      this.router.navigate(['/']);
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
  
  
}
