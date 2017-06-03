import { Injectable , Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthService {

  constructor(private http: Http , @Inject(PLATFORM_ID) private platformId: Object ) { }

  //  public serverurl = 'http://warm-river-90946.herokuapp.com/'
      public serverurl = 'http://praveenblogapi.herokuapp.com/'
  //    public serverurl = 'http://localhost:3000/'

  public isLoggedIn: boolean = false;      
  redirectUrl:string= '/admin/home';

  login(user): Observable<boolean> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serverurl+'auth/login', user, options)
            .map((res: Response) => {                 
                let response = res.json()                
                if(response.message =='Accepted'){                    
                    this.isLoggedIn = true        
                       if (this.platformId === 'browser') {
                           localStorage.setItem('admintoken' , response.token)
                       }                                
                }                
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));;    
  }

  logout() {

       if (this.platformId === 'browser') { 
           localStorage.removeItem('admintoken')            
       }


      //this.isLoggedIn = false
      
      /* return this.http.get(this.serverurl+'auth/logout')
            .map((res: Response) => {                 
                let response = res.json()
                console.log(res)
                if(response.message =='Logged Out'){
                    this.isLoggedIn = false;
                }                
            }) */          
  }
}
