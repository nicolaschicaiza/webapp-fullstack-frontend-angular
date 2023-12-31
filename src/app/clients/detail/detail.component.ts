import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() client: Client;
  title: string = 'Detalle del cliente';
  photo: File;
  progress: number = 0;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

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
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              let response: any = event.body;
              this.client = response.client as Client;
              Swal.fire(
                'La foto se ha subido correctamente',
                `La foto se ha subido con éxito: ${this.client.photo}`,
                'success',
              );
              this.progress = 0;
            }
          },
        });
    }
  }
}
