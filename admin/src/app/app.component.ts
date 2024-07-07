import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppearanceService } from './service/appearance.service';
import { LoaderService } from './service/loader.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loaderService= inject(LoaderService);
  appearanceService= inject(AppearanceService);
  ngOnInit(): void {
   this.appearanceService.getColors().subscribe((res:any)=>{
    if(res.status==200){
      this.setCSSVariables(res.res)
    }
   }) 
  }
  private setCSSVariables(colors: any): void {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colors.primary_color);
    root.style.setProperty('--secondary-color', colors.secondary_color);
    root.style.setProperty('--success-color', colors.success_color);
    root.style.setProperty('--warning-color', colors.warning_color);
    root.style.setProperty('--danger-color', colors.danger_color);
  }
}
