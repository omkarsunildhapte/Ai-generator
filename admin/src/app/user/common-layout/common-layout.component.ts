import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PlatformService } from '../../service/platform.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet,RouterLink],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent implements OnInit {
  platformServies = inject(PlatformService)
  value: number = 50;
  value_one: number = 40;
  tools_data: any;
  click_data: any ;
  account_data: any;
  router=inject(Router)
  ngOnInit(): void {
  this.click_data = [
    {
      image: 'book.svg',
      text: 'Branding Package',
    },
    {
      image: 'newspaper.svg',
      text: 'Complete Brand Content',
    },
    {
      image: 'book.svg',
      text: 'Copywriting Framework',
    },
    {
      image: 'newspaper.svg',
      text: 'Employee Handbook Generator',
    },
    {
      image: 'book.svg',
      text: 'LinkedIn Profile Builder',
    },
    {
      image: 'newspaper.svg',
      text: 'Homepage Copy',
    },
    {
      image: 'book.svg',
      text: 'SEO Optimized Blog Package',
    },
    {
      image: 'newspaper.svg',
      text: 'Sales Copywriting Package',
    },
    {
      image: 'book.svg',
      text: 'Social Media Posts',
    },
    {
      image: 'newspaper.svg',
      text: 'Video Marketing Script',
    },
    {
      image: 'book.svg',
      text: 'YouTube Branding',
    },
  ];
  this.account_data = [
    {
      image: 'newspaper.svg',
      text: 'Profile',
      link:'/user/profile'
    },
    {
      image: 'book.svg',
      text: 'Subscription',
    },
    {
      image: 'newspaper.svg',
      text: 'Payments',
    },
    {
      image: 'book.svg',
      text: 'Tutorial Video',
    },
    {
      image: 'newspaper.svg',
      text: 'Settings',
      link:'/user/setting'
    },
    {
      image: 'book.svg',
      text: 'Support',
    },
    {
      image: 'book.svg',
      text: 'Log Out',
    },
  ];
  this.getData()
  }
  showValues(index:number){
    this.tools_data[index].active =! this.tools_data[index].active;
  }
  goPath(path:string){
    this.router.navigate([path])
  }
  getData(){
    this.platformServies.getUserCategories().subscribe((res:any)=>{
      if (res.status ==200){
        this.tools_data = res.res; 
        this.tools_data=this.tools_data.map((element:any) => ({
          ...element,
          active:false
        }));
      }
    }) 
  }
  getRouter(value:any){
    const queryParams = {
      id: value.id
    };
    this.router.navigate(['/user/prompts'], { queryParams });
  }
}
