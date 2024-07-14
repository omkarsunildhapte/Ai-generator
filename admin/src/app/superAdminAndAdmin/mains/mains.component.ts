import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-mains',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarModule],
  templateUrl: './mains.component.html',
  styleUrl: './mains.component.scss'
})
export class MainsComponent implements OnInit{
  sidebarVisible: boolean = true;
  userService = inject(UserService)
  menuItems = [
    { title: 'Dashboard', link: '/main/dashboard', icon: 'pi-gauge' },
    {
      title: 'AI SOLUTIONS', submenu: [
        { title: 'Categories', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Questions', link: '/main/ai-solution/questions', icon: 'pi-question-circle' },
        { title: 'Personas', link: '/main/ai-solution/personas', icon: 'pi-home' },
        { title: 'Prompts', link: '/main/ai-solution/prompts', icon: 'pi-key' },
        { title: 'Bot Categories', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Bot Prompts', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Settings', link: '/main/ai-solution/settings', icon: 'pi-cog' }
      ]
    },
    {
      title: 'Payments', submenu: [
        { title: 'Plans', link: '/main/payment/plans', icon: 'pi-server' },
        { title: 'Affiliate', link: '/main/payment/affiliate', icon: 'pi-venus' },
      ]
    },
    {
      title: 'APPEARANCE', submenu: [
        { title: 'Brand', link: '/main/appearance/brand', icon: 'pi-images' },
        { title: 'Themes', link: '/main/appearance/themes', icon: 'pi-home' },
        { title: 'Login with Google And Custom Script', link: '/main/appearance/login-with-google', icon: 'pi-google' },
      ]
    },
    {
      title: 'Content management', submenu: [
        { title: 'Categories', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Tags', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Pages', link: '/main/ai-solution/categories', icon: 'pi-tags' },
      ]
    },
    {
      title: 'USERS', submenu: [
        { title: 'Permissions', link: '/main/user-management/permissions', icon: 'pi-lock' },
        { title: 'Roles', link: '/main/user-management/roles', icon: 'pi-id-card' },
        { title: 'Users', link: '/main/user-management/user', icon: 'pi-user' },
        { title: 'Logout', link: '/logout', icon: 'pi-sign-out' }
      ]
    }
  ];
  languages:any[]=[];
  ngOnInit(): void {
    this.userService.getLanguages().subscribe((res: any) => {
      if (res.status == 200) {
        this.languages = res.res;
      }
    });
  }
}
