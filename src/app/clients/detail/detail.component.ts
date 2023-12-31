import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  client: Client;
  title: string = 'Detalle del cliente';

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
}
