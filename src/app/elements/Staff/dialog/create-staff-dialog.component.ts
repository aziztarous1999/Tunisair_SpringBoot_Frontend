import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;



@Component({
  selector: 'app-create-staff-dialog',
  templateUrl: './create-staff-dialog.component.html',
})

export class CreateStaffComponent {
    name:string= "";
    employeeID:string= "";
    position:string= "";
    myAuthToken:string = "";
    private myHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.myAuthToken
      })
    };

    
    isValid() {
      return this.name!='' && this.name.length >= 3 && this.name.length <= 200 &&
      this.employeeID!='' && this.employeeID.length ==7 &&
      this.position!='' && this.position.length >= 3 && this.position.length <= 200;
    }



    save() {
          


          const data = { name: this.name, employeeID: this.employeeID,position:this.position }; // your data object
          this.http.post('http://localhost:8090/api/staff/create', data,this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The new staff has been created successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the new staff!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<CreateStaffComponent>,
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
