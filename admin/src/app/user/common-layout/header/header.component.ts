import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [InputTextModule,IconFieldModule,InputIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  headerName: string = "";
  currentRoutePath: string = "";
  router=inject(Router);
  user:any;
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoutePath = event.urlAfterRedirects;
        if (this.currentRoutePath.includes('/library')) {
          this.headerName = 'Library';
        } if (this.currentRoutePath.includes('/history')) {
          this.headerName = 'History';
        } else if (this.currentRoutePath.includes('/blogs')) {
          this.headerName = 'Blogs';
        }
      }
    });
    const user = localStorage.getItem('user');
    this.user = JSON.parse(user ?user :'');
  }
 
  getUser(): boolean {
    if (this.user) {
      return this.user.role.some((e:any)=>e.includes('Admin'));
    }
    return false;
  }
  
}
