import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssentosComponent } from './pages/filmes/assentos/assentos.component';
import { CadastroFilmeComponent } from './pages/filmes/cadastro/cadastro.component';
import { GerenciarFilmesComponent } from './pages/filmes/gerenciar/gerenciar.component';
import { SessaoComponent } from './pages/filmes/sessao/sessao.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'filmes', component: HomeComponent },
  { path: 'gerenciar-filmes', component: GerenciarFilmesComponent },
  { path: 'editar-filme/:id', component: CadastroFilmeComponent },
  { path: 'adicionar-filme', component: CadastroFilmeComponent },
  { path: 'sessao/:id', component: SessaoComponent },
  { path: 'sessao/:id/assentos', component: AssentosComponent },
  { path: '', pathMatch: 'full', redirectTo: 'filmes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
