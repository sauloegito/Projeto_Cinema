import { Component } from '@angular/core';
import { Filme } from '../../models/filmes';
import { CinemaService } from '../../services/cinema.service';
import { FilmeService } from '../../services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filmes: Filme[] = [];
  tipo!: string;
  sala!: number;

  constructor(
    private readonly filmeService: FilmeService,
    private readonly cinemaService: CinemaService
  ) { }

  ngOnInit(): void {
    this.filmeService.getFilmes().subscribe((filmes: Filme[]) => {
      this.filmes = filmes;
    });
  }

  tipoSala(salaId: number | undefined): string {
    return this.cinemaService.buscarTipo(salaId);
  }

}
