import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/dishes', title: 'Dishes',  icon: 'dinner_dining', class: '' },
    { path: '/staff', title: 'Staff',  icon: 'diversity_3', class: '' },
    { path: '/crews', title: 'Crews',  icon: 'support_agent', class: '' },
    { path: '/airports', title: 'Airports',  icon: 'airplane_ticket', class: '' },
    { path: '/profile', title: 'Profile',  icon: 'assignment_ind', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  
  constructor(private jwtService: JwtService,private router: Router,private authService:AuthService) {
    if(this.authService.isAdmin()){
      ROUTES.push({ path: '/users', title: 'users',  icon: 'supervisor_account', class: '' });
    }
  }

  logout(){
      this.jwtService.setJwt("");
      this.authService.logout();
      location.reload();
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
