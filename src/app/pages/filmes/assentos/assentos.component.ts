import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Assento } from '../../../models/assento';
import { Filme } from '../../../models/filmes';
import { CinemaService } from '../../../services/cinema.service';

@Component({
  selector: 'app-assentos',
  templateUrl: './assentos.component.html',
  styleUrls: ['./assentos.component.css']
})
export class AssentosComponent implements OnInit {
  filmeId!: number;
  filme!: Filme | undefined;
  container!: HTMLDivElement;
  horario!: string;
  tipo!: string;
  assentoForm: FormGroup; //Formulário com nome ecpf, para reservar assento
  showModal: boolean = false; //Controla a exibição do modal do forms

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly cinemaService: CinemaService) {

    this.assentoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // Validação para o nome
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Validação para o CPF
    });
  }

  ngOnInit(): void {
    this.filmeId = Number(this.route.snapshot.paramMap.get('id'));
    this.horario = this.route.snapshot.queryParamMap.get('horario') ?? ''; // Recupera o horário da sessão
  
    this.filme = this.cinemaService.getFilmeById(this.filmeId);
    if (this.filme?.salaId) {
      this.tipo = this.cinemaService.buscarTipo(this.filme.salaId);

      const seats = document.getElementsByClassName('seats');
      if (!seats.length) {
        return;
      }
      this.container = seats.item(0) as HTMLDivElement;

      this.montarGrid(this.filme, this.horario, this.container, this.selecionarAssento);
    }
  }

  selecionarAssento(assento: Assento, btn: HTMLButtonElement): void {
    if (assento.ocupado) {
      alert(`Assento ${assento.numero} já está ocupado na sessão das ${this.horario}.`);
      return; 
    }
  
    assento.selecionado = !assento.selecionado;
    if (assento.selecionado) {
      btn.classList.add('selecionado');
    } else {
      btn.classList.remove('selecionado');
    }
  }

  get assentosSelecionados(): Assento[] {
    const assentos = this.cinemaService.getAssentos(this.filmeId, this.horario, -1);
    if (assentos) {
      return assentos.filter(assento => Boolean(assento.selecionado));
    }
    return [];
  }

  confirmarAssento(): void {
    const selectedAssentos = this.assentosSelecionados;
    if (!this.assentoForm.valid || selectedAssentos.length === 0) {
      alert('Por favor, preencha corretamente o nome e o CPF e selecione pelo menos um assento.');
      return;
    }

    const nome = this.assentoForm.get('nome')?.value;
    const cpf = this.assentoForm.get('cpf')?.value;
    const numerosAssentos = selectedAssentos.map(assento => assento.numero).join(', ');
    selectedAssentos.forEach(assento => {
      assento.ocupado = true;
      assento.selecionado = false;
      assento.nome = nome;
      assento.cpf = cpf;
    });

    alert(`Assento(s) ${numerosAssentos} confirmado(s) para ${nome} (CPF: ${cpf}).`);

    // Limpa os campos de nome e CPF e fecha o modal
    this.showModal = false;
    this.assentoForm.reset();
    if (this.filme) {
      this.montarGrid(this.filme, this.horario, this.container, this.selecionarAssento);
    }
  }

  fecharModal(): void {
    this.showModal = false;
  }

  abrirModal() {
    if (this.assentosSelecionados.length > 0) {
      this.showModal = true; 
    }
  }

  mascararCPF() {
    let cpf = this.assentoForm.get('cpf')?.value;

    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara
    if (cpf.length <= 3) {
      cpf = cpf.replace(/(\d{3})/, '$1');
    } else if (cpf.length <= 6) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    // Atualiza o valor do campo
    this.assentoForm.get('cpf')?.setValue(cpf, { emitEvent: false });
  }

  montarGrid(filme: Filme, horario: string, container: HTMLDivElement, selecionar: (assento: Assento, btn: HTMLButtonElement) => void): void {

    const assentos = this.cinemaService.getAssentos(filme.id, horario, -1);
    if (!assentos) {
      return;
    }

    let linhaAnterior = -1;
    let row: HTMLDivElement | null = null;
    container.innerHTML = ''; // limpa todos os filhos

    for (const assento of assentos) {
      const { linha } = assento;
      if (linhaAnterior != linha || !row) {
        linhaAnterior = linha;
        row = container.appendChild(document.createElement("div"));
        row.className = 'row';
      }

      this.criarBotao(row, assento, selecionar);
    }

    const parent = container.parentElement;
    if (parent && filme.salaId) {
      const colunas = this.cinemaService.quantidadeColunas(filme.salaId);
      const tamanhoMinimo = colunas * 49;
      parent.style.minWidth = `${tamanhoMinimo}px`;
    }
  }

  private criarBotao(row: HTMLDivElement | null, assento: Assento, selecionar: (assento: Assento, btn: HTMLButtonElement) => void) {
    if (row) {
      const button = row.appendChild(document.createElement("button"));
      if (assento.ocupado) {
        button.classList.add('ocupado');
      }
      if (assento.selecionado) {
        button.classList.add('selecionado');
      }
      if (!assento.visivel) {
        button.classList.add('indisponivel');
      }
      button.title = `${assento.numero}`;
      button.innerText = `${this.nomear(assento)}`
      button.addEventListener("click", () => selecionar(assento, button), false);
    }
  }

  private nomear(assento: Assento): string {
    return String.fromCharCode(assento.linha + 65) + (assento.coluna + 1);
  }

}


