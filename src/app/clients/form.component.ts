import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  client: Client = new Client();
  title: string = 'Crear cliente';

  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {}

  create(): void {
    this.clientService.create(this.client).subscribe({
      next: () => this.router.navigate(['/clients']),
    });
  }
}
