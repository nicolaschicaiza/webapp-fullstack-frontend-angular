import { Component } from '@angular/core';
import { Client } from './client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  client: Client = new Client();
  title: string = 'Crear cliente';

  create(): void {
    console.log('Client', this.client);
  }
}
