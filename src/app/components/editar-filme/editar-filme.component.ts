// editar-filme.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filmes';


@Component({
  selector: 'app-editar-filme',
  templateUrl: './editar-filme.component.html',
  styleUrls: ['./editar-filme.component.css']
})
export class EditarFilmeComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
