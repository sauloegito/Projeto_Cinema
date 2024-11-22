import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Filme } from '../../../models/filmes';
import { CinemaService } from '../../../services/cinema.service';
import { FilmeService } from '../../../services/filme.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroFilmeComponent {
  filmeForm: FormGroup;
  filmeId!: number;
  filme!: Filme;
  salas: { id: number, capacidade: number, tipo: string }[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly filmeService: FilmeService,
    private readonly cinemaService: CinemaService
  ) {
    this.filmeForm = this.fb.group({
      titulo: ['', Validators.required],
      salaId: ['', Validators.required], // Campo para o ID da sala
      inicio: ['', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]],
      duracao: ['', [Validators.required, Validators.min(1)]],
      sessoes: [''],
      posterURL: ['', Validators.required], // Campo para a URL do pôster
      sinopse: ['', Validators.required], // Campo para a sinopse
    }, 
    { asyncValidators: this.validarIntegridadeHorario() }
    );
  }

  ngOnInit(): void {
    // Obter o ID do filme da rota
    this.filmeId = Number(this.route.snapshot.paramMap.get('id'));
    // Buscar o filme pelo ID no serviço
    const filme = this.cinemaService.getFilmeById(this.filmeId);

    this.salas = this.cinemaService.getSalas();

    if (filme) {
      this.filme = filme;
      this.filmeForm.patchValue(this.filme); // Preenche o formulário com os dados do filme
    } else if (this.filmeId) {
      alert('Filme não encontrado!');
      this.router.navigate(['/gerenciar-filmes']);
    }
  }

  get integridadeCom(): string {
    if (this.filmeForm?.errors) {
      return this.filmeForm.errors['integridadeHorario'];
    }
    return '';
  }

  validarIntegridadeHorario(): AsyncValidatorFn {
    const filmesObserver = this.filmeService.getFilmes()
    const filtrarSala = (filmes: Filme[], salaId: number) => {
      return filmes.filter(f => f.salaId === salaId && f.id !== this.filmeId);
    }

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const { salaId, inicio, duracao, sessoes } = control.value;

      const base = this.cinemaService.mapearHorarios({ inicio, duracao, sessoes });

      return filmesObserver.pipe(
        map(filmes => filtrarSala(filmes, Number(salaId))),
        map(filmes => filmes.reduce((prev: ValidationErrors | null, filme) => {
          if (prev) {
            return prev;
          }

          const hora = this.cinemaService.mapearHorarios(filme);

          const diffbIhI = Math.sign(base.inicio - hora.inicio);
          const diffbFhI = Math.sign(base.final - hora.inicio);

          const diffbIhF = Math.sign(hora.final - base.inicio);
          const diffbFhF = Math.sign(hora.final - base.final);
          if (diffbIhI !== diffbFhI || diffbIhF !== diffbFhF) {
            return { integridadeHorario: filme.titulo };
          }

          return null;
        }, null)),
        tap(error => {
          if (error) {
            control.setErrors(error);
          }
        })
      );
    }
  }

  onSubmit(): void {
    if (this.filmeForm.invalid) {
      alert('Preencha o formulário corretamente.');
      return;
    }

    const filme: Filme = { ...this.filme, ...this.filmeForm.value };
    if (filme.salaId) {
      if (!this.filmeId) {
        this.filmeService.adicionarFilmeService(
          filme.titulo,
          +filme.salaId,
          filme.inicio,
          filme.duracao,
          filme.sessoes,
          filme.posterURL,
          filme.sinopse
        );
        alert('Filme adicionado com sucesso!');
        this.router.navigate(['/']);
      } else {
        this.filmeService.atualizarFilme(filme);
        alert('Filme atualizado com sucesso!');
        this.router.navigate(['/gerenciar-filmes']);
      }
    }

  }

  cancelar(): void {
    this.router.navigate(['/gerenciar-filmes']); // Volta para a lista de filmes
  }

  mascararHorario() {
    let horario = this.filmeForm.get('inicio')?.value;

    horario = horario.replace(/\D/g, '');

    // Aplica a máscara
    if (horario.length <= 2) {
      horario = horario.replace(/(\d{2})/, '$1');
    } else if (horario.length <= 5) {
      horario = horario.replace(/(\d{2})(\d{1,2})/, '$1:$2');
    }

    // Atualiza o valor do campo
    this.filmeForm.get('inicio')?.setValue(horario, { emitEvent: false });
  }
}
