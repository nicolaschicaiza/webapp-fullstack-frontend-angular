import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  client: Client = new Client();
  title: string = 'Crear cliente';
  errors: string[];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.uploadClient();
  }

  onSubmit(): void {
    if (this.client.id) {
      this.update();
      return;
    }
    this.create();
  }

  uploadClient(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clientService
          .getClient(id)
          .subscribe((client) => (this.client = client));
      }
    });
  }

  create(): void {
    this.clientService.createClient(this.client).subscribe({
      next: (client) => {
        console.log(client);
        this.router.navigate(['/clients']);
        Swal.fire(
          'Nuevo cliente',
          `El cliente ${client.name} ha sido creado con éxito`,
          'success',
        );
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }

  update(): void {
    this.clientService.updateClient(this.client).subscribe({
      next: (client) => {
        this.router.navigate(['/clients']);
        Swal.fire(
          'Cliente actualizado',
          `El cliente ${client.name} ha sido actualizado con éxito`,
          'success',
        );
      },
      error: (err) => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }
}
