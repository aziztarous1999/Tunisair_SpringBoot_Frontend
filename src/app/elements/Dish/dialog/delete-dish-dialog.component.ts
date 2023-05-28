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
  selector: 'app-delete-dish-dialog',
  templateUrl: './delete-dish-dialog.component.html',
})

export class DeleteDishComponent {
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
      return this.price != null &&
      this.description!='' &&
      this.name!='' ;
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
          


          this.http.delete(`http://localhost:8090/api/dish/deleteDish/${this.selectedOption}`,this.myHttpOptions).subscribe();
          this.dialogRef.close("The dish has been deleted successfully!")


        }



  constructor(
    public dialogRef: MatDialogRef<DeleteDishComponent>,
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
