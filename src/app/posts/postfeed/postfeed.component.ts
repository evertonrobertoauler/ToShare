import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BlogService } from '../../services/blog.service'
import { PostsService } from '../posts.service'
import { ActivatedRoute, Router  } from '@angular/router';


@Component({
  selector: 'app-postfeed',  
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {

  public posts = []
  public category;
  public page;
  public postavailable:boolean = false

  constructor(private router: Router , private service: BlogService, private postservice: PostsService,
    private activated_route: ActivatedRoute) {                    }

  ngOnInit() {  
   this.activated_route.params.subscribe(params => {
      this.category = params['category']   
       if(this.category){
        this.service.getcategoryposts(this.category).subscribe(data => {
          this.posts = data
          this.sortposts()
        //  console.log(this.posts);        
       })
     }      
   })

    
   if(!this.category) {      
      this.service.getposts().subscribe(data => {
        this.posts = data
        this.sortposts()        
      //  console.log(this.posts)
      })
    }    
  }

  sortposts() {
    this.posts.forEach((d) => {
      d.date = new Date(d.date);
    });
    this.posts = this.posts.sort((a: any, b: any) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else if (new Date(a.date) > new Date(b.date)) {
        return -1;
      } else {
        return 0;
      }
    })
    this.postavailable = true    
  }
}