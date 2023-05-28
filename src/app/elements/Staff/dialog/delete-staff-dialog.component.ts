import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

interface Staff {
  id: number;
  name: string;
  employeeID: string;
  position: string;
}
  


@Component({
  selector: 'app-delete-staff-dialog',
  templateUrl: './delete-staff-dialog.component.html',
})

export class DeleteStaffComponent {
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
    return this.name!='' &&
    this.employeeID!='' &&
    this.position!='' ;
  }




  uploadData(){
    console.log("update data ", this.data)
    let selectedElements = this.data.filter(element => element.id === Number.parseInt(this.selectedOption))[0];
    this.name = selectedElements.name;
    this.employeeID = selectedElements.employeeID;
    this.position = selectedElements.position;
    
}



    save() {
      console.log("this.selectedOption")
          this.http.delete(`http://localhost:8090/api/staff/deleteStaff/${this.selectedOption}`,this.myHttpOptions).subscribe();
          this.dialogRef.close("The staff has been deleted successfully!")
        }



  constructor(
    public dialogRef: MatDialogRef<DeleteStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Staff[],private http: HttpClient,private jwtService: JwtService) { 
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
