import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlEndPoint: string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getClients(page: number): Observable<any> {
    return this.http.get<Client[]>(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((resp: any) => {
        (resp.content as Client[]).forEach((client) => {
          console.log('ClientService: tap 1', client.name);
        });
      }),
      map((resp: any) => {
        (resp.content as Client[]).map((client) => {
          client.name = client.name.toUpperCase();
          return client;
        });
        return resp;
      }),
      tap((resp: any) => {
        (resp.content as Client[]).forEach((client) => {
          console.log('ClientService: tap 2', client.name);
        });
      }),
    );
  }

  createClient(client: Client): Observable<Client> {
    return this.http
      .post(this.urlEndPoint, client, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.client as Client),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        }),
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clients']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      }),
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http
      .put(`${this.urlEndPoint}/${client.id}`, client, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((reponse: any) => reponse.client as Client),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        }),
      );
  }

  deleteClient(id: number): Observable<Client> {
    return this.http
      .delete<Client>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        }),
      );
  }

  uploadPhoto(file: File, id: string): Observable<Client> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response: any) => response.client as Client),
      catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      }),
    );
  }
}
