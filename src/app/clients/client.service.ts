import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPonit: string = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlEndPonit).pipe(
      map((rta) => rta as Client[])
    );
  }
}
