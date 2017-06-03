import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js'

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import * as $ from 'jquery';



//import uploadcare from 'uploadcare-widget';

import { AdminService } from '../admin.service'

declare var require: any;
declare var uploadcare: any
declare var customMarkdownParser: any

var toMarkdown = require('to-markdown');


@Component({
  selector: 'app-admin-add-post',
  templateUrl: './admin-add-post.component.html',
  styleUrls: ['./admin-add-post.component.css']
})

export class AdminAddPostComponent implements OnInit {

  @ViewChild('simpleMDE') textarea: ElementRef;

  constructor(private elementRef: ElementRef,
    private blogservice: BlogService,
    private activated_route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminservice: AdminService,
    private higlightservice: HighlightJsService,
    
  ) {

 

  }


  public isdraft;
  
  public currentdate = new Date();
  public simplemde;
  public postimage
  public imageplaceholder = "block"
  public posttags = [];
  public title = ''
  public category = 'Select Category'
  public categories = []

  public content = ''


  public post: any
  public isnew = true
  public to_UpdatepostId

  public imageuploading: boolean = false
  public invaliddata: boolean
  
  

  ngOnInit() {

    this.blogservice.getcategories().subscribe(data => {
      this.categories = data
    })

    if (this.platformId === 'browser') {

      System.import('simplemde').then(SimpleMDE => {
        this.simplemde = new SimpleMDE(
          {
            element: this.textarea.nativeElement.value,
            toolbar: ["bold", "italic", "heading", "|", "image",
              {
                name: "upload",
                action: function customFunction(editor) {

                  uploadcare.openDialog().done(function (file) {

                    file.promise().done(function (fileInfo) {

                      var cm = editor.codemirror;
                      let pos = cm.getCursor();
                      cm.setSelection(pos, pos);
                      cm.replaceSelection('' + ["![](" + fileInfo.cdnUrl + ")"] + '');
                    });
                  });
                },
                className: "fa fa-upload",
                title: "Image"

              },
              "link", "code", "|", "preview", "fullscreen", "|", "quote", "unordered-list", "ordered-list", "horizontal-rule", "|", "clean-block"],

            renderingConfig: {
              codeSyntaxHighlighting: true,
            }
          }
        );
      })
    }

    this.activated_route.params.subscribe((params: any) => {
      if (params.hasOwnProperty('id')) {
        this.isnew = false

        let id = params['id']
        this.to_UpdatepostId = id
        this.blogservice.getpost(id).subscribe(data => {
          this.post = data
          this.title = data.title
          this.postimage = data.imagepath
          this.posttags = data.tags
          this.category = data.category

          this.isdraft = data.draft

          this.imageplaceholder = "none"

          if (this.simplemde) {
            this.simplemde.value(toMarkdown(data.content))
            this.content = this.simplemde.options.previewRender(this.simplemde.value())
          }
        })
      }
      if (this.isnew == true) {
        if (this.simplemde) {
          this.simplemde.value('')
        }
      }
    })

    if(this.platformId === 'browser'){

    }
  }

  onItemClicked(category) {
    this.category = category.value
    console.log(this.category)
  }

  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  }

  publishPost() {
    console.log(this.posttags)
    let post = {
      "title": this.title,
      "content": this.simplemde.options.previewRender(this.simplemde.value()),
      "imagepath": this.postimage,
      "author": "Praveen Rana",
      "tags": this.posttags,
      "slugurl": this.slugify(this.title),
      "category": this.category,
      "draft": false
    }

    console.log(post)

    if (!this.isnew) {
      console.log(this.posttags)
      this.blogservice.updatepost(post, this.to_UpdatepostId).subscribe((data) => {
        console.log(data)

        this.postimage = ''
        this.imageplaceholder = "block"
        this.posttags = [];
        this.title = ''
        this.category = 'Select Category'
        this.simplemde.value('')

        this.adminservice.postUpdated()
        this.router.navigateByUrl('/admin/home')

      })
    }
    else {
      this.blogservice.savepost(post).subscribe(data => {
        console.log(data)
        this.postimage = ''
        this.imageplaceholder = "block"
        this.posttags = [];
        this.title = ''
        this.category = 'Select Category'
        this.simplemde.value('')

        this.adminservice.postUpdated()
        this.router.navigateByUrl('/admin/home')
      })
    }
  }


  uploadpostimage() {
    uploadcare.openDialog().done((file) => {
      file.progress((uploadInfo) => {
        this.imageuploading = true
      });
      file.promise().done((fileInfo) => {
        console.log(fileInfo.cdnUrl)
        this.imageuploading = false
        this.postimage = fileInfo.cdnUrl
        this.imageplaceholder = "none"
      }).fail((error, fileInfo) => {
        this.imageuploading = false
      });
    })
  }

  onpreviewShow() {
    this.content = this.simplemde.options.previewRender(this.simplemde.value())
  }

  onpreviewHide() {
    console.log('hide');
  }

  onsaveindraft() {
    let post = {
      "title": this.title,
      "content": this.simplemde.options.previewRender(this.simplemde.value()),
      "imagepath": this.postimage,
      "author": "Praveen Rana",
      "tags": this.posttags,
      "slugurl": this.slugify(this.title),
      "category": this.category,
      "draft": true
    }

    this.blogservice.savepost(post).subscribe(data => {
      console.log(data)
      this.adminservice.postUpdated()
      this.router.navigateByUrl('/admin/drafts')
    })
  }

}


