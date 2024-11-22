// sessao.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '../../../services/cinema.service';


@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {
  sessoes: string[] = [];
  posterUrl: string = '';
  titulo: string = '';
  sinopse!: string;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: CinemaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Pega o ID do filme
    if (id) {
      const filmeId = parseInt(id, 10);
      const filme = this.service.getFilmeById(filmeId);
      if (filme) {
        this.titulo = filme.titulo;
        this.posterUrl = filme.posterURL;
        this.sinopse = filme.sinopse;
        this.sessoes = this.service.getSessoes(filmeId);
      }
    }
  }

  selecionarSessao(horario: string): void {
    const id = this.route.snapshot.paramMap.get('id'); // Pega o ID do filme
    this.router.navigate([`/sessao/${id}/assentos`], { queryParams: { horario } }); // Envia o horário como parâmetro
  }
}
