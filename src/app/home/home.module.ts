import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'admin', component: AdminComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
