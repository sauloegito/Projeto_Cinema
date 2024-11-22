import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssentosComponent } from './pages/filmes/assentos/assentos.component';
import { CadastroFilmeComponent } from './pages/filmes/cadastro/cadastro.component'; // Importando AppRoutingModule
import { GerenciarFilmesComponent } from './pages/filmes/gerenciar/gerenciar.component';
import { SessaoComponent } from './pages/filmes/sessao/sessao.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SessaoComponent,
    AssentosComponent,
    HomeComponent,
    GerenciarFilmesComponent,
    CadastroFilmeComponent
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
