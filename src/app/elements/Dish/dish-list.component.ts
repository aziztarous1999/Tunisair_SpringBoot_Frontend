import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateDishComponent } from './dialog/create-dish-dialog.component';
import { EditDishComponent } from './dialog/edit-dish-dialog.component';
import { DeleteDishComponent } from './dialog/delete-dish-dialog.component';
import { JwtService } from 'app/components/services/jwt.service';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
}


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})


export class DishListComponent implements OnInit {
  dishes:Dish[];
  filteredItems:Dish[];
  searchQuery: string;
  myAuthToken:string = "";
  private myHttpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.myAuthToken
    })
  };
  title = 'Angular Pagination Tutorial';
  // Some array of things.
  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;
  addMessage:string ="";
  modifyMessage:string ="";
  deleteMessage:string ="";
  constructor(private http: HttpClient,private dialog: MatDialog,private jwtService: JwtService) { 
    this.myHttpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.jwtService.getJwt()
      })
    }
  }
  clearAlert(){
    this.addMessage="";
    this.modifyMessage="";
    this.deleteMessage="";
  }

add(){
  const dialogRef = this.dialog.open(CreateDishComponent, {
    width:'800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    this.addMessage =result;
    this.refrech();
  });
}




modify(){
  const dialogRef = this.dialog.open(EditDishComponent, {
    width:'800px',
    data:this.dishes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.modifyMessage =result;
    this.refrech();
  });
}

delete(){
  const dialogRef = this.dialog.open(DeleteDishComponent, {
    width:'800px',
    data:this.dishes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.deleteMessage =result;
    this.refrech();
  });
}



  getData() {
    return this.http.get('http://localhost:8090/api/dish/dishes',this.myHttpOptions);
  }
  







  
//filter
  filterItems() {
    this.filteredItems = this.dishes.filter(item =>
      item.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.price.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    }


    


  ngOnInit() {

    this.refrech();
    
  }


  refrech(){
    this.getData().subscribe((dishes:Dish[]) => {
      this.dishes = dishes.sort((a, b) => a.id - b.id);;
      this.filteredItems = dishes.sort((a, b) => a.id - b.id);;
      console.log(dishes);
      // handle the data here
    });
  }

}
