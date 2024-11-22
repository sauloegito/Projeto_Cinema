import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from '../../../models/filmes';
import { FilmeService } from '../../../services/filme.service';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.css'
})
export class GerenciarFilmesComponent {
  filmes: Filme[] = [];


  constructor(
    private readonly filmeService: FilmeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.filmeService.filmes$.subscribe(filmes => {
      this.filmes = filmes;
    }); // Carrega os filmes ao iniciar
  }

  editarFilme(filme: Filme): void {
    this.router.navigate(['/editar-filme', filme.id]); // Navega para a página de edição
  }

  excluirFilme(filmeId: number): void {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
      this.filmeService.excluirFilme(filmeId);// Atualiza o serviço
    }
  }

}
