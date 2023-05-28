import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

interface staff {
  id: number;
  name: string;
  employeeID: string;
  position: string;
}
  


@Component({
  selector: 'app-edit-staff-dialog',
  templateUrl: './edit-staff-dialog.component.html',
})

export class EditStaffComponent {
  name:string= "";
  employeeID:string= "";
  position:string= "";
  selectedOption = '';
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


    uploadData(){
        let selectedElements = this.data.filter(element => element.id === Number.parseInt(this.selectedOption))[0];
        this.name = selectedElements.name;
        this.employeeID = selectedElements.employeeID;
        this.position = selectedElements.position;
        
    }



    save() {
          


          const data = { name: this.name, employeeID: this.employeeID,position:this.position }; // your data object
          this.http.put(`http://localhost:8090/api/staff/modifyStaff/${this.selectedOption}`, data, this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The staff has been modified successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the modification!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<EditStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data:staff[],private http: HttpClient,private jwtService: JwtService) { 
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
