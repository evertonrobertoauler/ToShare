import { Component, OnInit } from '@angular/core';
import { BlogService }  from '../../services/blog.service';


@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

 constructor( /* private blogservice: BlogService */) { }

 /* public categories = []
  public categoryimage */

  ngOnInit() {

/*
  this.blogservice.getcategories().subscribe(data=>{
        this.categories = data              
  }) */

  } 
}
