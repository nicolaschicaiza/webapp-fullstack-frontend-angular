import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './clients.json';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  ngOnInit() {
    this.clients = CLIENTS
  }


}
