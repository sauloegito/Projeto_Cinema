// sessao.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';


@Component({
  selector: 'app-sessao',
  templateUrl: './sessao.component.html',
  styleUrls: ['./sessao.component.css']
})
export class SessaoComponent implements OnInit {
  sessoes: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private filmeService: FilmeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Pega o ID do filme
    if (id) {
      const filmeId = parseInt(id, 10);
      this.sessoes = Object.keys(this.filmeService['assentosPorFilmeESessao'][filmeId]);
    }
  }

  selecionarSessao(horario: string): void {
    const id = this.route.snapshot.paramMap.get('id'); // Pega o ID do filme
    this.router.navigate([`/sessao/${id}/assentos`], { queryParams: { horario } }); // Envia o horário como parâmetro
  }
}
