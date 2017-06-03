import { Injectable, Inject } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'


import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


@Injectable()
export class BlogService {


    //public serverurl = 'http://warm-river-90946.herokuapp.com/'

     public serverurl = 'http://praveenblogapi.herokuapp.com/'
    //public serverurl = 'http://localhost:3000/'

    private admintoken;

    constructor(private http: Http, @Inject(PLATFORM_ID) private platformId: Object) {

    }


    private headers = new Headers({
        'Content-Type': 'application/json',
    });

    createauthenticatedHeader(){
        if (this.platformId === 'browser') {
            this.headers.delete('x-access-token')
            this.headers.append('x-access-token', localStorage.getItem('admintoken'))
        }    
    }

    private options = new RequestOptions({ headers: this.headers });

    getposts(): Observable<any> {
        return this.http.get(this.serverurl + 'blog/posts')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    getadminposts(): Observable<any> {
        this.createauthenticatedHeader();
        return this.http.get(this.serverurl + 'admin/posts', this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getadmindrafts():Observable<any>{

        this.createauthenticatedHeader();

        return this.http.get(this.serverurl + 'admin/draftposts', this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getcategories(): Observable<any> {
        return this.http.get(this.serverurl + 'blog/categories')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    savepost(post): Observable<any> {
        this.createauthenticatedHeader();

        return this.http.post(this.serverurl + 'admin/post', post, this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;
    }


    getpost(id: string): Observable<any> {

        this.createauthenticatedHeader();

        return this.http.get(this.serverurl + 'admin/post/' + id, this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deletepost(id: string) {

        this.createauthenticatedHeader();

        return this.http.delete(this.serverurl + 'admin/post/' + id, this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    updatepost(post, id: string) {

        this.createauthenticatedHeader();

        return this.http.put(this.serverurl + 'admin/post/' + id, post, this.options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;

    }

    getpost_slug(slugurl: string): Observable<any> {

        return this.http.get(this.serverurl + 'blog/post/' + slugurl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    getcategoryposts(category: string): Observable<any> {

        return this.http.get(this.serverurl + 'blog/posts/category/' + category)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    sendmsg(msgobject) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serverurl + 'contact', msgobject, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;
    }

}