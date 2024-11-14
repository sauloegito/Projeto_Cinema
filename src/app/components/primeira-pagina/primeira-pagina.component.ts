import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filmes';
import { FilmeService } from '../../services/filme.service';


@Component({
  selector: 'app-primeira-pagina',
  templateUrl: './primeira-pagina.component.html',
  styleUrls: ['./primeira-pagina.component.css']
})
export class PrimeiraPaginaComponent implements OnInit {
  filmes: Filme[] = [];
  modalAberto = false;
  filmeSelecionado: any;

  constructor(private filmeService: FilmeService) { }


  ngOnInit(): void {
    this.filmeService.getFilmes().subscribe((filmes: Filme[]) => {
      this.filmes = filmes;
    });
  }
}
