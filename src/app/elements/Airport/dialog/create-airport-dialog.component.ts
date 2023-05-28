import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

@Component({
  selector: 'app-create-airport-dialog',
  templateUrl: './create-airport-dialog.component.html',
})

export class CreateAirportComponent {
    name:string= "";
    city:string= "";
    country:string= "";
    myAuthToken:string = "";
    private myHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.myAuthToken
      })
    };

    isValid() {
      return this.country!='' && this.country.length >= 3 && this.country.length <= 200 &&
      this.city!='' && this.city.length >= 3 && this.city.length <= 200 &&
      this.name!='' && this.name.length >= 3 && this.name.length <= 200 ;
    }



    save() {
 

          const data = { name: this.name, city:this.city,country:this.country}; // your data object
          this.http.post('http://localhost:8090/api/airport/create', data , this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The new airport has been created successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the new airport!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<CreateAirportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private jwtService: JwtService) { 
      this.myHttpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.jwtService.getJwt()
        })
      }
    }

  onNoClick(): void {
    this.dialogRef.close("Operation cancelled!");
  }

}
