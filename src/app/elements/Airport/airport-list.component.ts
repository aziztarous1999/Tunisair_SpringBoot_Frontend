import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { JwtService } from 'app/components/services/jwt.service';
import { CreateAirportComponent } from './dialog/create-airport-dialog.component';
import { EditAirportComponent } from './dialog/edit-airport-dialog.component';
import { DeleteAirportComponent } from './dialog/delete-airport-dialog.component';

interface airport {
  id: number;
  name: string;
  city: string;
  country: string;
}


@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})


export class AirportListComponent implements OnInit {
  airports:airport[];
  filteredItems:airport[];
  searchQuery: string;
  myAuthToken:string = "";
  private myHttpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.myAuthToken
    })
  };


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



  const dialogRef = this.dialog.open(CreateAirportComponent, {
    width:'800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    this.addMessage =result;
    this.refrech();
  });



}




modify(){



  const dialogRef = this.dialog.open(EditAirportComponent, {
    width:'800px',
    data:this.airports
  });

  dialogRef.afterClosed().subscribe(result => {
    this.modifyMessage =result;
    this.refrech();
  });



}

delete(){



  const dialogRef = this.dialog.open(DeleteAirportComponent, {
    width:'800px',
    data:this.airports
  });

  dialogRef.afterClosed().subscribe(result => {
    this.deleteMessage =result;
    this.refrech();
  });



}



  getData() {
    return this.http.get('http://localhost:8090/api/airport/airports', this.myHttpOptions);
  }
  







  
//filter
  filterItems() {


    this.filteredItems = this.airports.filter(item =>
      item.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    );



    }


    


  ngOnInit() {

    this.refrech();
    
  }


  refrech(){
    this.getData().subscribe((airports:airport[]) => {

      this.airports = airports.sort((a, b) => a.id - b.id);;
      this.filteredItems = airports.sort((a, b) => a.id - b.id);;
    });
  }

}
