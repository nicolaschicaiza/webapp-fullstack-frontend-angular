import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  client: Client;
  title: string = 'Detalle del cliente';
  photo: File;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = +params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe({
          next: (client) => {
            this.client = client;
            console.log(client);
          },
        });
      }
    });
  }

  selectFile(event: any) {
    this.photo = event.target.files[0];
    console.log(this.photo);
    if (this.photo?.type.indexOf('image') < 0) {
      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser de tipo imagen',
        'error',
      );
      this.photo = null;
    }
  }

  upload() {
    if (!this.photo) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clientService
        .uploadPhoto(this.photo, this.client.id.toString())
        .subscribe({
          next: (client) => {
            this.client = client;
            Swal.fire(
              'La foto se ha subido correctamente',
              `La foto se ha subido con éxito: ${client.photo}`,
              'success',
            );
          },
        });
    }
  }
}
