import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

@Component({
  selector: 'app-create-crew-dialog',
  templateUrl: './create-crew-dialog.component.html',
})

export class CreateCrewComponent {
    name:string= "";
    employeeID:string= "";
    role:string= "";
    yearsOfExperience:number = null;
    yearsOfExperienceController: NgModel;
    myAuthToken:string = "";
    private myHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.myAuthToken
      })
    };

    isValid() {
      return this.yearsOfExperience >= 1 && !Number.isNaN(this.yearsOfExperience) && this.yearsOfExperience != null &&
      this.employeeID!='' && this.employeeID.length ==6 &&
      this.name!='' && this.name.length >= 3 && this.name.length <= 200 &&
      this.role != '';
    }



    save() {
          
      

          const data = { name: this.name, employeeID: this.employeeID,yearsOfExperience:this.yearsOfExperience,role:this.role }; // your data object
          this.http.post('http://localhost:8090/api/crew/create', data , this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The new crew has been created successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the new crew!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<CreateCrewComponent>,
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
