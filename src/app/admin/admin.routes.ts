import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AdminAddPostComponent } from './admin-add-post/admin-add-post.component'
import { AdminHomeComponent } from './admin-home/admin-home.component'
import { AdminComponent } from './admin.component'


export const routes: Routes = [
    {
        path: '', component: AdminComponent, children: 
        [
            { path: 'home', component: AdminHomeComponent },
            { path: 'add-post', component: AdminAddPostComponent },
            { path: 'add-post/:id', component: AdminAddPostComponent },
            { path: 'drafts', component: AdminHomeComponent, data: { drafthome: true } },
            { path: '', redirectTo: '/admin/home', pathMatch: 'full' }
        ]
    },
]

export const adminroutes: ModuleWithProviders = RouterModule.forChild(routes);