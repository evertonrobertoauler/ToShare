import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router }      from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 message: string;
 isvalidating:boolean = false
 
 user = { "email":'' , "password":''}


  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  ngOnInit(){

  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {    
    this.message = 'Trying to log in ...';
   
    this.isvalidating = true
    this.authService.login(this.user).subscribe((data) => {
      console.log(data)      
      this.setMessage();
      this.isvalidating = false            
      if (this.authService.isLoggedIn) {      
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/home';      
        this.router.navigate([redirect]);
      }
    });
  }
}
