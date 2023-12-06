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

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.uploadClient();
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
    this.clientService.create(this.client).subscribe({
      next: (client) => {
        this.router.navigate(['/clients']);
        Swal.fire(
          'Nuevo cliente',
          `Cliente ${client.name} creado con éxito!`,
          'success',
        );
      },
    });
  }
}
