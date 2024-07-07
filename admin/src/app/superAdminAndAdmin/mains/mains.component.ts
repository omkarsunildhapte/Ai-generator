import { Component, inject } from '@angular/core';
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
export class MainsComponent {
  sidebarVisible: boolean = true;
  userService = inject(UserService)
  menuItems = [
    { title: 'Dashboard', link: '/dashboard', icon: 'pi-gauge' },
    {
      title: 'AI SOLUTIONS', submenu: [
        { title: 'Categories', link: '/main/ai-solution/categories', icon: 'pi-tags' },
        { title: 'Questions', link: '/main/ai-solution/questions', icon: 'pi-question-circle' },
        { title: 'Personas', link: '/main/ai-solution/personas', icon: 'pi-home' },
        { title: 'Prompts', link: '/main/ai-solution/prompts', icon: 'pi-key' },
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
      title: 'CMS', submenu: [
        { title: 'Content management', link: '/content-management', icon: 'pi-address-book' }
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
}
