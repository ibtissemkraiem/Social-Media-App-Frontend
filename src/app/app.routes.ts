import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
      ],
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
      ],
    },
  ];
  export class AppRoutingModule { }