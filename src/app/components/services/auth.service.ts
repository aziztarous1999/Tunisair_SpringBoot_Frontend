import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInVar: boolean = false;
  private AdminRole: boolean = false;

  constructor() { }

  login(log:boolean): boolean {

    this.isLoggedInVar = log;
    return this.isLoggedInVar;
  }

  setRole(role:boolean) {
    this.AdminRole=role;
  }


  logout(): void {
    // Here you would send a request to your backend to log out the user
    // and set the isLoggedInVar variable to false
    this.isLoggedInVar = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  isAdmin():boolean{
    return this.AdminRole;
  }


}
