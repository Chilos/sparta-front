import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


let routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 
