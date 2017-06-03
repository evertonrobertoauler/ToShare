import { Component, OnInit , ViewContainerRef } from '@angular/core';
import { BlogService }  from '../../services/blog.service'

import {AdminService} from '../admin.service'
import { ActivatedRoute, Router, Params ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  
  public posts = []
  public page;
  public postsavailable:boolean = false
  public postpublished;
  public drafthome;

  constructor(
 private service : BlogService,
 private adminservice : AdminService  ,
 private activated_route: ActivatedRoute,
 private router: Router){ }

  ngOnInit() {

    this.drafthome = this.activated_route.snapshot.data['drafthome'] || false

    if(this.drafthome == true) {
      this.service.getadmindrafts().subscribe(data=>{        
        this.posts = data
        console.log('Test 1 '+ this.posts)
        this.sortposts();               
      })
    }else{
      this.service.getadminposts().subscribe(data => {                
          this.posts = data
          console.log('Test 2 '+ this.posts)
          this.sortposts();               
      })
    }

    this.postpublished = this.adminservice.getpostupdate()      

  }

  sortposts(){
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
          this.postsavailable = true
  }

  delete(postindex){              
    let post = this.posts[postindex]
    this.service.deletepost(post._id).subscribe(data=>{
      console.log('Post Deleted')
      this.posts.splice(postindex,1)
      console.log(this.posts)
    })
  }

  publishalertoff(){
    this.postpublished = false
    this.adminservice.closealert() 
  }
}
