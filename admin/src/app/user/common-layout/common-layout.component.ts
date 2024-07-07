import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [HeaderComponent,CommonModule,RouterOutlet],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent implements OnInit {
  value: number = 50;
  value_one: number = 40;
  tools_data: any;
  click_data: any ;
  account_data: any;
  router=inject(Router)
  ngOnInit(): void {
  }
  showValues(index:number){
    this.tools_data[index].active =! this.tools_data[index].active;
  }
  goPath(path:string){
    this.router.navigate([path])
  }

}
