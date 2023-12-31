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
  private photo: File;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id: number = +params['id'];
      if (id) {
        this.clientService
          .getClient(id)
          .subscribe((client) => (this.client = client));
      }
    });
  }

  selectFile(event: any) {
    this.photo = event.target.files[0];
    console.log(this.photo);
  }

  upload() {
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
