import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';



import { AboutmeComponent } from './aboutme/aboutme.component';

import { routing } from './app.routes';

import { AuthService } from './services/auth.service'
import { AuthGuard } from './guards/auth.guard.service'

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js'
import { BlogService } from './services/blog.service';
import { PostsService } from './posts/posts.service'
import { MetaTagService } from './services/meta.service'
import { AdminService} from './admin/admin.service' 

import { CommonModule } from '@angular/common';


import { PostsComponent } from './posts/posts.component';
import { HeaderComponent } from './posts/header/header.component';
import { FooterComponent } from './posts/footer/footer.component';
import { AuthorComponent } from './posts/author/author.component';

import { SinglepostComponent } from './posts/singlepost/singlepost.component';
import { PostfeedComponent } from './posts/postfeed/postfeed.component';

import { SidenavbarComponent } from './posts/sidenavbar/sidenavbar.component';

import { ContactComponent } from './posts/contact/contact.component'
import { postroutes } from './posts/posts.routes'
import { SharedModule } from './shared/shared.module'
import { DisqusModule } from "ngx-disqus";

import {ShareButtonsModule} from 'ngx-sharebuttons';



export { AppComponent };


@NgModule({
  declarations: [
    AppComponent, 
    AboutmeComponent,
    PostsComponent,
    HeaderComponent,
    FooterComponent,
    AuthorComponent,
    SinglepostComponent,
    PostfeedComponent,
    SidenavbarComponent,    
    ContactComponent,   
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'materialblogprod'}),
    NoopAnimationsModule,        
    FormsModule,
    HttpModule,  
    HighlightJsModule,
    routing,
    CommonModule,     
    postroutes,    
    SharedModule,      
    DisqusModule.forRoot('www-praveenrana-com'),  
    ShareButtonsModule.forRoot()
  ],
  exports: [AppComponent],
  providers: [ BlogService, PostsService, MetaTagService,  
               AdminService,   AuthGuard , AuthService , 
               HighlightJsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
