import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmployerDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    EmployerDetailsComponent
  ]
})
export class AuthModule { }
