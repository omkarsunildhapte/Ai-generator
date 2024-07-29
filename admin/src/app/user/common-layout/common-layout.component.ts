import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PlatformService } from '../../service/platform.service';
import { HeaderComponent } from './header/header.component';
import { UserService } from '../../service/user.service';
import { menu } from '../../helper';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent implements OnInit {
  platformServices = inject(PlatformService)
  userService = inject(UserService)
  router = inject(Router);
  tools_data: any[] = [];
  click_data: any[] = menu.one_click;
  account_data: any[] = menu.account;
  user: any;
  ngOnInit(): void {
    this.getData();
    const user = localStorage.getItem('user');
    this.getUser(user);
  }

  getUser(user: string | null) {
    if (user) {
      this.user = JSON.parse(user);
      if (this.user.plan_id === 0) {
        this.platformServices.getDefaultUpdatePlan().subscribe((res: any) => {
          if (res.status === 200) {
            const currentDate = new Date();
            const oneMonthLater = new Date(currentDate.getTime());
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
            const { default_plan, image_limit, plan_id, seats_limit, word_limit } = res.res;
            Object.assign(this.user, { default_plan, image_limit, plan_id, seats_limit, word_limit, expire_date: oneMonthLater });
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        });
      }
    }
  }


  showValues(index: number) {
    this.tools_data[index].active = !this.tools_data[index].active;
  }

  getData() {
    this.platformServices.getUserCategories().subscribe((res: any) => {
      if (res.status == 200) {
        this.tools_data = res.res;
        this.tools_data = this.tools_data.map((element: any) => ({
          ...element,
          active: false
        }));
      }
    })
  }

  getRouter(value: any) {
    const queryParams = {
      id: value.id
    };
    this.router.navigate(['/user/prompts'], { queryParams });
  }

  goPath(path: any) {
    if (path.text == 'Log Out') {
      this.userService.logOut();
    } else {
      this.router.navigate([path.link])
    }
  }
}
