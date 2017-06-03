import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminAddPostComponent } from './admin-add-post/admin-add-post.component';
import { AdminHomeComponent } from './admin-home/admin-home.component'
import { AdminSidenavbarComponent } from './admin-sidenavbar/admin-sidenavbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { adminroutes } from './admin.routes';

import { TagInputModule } from 'ng2-tag-input';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

import { SharedModule } from '../shared/shared.module'



@NgModule({
  imports: [    
     CommonModule,     
      FormsModule,
      HttpModule,
      adminroutes,
      TagInputModule,
      Ng2DropdownModule,      
      SharedModule,
  ],

  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminAddPostComponent,
    AdminHomeComponent,
    AdminSidenavbarComponent,    
    AdminFooterComponent,
  ]
})
export class AdminModule { }