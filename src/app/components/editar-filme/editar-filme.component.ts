// editar-filme.component.ts
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filmes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CinemaService } from '../../services/cinema.service';


@Component({
  selector: 'app-editar-filme',
  templateUrl: './editar-filme.component.html',
  styleUrls: ['./editar-filme.component.css']
})
export class EditarFilmeComponent implements OnInit {
  filmeForm: FormGroup;
  filmeId!: number;
  filme!: Filme;
  salas: { id: number, capacidade: number, tipo: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private filmeService: FilmeService,
    private cinemaService: CinemaService
  ) {
    this.filmeForm = this.fb.group({
      titulo: ['', Validators.required],
      salaId: ['', Validators.required], // Campo para o ID da sala
      duracao: ['', [Validators.required, Validators.min(1)]],
      posterURL: ['', Validators.required], // Campo para a URL do pôster
      sinopse: ['', Validators.required], // Campo para a sinopse
    });
  }

  ngOnInit(): void {
    // Obter o ID do filme da rota
    this.filmeId = Number(this.route.snapshot.paramMap.get('id'));
    // Buscar o filme pelo ID no serviço
    const filme = this.filmeService.getFilmeById(this.filmeId);

    this.salas = this.cinemaService.getSalas();

  if (filme) {
    this.filme = filme;
    this.filmeForm.patchValue(this.filme); // Preenche o formulário com os dados do filme
  } else {
    alert('Filme não encontrado!');
    this.router.navigate(['/gerenciar-filmes']);
  }
  }

  onSubmit(): void {
    if (this.filmeForm.valid) {
      const filmeAtualizado: Filme = { ...this.filme, ...this.filmeForm.value };
      this.filmeService.atualizarFilme(filmeAtualizado);
      alert('Filme atualizado com sucesso!');
      this.router.navigate(['/gerenciar-filmes']);
    }else {
      alert('Preencha o formulário corretamente.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/gerenciar-filmes']); // Volta para a lista de filmes
  }
 
}
