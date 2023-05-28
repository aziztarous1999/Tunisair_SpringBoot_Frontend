import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreateStaffComponent } from './dialog/create-staff-dialog.component';
import { EditStaffComponent } from './dialog/edit-staff-dialog.component';
import { DeleteStaffComponent } from './dialog/delete-staff-dialog.component';
import { JwtService } from 'app/components/services/jwt.service';

interface staff {
  id: number;
  name: string;
  employeeID: string;
  position: string;
}


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})


export class StaffListComponent implements OnInit {
  staffes:staff[];
  filteredItems:staff[];
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
  const dialogRef = this.dialog.open(CreateStaffComponent, {
    width:'800px'
  });

  dialogRef.afterClosed().subscribe(result => {
    this.addMessage =result;
    this.refrech();
  });
}




modify(){
  const dialogRef = this.dialog.open(EditStaffComponent, {
    width:'800px',
    data:this.staffes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.modifyMessage =result;
    this.refrech();
  });
}

delete(){
  const dialogRef = this.dialog.open(DeleteStaffComponent, {
    width:'800px',
    data:this.staffes
  });

  dialogRef.afterClosed().subscribe(result => {
    this.deleteMessage =result;
    this.refrech();
  });
}



  getData() {
    return this.http.get('http://localhost:8090/api/staff/staffs' ,this.myHttpOptions);
  }
  







  
//filter
  filterItems() {
    this.filteredItems = this.staffes.filter(item =>
      item.id.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.position.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.employeeID.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    }


    


  ngOnInit() {

    this.refrech();
    
  }


  refrech(){
    this.getData().subscribe((staffes:staff[]) => {
      this.staffes = staffes.sort((a, b) => a.id - b.id);;
      this.filteredItems = staffes.sort((a, b) => a.id - b.id);;
      console.log(staffes);
      // handle the data here
    });
  }

}
