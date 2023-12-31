import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Client } from './client';
import { ClientService } from './client.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detail/modal.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  clientChoose: Client;
  paginator: any;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page') || 0;
      console.log(page);
      this.clientService
        .getClients(page)
        .pipe(
          tap((resp) => {
            console.log('ClientsComponent: tap 3');
            (resp.content as Client[]).forEach((client) => {
              console.log(client.name);
            });
          }),
        )
        .subscribe({
          next: (resp) => {
            this.clients = resp.content as Client[];
            this.paginator = resp;
          },
        });
    });
    this.modalService.notificationUpload.subscribe({
      next: (client: Client) => {
        this.clients = this.clients.map((clientOriginal) =>
          client.id == clientOriginal.id ? client : clientOriginal,
        );
      },
    });
  }

  delete(client: Client): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${client.name} ${client.lastname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe({
          next: () => {
            this.clients = this.clients.filter((c) => c !== client);
            Swal.fire(
              'Eliminado!',
              `Cliente ${client.name} eliminado con éxito.`,
              'success',
            );
          },
        });
      }
    });
  }

  openModel(client: Client) {
    this.clientChoose = client;
    this.modalService.openModal();
  }
}
