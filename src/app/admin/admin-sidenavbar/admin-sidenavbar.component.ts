import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Component({
  selector: 'app-admin-sidenavbar',
  templateUrl: './admin-sidenavbar.component.html',
  styleUrls: ['./admin-sidenavbar.component.css']
})
export class AdminSidenavbarComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  public isloggedin

  ngOnInit() {

    if (this.platformId === 'browser') {

      if (localStorage.getItem('admintoken')) {
        this.isloggedin = true
      }
      
    }
  }

  logout() {
    this.authservice.logout()
    this.router.navigate(['/'])
  }
}
