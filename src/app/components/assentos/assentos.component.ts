import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { Assento } from '../../models/assento';

@Component({
  selector: 'app-assentos',
  templateUrl: './assentos.component.html',
  styleUrls: ['./assentos.component.css']
})
export class AssentosComponent implements OnInit {
  assentos: Assento[] = [];
  filmeId!: number;
  horario!: string;

  constructor(private route: ActivatedRoute, private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.filmeId = Number(this.route.snapshot.paramMap.get('id'));
    this.horario = this.route.snapshot.queryParamMap.get('horario') || ''; // Recupera o horário da sessão
    this.assentos = this.filmeService.getAssentos(this.filmeId, this.horario);
  }

  selecionarAssento(assento: Assento): void {
    if (!assento.ocupado) {
      this.filmeService.ocuparAssento(this.filmeId, this.horario, assento.numero);
      alert(`Assento ${assento.numero} selecionado para a sessão das ${this.horario}!`);
    } else {
      alert(`Assento ${assento.numero} já está ocupado na sessão das ${this.horario}.`);
    }
  }
}
