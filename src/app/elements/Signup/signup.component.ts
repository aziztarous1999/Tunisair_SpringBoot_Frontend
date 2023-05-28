import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
    name:string= "";
    password:string= "";
    errorMessage:string= "";
    ngOnInit(): void {

    }

    clearAlert(){
      this.errorMessage="";
    }

    constructor(private http: HttpClient,private router: Router) { }


    Login(): void {
      // Clear any existing alerts
      this.clearAlert();
    
      // Log the user's name and password to the console
      console.log(`username: ${this.name}, password: ${this.password}`);
    
      // Define the endpoint URL and data for the HTTP request
      const apiUrl = 'http://localhost:8090/api/auth/register';
      const data = { username: this.name, password: this.password };
    
      try {
        // Make the HTTP request to the API
        this.http.post(apiUrl, data).subscribe(
          () => {
            // If the request succeeds, navigate to the login page
            
          },
          (error) => {
            if(error.status  ==200){
              this.router.navigate(['/login']);
            }
            // If the request fails, display an error message
            this.errorMessage = 'Username is taken!';
          }
        );
      } catch (error) {
        // If an exception is thrown, display an error message
        this.errorMessage = 'An error occurred!';
      }
    }
    
    isValid() {
        return this.name!='' && this.name.length >= 3 && this.name.length <= 200 &&
        this.password!='' && this.password.length >= 3 && this.password.length <= 200 ;
      }

}