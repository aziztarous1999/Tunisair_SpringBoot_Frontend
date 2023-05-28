import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateCrewComponent } from './dialog/create-crew-dialog.component';
import { EditCrewComponent } from './dialog/edit-crew-dialog.component';
import { DeleteCrewComponent } from './dialog/delete-crew-dialog.component';
import { JwtService } from 'app/components/services/jwt.service';

interface crew {
  id: number;
  name: string;
  employeeID: string;
  role: string;
  yearsOfExperience: number;
}


@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})


export class CrewListComponent implements OnInit {
  crewes:crew[];
  filteredItems:crew[];
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
  const dialogRef = this.dialog.open(CreateCrewComponent, {
    width:'800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    this.addMessage =result;
    this.refrech();
  });
}




modify(){
  const dialogRef = this.dialog.open(EditCrewComponent, {
    width:'800px',
    data:this.crewes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.modifyMessage =result;
    this.refrech();
  });
}

delete(){
  const dialogRef = this.dialog.open(DeleteCrewComponent, {
    width:'800px',
    data:this.crewes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.deleteMessage =result;
    this.refrech();
  });
}



  getData() {
    return this.http.get('http://localhost:8090/api/crew/crews', this.myHttpOptions);
  }
  







  
//filter
  filterItems() {
    this.filteredItems = this.crewes.filter(item =>
      item.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.yearsOfExperience.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.employeeID.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    }


    


  ngOnInit() {

    this.refrech();
    
  }


  refrech(){
    this.getData().subscribe((crewes:crew[]) => {

      for (let i = 0; i < crewes.length; i++) {
        if (crewes[i].role !== "pilot") {
          crewes[i].role = "Co-Pilot";
        }else{
          crewes[i].role = "Pilot";
        }
      }

      this.crewes = crewes.sort((a, b) => a.id - b.id);;
      this.filteredItems = crewes.sort((a, b) => a.id - b.id);;
    });
  }

}
