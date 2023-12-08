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
      next: (json) => {
        console.log(json);
        this.router.navigate(['/clients']);
        Swal.fire(
          'Nuevo cliente',
          `${json.mensaje}: ${json.client.name}`,
          'success',
        );
      },
    });
  }

  update(): void {
    this.clientService.updateClient(this.client).subscribe({
      next: (json) => {
        this.router.navigate(['/clients']);
        Swal.fire(
          'Cliente actualizado',
          `${json.mensaje}: ${json.client.name}`,
          'success',
        );
      },
    });
  }
}
