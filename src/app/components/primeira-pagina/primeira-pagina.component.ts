import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filmes';
import { FilmeService } from '../../services/filme.service';
import { CinemaService } from '../../services/cinema.service';


@Component({
  selector: 'app-primeira-pagina',
  templateUrl: './primeira-pagina.component.html',
  styleUrls: ['./primeira-pagina.component.css']
})
export class PrimeiraPaginaComponent implements OnInit {
  filmes: Filme[] = [];
  tipo!: string;
  sala!: number;

  constructor(private filmeService: FilmeService, private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.filmeService.getFilmes().subscribe((filmes: Filme[]) => {
      this.filmes = filmes;
    });
  }

  selecionar(id: number): string {
    const tipoSala = this.cinemaService.getSalaById(id);
    return tipoSala ? tipoSala.tipo : 'Desconhecido';
  }
}
