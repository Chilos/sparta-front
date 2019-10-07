import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
    {path: 'options', component: OptionsPageComponent, canActivate: [AuthGuard]},

  ]},
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent }
  ]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
