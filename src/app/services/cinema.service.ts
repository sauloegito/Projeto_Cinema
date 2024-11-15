import { Injectable } from '@angular/core';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private salas: Sala[] = [
    { id: 1, capacidade: 40, tipo: '3D' },
    { id: 2, capacidade: 60, tipo: 'IMAX' },
    { id: 3, capacidade: 80, tipo: '2D' }
  ];

  constructor() {}

  getSalas(): { id: number, capacidade: number, tipo: string }[] {
    return this.salas;
  }
  
  getSalaById(salaId: number): Sala | undefined {
    return this.salas.find(sala => sala.id === salaId);
  }
}
