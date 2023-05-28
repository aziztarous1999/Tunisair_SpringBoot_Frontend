import { Component, Inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from 'app/components/services/jwt.service';

declare var isNaN: (value: any) => boolean;

interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  


@Component({
  selector: 'app-edit-dish-dialog',
  templateUrl: './edit-dish-dialog.component.html',
})

export class EditDishComponent {
    name:string= "";
    description:string= "";
    price:number = null;
    priceController: NgModel;
    selectedOption = '';
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
    updateName(newName:string) {
        this.name = newName;
      }

    uploadData(){
        let selectedElements = this.data.filter(element => element.id === Number.parseInt(this.selectedOption))[0];
        this.name = selectedElements.name;
        console.log(this.name)
        this.description = selectedElements.description;
        if (!isNaN(selectedElements.price)) {
            this.price = selectedElements.price;
          }
        console.log(this.name)
    }



    save() {
          


          const data = { name: this.name, description: this.description,price:this.price }; // your data object
          this.http.put(`http://localhost:8090/api/dish/modifyDish/${this.selectedOption}`, data,this.myHttpOptions)
            .subscribe(
              response => this.dialogRef.close("The dish has been modified successfully!"), // success callback
              error => this.dialogRef.close("An error has occurred while saving the modification!") // error callback
            );


        }



  constructor(
    public dialogRef: MatDialogRef<EditDishComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Dish[],private http: HttpClient,private jwtService: JwtService) { 
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
