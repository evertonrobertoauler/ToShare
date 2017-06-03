import { ModuleWithProviders } from '@angular/core';

import { Routes , RouterModule } from '@angular/router'
import { PostsComponent }  from  './posts/posts.component'
import { AdminComponent } from './admin/admin.component'
import { adminroutes } from './admin/admin.routes'
import { postroutes} from './posts/posts.routes'
import { PostfeedComponent } from './posts/postfeed/postfeed.component'
import {LoginComponent} from './login/login.component'
import { AuthGuard } from './guards/auth.guard.service'


import { SinglepostComponent } from './posts/singlepost/singlepost.component';
import { ContactComponent } from './posts/contact/contact.component'

const appRoutes : Routes = [
    { path : 'posts',  component:PostsComponent ,  children: [
        {path : 'contact' , component : ContactComponent },
        {path : ':slugurl' , component : SinglepostComponent }, 
        {path : 'category/:category' , component : PostfeedComponent },   
        {path : '' , component : PostfeedComponent },             
    ]},
    { path : 'admin',  loadChildren: './admin/admin.module#AdminModule' , canActivate: [ AuthGuard ] },  
    { path : 'login', loadChildren : './login/login.module#LoginModule' },
    { path : '' , redirectTo : '/posts' , pathMatch:'full' }
]

//{ path : 'admin', component : AdminComponent ,/*canActivate: [ AuthGuard ],*/ children:adminroutes },
//export const routing = RouterModule.forRoot(appRoutes)

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);