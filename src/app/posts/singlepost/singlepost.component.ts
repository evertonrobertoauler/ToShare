import { Component, OnInit, ElementRef, Inject , PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostsService } from '../posts.service';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js'
import { MetaTagService } from '../../services/meta.service'


import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglepostComponent implements OnInit {

  private slugurl: string;
  public ispostavailable: boolean = false
  public post: any
  
  public disquspageidentifier

  constructor(private activated_route: ActivatedRoute,
    private blogservice: BlogService,
    private postservice: PostsService,
    private _router: Router,
    private higlightservice: HighlightJsService,
    private metaservice: MetaTagService ) { 
    
  }


  ngOnInit() {
    this.activated_route.params.subscribe(params => {
      this.slugurl = params['slugurl']
      this.blogservice.getpost_slug(this.slugurl).subscribe(data => {
            this.post = data
           // console.log(this.post)
            let tags = []
            this.post.tags.forEach(tag => {
              tags.push(tag.display)
            });
           
             let metatitle = this.post.title,
             metadescription = this.post.content.substring(0, 200),
             metakeywords = tags.toString(),
             metaimage = this.post.imagepath,
             metaurl = '/' + this.post.slugurl
            
            // convert metatitle to plain text
             metadescription = metadescription.replace(/<(?:.|\n)*?>/gm, ''); 
             
             this.metaservice.setmetatags_singlepost(metatitle, metadescription, metakeywords, metaimage, metaurl)  

             this.ispostavailable = true
             this.disquspageidentifier = this.post.slugurl             
         
       })
     }) 
  }

  highlightByService(target: ElementRef) {
    this.higlightservice.highlight(target);
  }

}