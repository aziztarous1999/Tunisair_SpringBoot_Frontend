import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtService } from 'app/components/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/components/services/auth.service';
import jwt_decode from 'jwt-decode';
interface ApiResponse {
    accessToken: string;
    tokenType: string;
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    name:string= "";
    password:string= "";
    errorMessage:string= "";
    ngOnInit(): void {

    }

    clearAlert(){
      this.errorMessage="";
    }

    constructor(private http: HttpClient,private jwtService: JwtService,private router: Router,private authService:AuthService) { }


    Login(){
      

        const data = { username: this.name, password: this.password }; // your data object
          this.http.post<ApiResponse>('http://localhost:8090/api/auth/login', data)
            .subscribe(
              response =>  {
                this.jwtService.setJwt(response.accessToken);
                this.authService.login(true);
                const decodedToken:any = jwt_decode(response.accessToken);
                this.authService.setRole(decodedToken.sub =="admin");
                this.router.navigate(['']);
            }, // success callback
              error => this.errorMessage="Wrong 'USERNAME' or 'PASSWORD'!" // error callback
            );
    }

    isValid() {
        return this.name!='' && this.name.length >= 3 && this.name.length <= 200 &&
        this.password!='' && this.password.length >= 3 && this.password.length <= 200 ;
      }

}