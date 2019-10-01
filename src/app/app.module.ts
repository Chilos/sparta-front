import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule'},
  {path: '', component: AuthLayoutComponent, children: [ {path: 'login', component: LoginFormComponent } ]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
