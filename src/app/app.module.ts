import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxMaskModule, IConfig} from 'ngx-mask';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersPageComponent } from './users-page/users-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { UserDialogComponent } from './users-page/user-dialog/user-dialog.component';
import { RolePipe } from './shared/role.pipe';
import { WorkShiftDialogComponent } from './options-page/work-shift-dialog/work-shift-dialog.component';
import { MomentPipe } from './shared/moment.pipe';


export let options: Partial<IConfig> | (() => Partial<IConfig>);

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    UsersPageComponent,
    OptionsPageComponent,
    LoginPageComponent,
    UserDialogComponent,
    RolePipe,
    WorkShiftDialogComponent,
    MomentPipe
  ],
  entryComponents: [
    UserDialogComponent,
    WorkShiftDialogComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(options),
  ],

  providers: [ INTERCEPTOR_PROVIDER ],
  bootstrap: [AppComponent]
})
export class AppModule { }
