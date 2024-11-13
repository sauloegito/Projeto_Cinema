import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedAssento!: Assento; // Assento que o usuário selecionou
  assentoForm: FormGroup; //Formulário com nome ecpf, para reservar assento
  showModal: boolean = false; //Controla a exibição do modal do forms

  constructor(private route: ActivatedRoute, private filmeService: FilmeService, private fb: FormBuilder) { 
    this.assentoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // Validação para o nome
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Validação para o CPF
    }); 
  }

  ngOnInit(): void {
    this.filmeId = Number(this.route.snapshot.paramMap.get('id'));
    this.horario = this.route.snapshot.queryParamMap.get('horario') || ''; // Recupera o horário da sessão
    this.assentos = this.filmeService.getAssentos(this.filmeId, this.horario);
  }

  selecionarAssento(assento: Assento): void {
    if (!assento.ocupado) {
      this.selectedAssento = assento; // Armazena o assento selecionado
      this.showModal = true
      assento.ocupado = false;
    } else {
      alert(`Assento ${assento.numero} já está ocupado na sessão das ${this.horario}.`);
    }
  }
  confirmarAssento(): void {
    if (!this.assentoForm.valid || !this.selectedAssento) {
      alert('Por favor, preencha corretamente o nome e o CPF.');
      return;
    }
    
      const nome = this.assentoForm.get('nome')?.value;
      const cpf = this.assentoForm.get('cpf')?.value;

      // Aqui você faria a lógica para enviar o nome e CPF para o serviço
      this.filmeService.ocuparAssento(
      this.filmeId,
      this.horario,
      this.selectedAssento.numero,
      nome,
      cpf
    
    );
      // Atualiza o status do assento como ocupado
      this.selectedAssento.ocupado = true;
      this.selectedAssento.nome = nome;
      this.selectedAssento.cpf = cpf;

      alert(`Assento ${this.selectedAssento.numero} reservado para ${nome} (CPF: ${cpf}).`); // Confirmando o assento

      // Limpar os campos de nome e CPF após confirmar
      this.showModal = false;
      this.assentoForm.reset();
    }
    fecharModal(): void {
      this.showModal = false;
    }
    
  }
    

