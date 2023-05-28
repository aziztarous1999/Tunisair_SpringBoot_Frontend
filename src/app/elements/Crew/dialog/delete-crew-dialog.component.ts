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
  selector: 'app-delete-crew-dialog',
  templateUrl: './delete-crew-dialog.component.html',
})

export class DeleteCrewComponent {
    name:string= "";
    role:string= "";
    employeeID:string= "";
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
      return this.yearsOfExperience != null &&
      this.employeeID!='' &&
      this.name!='' && this.role !='';
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
          


          this.http.delete(`http://localhost:8090/api/crew/deleteCrew/${this.selectedOption}`,this.myHttpOptions).subscribe();
          this.dialogRef.close("The crew has been deleted successfully!")


        }



  constructor(
    public dialogRef: MatDialogRef<DeleteCrewComponent>,
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
