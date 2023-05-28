import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

@Component({
  selector: 'app-create-dish-dialog',
  templateUrl: './create-dish-dialog.component.html',
})

export class CreateDishComponent {
    name:string= "";
    description:string= "";
    price:number = null;
    priceController: NgModel;
    myAuthToken:string = "";
    private myHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.myAuthToken
      })
    };
    isValid() {
      return this.price >= 1 && !Number.isNaN(this.price) && this.price != null &&
      this.description!='' && this.description.length >= 10 && this.description.length <= 2000 &&
      this.name!='' && this.name.length >= 3 && this.name.length <= 200;
    }



    save() {
          


          const data = { name: this.name, description: this.description,price:this.price }; // your data object
          this.http.post('http://localhost:8090/api/dish/create', data,this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The new dish has been created successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the new dish!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<CreateDishComponent>,
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
