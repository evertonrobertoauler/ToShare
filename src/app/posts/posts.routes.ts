import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { SinglepostComponent} from './singlepost/singlepost.component'
import { PostfeedComponent } from './postfeed/postfeed.component'
import { PostsComponent } from './posts.component'
import { ContactComponent } from './contact/contact.component'

const routes : Routes = [
    {path : '' , component : PostsComponent ,  children: [
        {path : 'contact' , component : ContactComponent },
        {path : ':slugurl' , component : SinglepostComponent }, 
        {path : 'category/:category' , component : PostfeedComponent },   
        {path : '' , component : PostfeedComponent },             
    ]
  },      
]

export const postroutes : ModuleWithProviders = RouterModule.forChild(routes);