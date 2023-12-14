import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientsComponent } from './clients/clients.component';
import { FormComponent } from './clients/form.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CO';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clients',
    pathMatch: 'full',
  },
  {
    path: 'directivas',
    component: DirectivaComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'clients/page/:page',
    component: ClientsComponent,
  },
  {
    path: 'clients/form',
    component: FormComponent,
  },
  {
    path: 'clients/form/:id',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent,
    PaginatorComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
