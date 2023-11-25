import { Component } from '@angular/core';
import { Client } from './client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  clients: Client[] = [
    {
      id: 1,
      name: 'Nicolás',
      lastname: 'Chicaiza',
      email: 'jefryn@unicauca.edu.co',
      createAt: '2023-11-24'
    },
    {
      id: 2,
      name: 'Elena',
      lastname: 'Gómez',
      email: 'elena@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 3,
      name: 'Juan',
      lastname: 'Pérez',
      email: 'juan@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 4,
      name: 'María',
      lastname: 'Rodríguez',
      email: 'maria@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 5,
      name: 'Pedro',
      lastname: 'González',
      email: 'pedro@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 6,
      name: 'Laura',
      lastname: 'Martínez',
      email: 'laura@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 7,
      name: 'Carlos',
      lastname: 'López',
      email: 'carlos@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 8,
      name: 'Ana',
      lastname: 'Sánchez',
      email: 'ana@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 9,
      name: 'Diego',
      lastname: 'Hernández',
      email: 'diego@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 10,
      name: 'Lucía',
      lastname: 'Díaz',
      email: 'lucia@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 11,
      name: 'Sofía',
      lastname: 'Torres',
      email: 'sofia@example.com',
      createAt: '2023-11-24'
    },
    {
      id: 12,
      name: 'Alejandro',
      lastname: 'Ramírez',
      email: 'alejandro@example.com',
      createAt: '2023-11-24'
    }
  ];


}
