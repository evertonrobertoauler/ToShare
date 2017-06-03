import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Subject } from 'rxjs/Subject';

@Injectable()
export class PostsService{    

    posteventEmitter : EventEmitter<any> =new EventEmitter<any>()


    private posts =[]

    private subject = new Subject<any>()

    setposts( posts:any[] ) {
        console.log(posts)
        this.posts = posts
    //    debugger
    }

    getpost(id) {
        console.log(id)
        let mypost
        for(let post of this.posts){
            if(post._id == id){
                mypost = post;
                break;
            }
        }     
      //  debugger       
        return mypost
    }
  
}