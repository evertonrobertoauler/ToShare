import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component'


@NgModule({
  imports: [
    CommonModule,     
    FormsModule,
    HttpModule,    
    SharedModule,       
    RouterModule.forChild([
      { path: '', component: LoginComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [LoginComponent ]
})
export class LoginModule { }