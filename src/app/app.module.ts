import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientsComponent } from './clients/clients.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './clients/form.component';

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
    path: 'clients/form',
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
