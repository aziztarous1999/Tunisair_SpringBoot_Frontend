import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

interface crew {
    id: number;
    name: string;
    employeeID: string;
    role: string;
    yearsOfExperience: number;
  }
  


@Component({
  selector: 'app-edit-crew-dialog',
  templateUrl: './edit-crew-dialog.component.html',
})

export class EditCrewComponent {
    name:string= "";
    employeeID:string= "";
    role:string= "";
    yearsOfExperience:number = null;
    yearsOfExperienceController: NgModel;
    selectedOption = '';
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
      this.role !="";
    }
    updateName(newName:string) {
        this.name = newName;
      }

    uploadData(){
        let selectedElements = this.data.filter(element => element.id === Number.parseInt(this.selectedOption))[0];
        this.name = selectedElements.name;
        this.employeeID = selectedElements.employeeID;
        if (!isNaN(selectedElements.yearsOfExperience)) {
            this.yearsOfExperience = selectedElements.yearsOfExperience;
          }
          this.role = selectedElements.role;
    }



    save() {
          


          const data = { name: this.name, employeeID: this.employeeID,yearsOfExperience:this.yearsOfExperience,role:this.role }; // your data object
          this.http.put(`http://localhost:8090/api/crew/modifyCrew/${this.selectedOption}`, data,this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The crew has been modified successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the modification!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<EditCrewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:crew[],private http: HttpClient,private jwtService: JwtService) { 
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
