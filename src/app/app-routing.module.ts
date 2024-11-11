import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeiraPaginaComponent } from './components/primeira-pagina/primeira-pagina.component';
import { AdicionarFilmeComponent } from './components/adicionar-filme/adicionar-filme.component'; // Importar o componente de adicionar filmes
import { SessaoComponent } from './components/sessao/sessao.component';
import { AssentosComponent } from './components/assentos/assentos.component';
import { GerenciarFilmesComponent } from './components/gerenciar-filmes/gerenciar-filmes.component';
import { EditarFilmeComponent } from './components/editar-filme/editar-filme.component';

const routes: Routes = [
  { path: '', component: PrimeiraPaginaComponent },
  { path: 'adicionar-filme', component: AdicionarFilmeComponent }, // Rota para o componente de adicionar filmes
  { path: 'sessao/:id', component: SessaoComponent },
  { path: 'sessao/:id/assentos', component: AssentosComponent },
  { path: 'gerenciar-filmes', component: GerenciarFilmesComponent },
  { path: 'editar-filme/:id', component: EditarFilmeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
