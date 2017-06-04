import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { BlogService } from '../../services/blog.service';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})
export class PostfeedComponent implements OnInit {

  public posts = [];
  public category;
  public page;
  public postavailable = false;

  constructor(
    private router: Router, private service: BlogService, private postservice: PostsService,
    private activated_route: ActivatedRoute, private meta: Meta,
    @Inject(PLATFORM_ID) private platform: Object
  ) { }

  ngOnInit() {
    this.activated_route.params.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.service.getcategoryposts(this.category).subscribe(data => {
          this.posts = data;
          this.sortposts();
        });
      }
    });


    if (!this.category) {
      if (isPlatformBrowser(this.platform) && this.meta.getTag('name="API_DATA"')) {
        this.posts = JSON.parse(this.meta.getTag('name="API_DATA"').getAttribute('content'));
        this.meta.removeTag('name="API_DATA"');
      } else {
        this.service.getposts().subscribe(data => {
          if (isPlatformServer(this.platform)) {
            this.meta.addTag({ name: 'API_DATA', content: JSON.stringify(data) });
          }

          this.posts = data;
          this.sortposts();
        });
      }
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
    });

    this.postavailable = true;
  }
}
