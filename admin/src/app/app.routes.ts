import { Routes } from '@angular/router';
import { authGuard } from './service/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/landing-page/landing-page.component').then(m => m.LandingPageComponent)

  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadComponent: () => import('./superAdminAndAdmin/mains/mains.component').then(m => m.MainsComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./superAdminAndAdmin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'user-management',
        children: [
          {
            path: 'permissions',
            loadComponent: () => import('./superAdminAndAdmin/users-management/permission/permission.component').then(m => m.PermissionComponent)
          },
          {
            path: 'roles',
            loadComponent: () => import('./superAdminAndAdmin/users-management/roles/roles.component').then(m => m.RolesComponent)
          },
          {
            path: 'user',
            loadComponent: () => import('./superAdminAndAdmin/users-management/user/user.component').then(m => m.UserComponent)
          },
        ],
      },
      {
        path: 'ai-solution',
        children: [
          {
            path: 'categories',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/categories/categories.component').then(m => m.CategoriesComponent)
          },
          {
            path: 'botcategories',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/bot-categories/bot-categories.component').then(m => m.BotCategoriesComponent)
          },
          {
            path: 'questions',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/questions/questions.component').then(m => m.QuestionsComponent)
          },
          {
            path: 'personas',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/personas/personas.component').then(m => m.PersonasComponent)
          },
          {
            path: 'settings',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/settings/settings.component').then(m => m.SettingsComponent)
          },
          {
            path: 'prompts',
            loadComponent: () => import('./superAdminAndAdmin/Ai-Solution/prompts/prompts.component').then(m => m.PromptsComponent)
          },
        ],
      },
      {
        path: 'payment',
        children: [
          {
            path: 'plans',
            loadComponent: () => import('./superAdminAndAdmin/payment/plans/plans.component').then(m => m.PlansComponent)
          },
          {
            path: 'affiliate',
            loadComponent: () => import('./superAdminAndAdmin/payment/affiliate/affiliate.component').then(m => m.AffiliateComponent)
          },
        ]
      },
      {
        path: 'appearance',
        children: [
          {
            path: 'brand',
            loadComponent: () => import('./superAdminAndAdmin/Appearance/brand/brand.component').then(m => m.BrandComponent)
          },
          {
            path: 'themes',
            loadComponent: () => import('./superAdminAndAdmin/Appearance/themes/themes.component').then(m => m.ThemesComponent)
          },
          {
            path: 'login-with-google',
            loadComponent: () => import('./superAdminAndAdmin/Appearance/login-with-google/login-with-google.component').then(m => m.LoginWithGoogleComponent)
          },
        ]
      },
      {
        path: 'content-management',
        loadComponent: () => import('./superAdminAndAdmin/content-management/content-management.component').then(m => m.ContentManagementComponent)
      },
      {
        path: 'pages',
        loadComponent: () => import('./superAdminAndAdmin/pages/pages.component').then(m => m.PagesComponent)
      },
      {
        path: 'tags',
        loadComponent: () => import('./superAdminAndAdmin/tags/tags.component').then(m => m.TagsComponent)
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'registerAdmin',
    loadComponent: () => import('./auth/register-admin/register-admin.component').then(m => m.RegisterAdminComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./auth/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('./user/common-layout/common-layout.component').then(m => m.CommonLayoutComponent),
    children: [
      { path: '', redirectTo: 'library', pathMatch: 'full' },
      {
        path: 'library',
        loadComponent: () => import('./user/library/library.component').then(m => m.LibraryComponent),
      },
      {
        path: 'history',
        loadComponent: () => import('./user/history/history.component').then(m => m.HistoryComponent),
      },
      {
        path: 'prompts',
        loadComponent: () => import('./user/promote/promote.component').then(m => m.PromoteComponent),
      },
      {
        path: 'chats',
        loadComponent: () => import('./user/chats/chats.component').then(m => m.ChatsComponent),
      },
      {
        path: 'chatbox',
        loadComponent: () => import('./user/chats/chat-box/chat-box.component').then(m => m.ChatBoxComponent),
      },
      {
        path: 'imagegenerate',
        loadComponent: () => import('./user/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent),
      },
      {
        path: 'gallery',
        loadComponent: () => import('./user/image-generator/image-generator.component').then(m => m.ImageGeneratorComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./user/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'setting',
        loadComponent: () => import('./user/settings/settings.component').then(m => m.SettingsComponent),
      },
    ]
  }
];
