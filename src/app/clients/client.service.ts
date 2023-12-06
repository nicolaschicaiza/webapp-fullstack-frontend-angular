import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.urlEndPoint)
      .pipe(map((rta) => rta as Client[]));
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndPoint, client, {
      headers: this.httpHeaders,
    });
  }
}
