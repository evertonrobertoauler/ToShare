import { Component, OnInit } from '@angular/core';
import { BlogService }  from '../../services/blog.service';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  constructor(private blogservice: BlogService ) { }

  public categories = []
  public categoryimage

  ngOnInit() {

  this.blogservice.getcategories().subscribe(data=>{
        this.categories = data              
  })
  }
}
