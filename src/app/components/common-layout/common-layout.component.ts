import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { account_data, click_data, tools } from '../../config/side.menu';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [HeaderComponent,CommonModule,RouterOutlet],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent {
  value: number = 50;
  value_one: number = 40;
  tools_data: any =tools;
  click_data: any = click_data;
  account_data: any = account_data;
 constructor(private router:Router){

 }
  showValues(index:number){
    this.tools_data[index].active =! this.tools_data[index].active;
  }
  goPath(path:string){
    this.router.navigate([path])
  }

}
