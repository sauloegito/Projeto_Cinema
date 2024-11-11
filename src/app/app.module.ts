import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Certifique-se de que RouterModule está importado
import { AppComponent } from './app.component';
import { PrimeiraPaginaComponent } from './components/primeira-pagina/primeira-pagina.component';
import { AdicionarFilmeComponent } from './components/adicionar-filme/adicionar-filme.component';
import { AppRoutingModule } from './app-routing.module';
import { SessaoComponent } from './components/sessao/sessao.component';
import { AssentosComponent } from './components/assentos/assentos.component';
import { GerenciarFilmesComponent } from './components/gerenciar-filmes/gerenciar-filmes.component';
import { EditarFilmeComponent } from './components/editar-filme/editar-filme.component'; // Importando AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    PrimeiraPaginaComponent,
    AdicionarFilmeComponent,
    SessaoComponent,
    AssentosComponent,
    GerenciarFilmesComponent,
    EditarFilmeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // Certifique-se de que AppRoutingModule está aqui
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
