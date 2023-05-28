import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';


interface airport {
    id: number;
    name: string;
    city: string;
    country: string;
  }
  


@Component({
  selector: 'app-edit-airport-dialog',
  templateUrl: './edit-airport-dialog.component.html',
})

export class EditAirportComponent {
    name:string= "";
    city:string= "";
    country:string= "";
    selectedOption = '';
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


    updateName(newName:string) {
        this.name = newName;
      }

    uploadData(){
        let selectedElements = this.data.filter(element => element.id === Number.parseInt(this.selectedOption))[0];
        this.name = selectedElements.name;
        this.city = selectedElements.city;
        this.country = selectedElements.country;
    }



    save() {
          


        const data = { name: this.name, city:this.city,country:this.country}; // your data object
          this.http.put(`http://localhost:8090/api/airport/modifyAirport/${this.selectedOption}`, data,this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The airport has been modified successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the modification!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<EditAirportComponent>,
    @Inject(MAT_DIALOG_DATA) public data:airport[],private http: HttpClient,private jwtService: JwtService) { 
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
