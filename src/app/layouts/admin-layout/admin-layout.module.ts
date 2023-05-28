import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { DishListComponent } from 'app/elements/Dish/dish-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateDishComponent } from 'app/elements/Dish/dialog/create-dish-dialog.component';
import { EditDishComponent } from 'app/elements/Dish/dialog/edit-dish-dialog.component';
import { DeleteDishComponent } from 'app/elements/Dish/dialog/delete-dish-dialog.component';
import { StaffListComponent } from 'app/elements/Staff/staff-list.component';
import { CreateStaffComponent } from 'app/elements/Staff/dialog/create-staff-dialog.component';
import { EditStaffComponent } from 'app/elements/Staff/dialog/edit-staff-dialog.component';
import { DeleteStaffComponent } from 'app/elements/Staff/dialog/delete-staff-dialog.component';
import { CrewListComponent } from 'app/elements/Crew/crew-list.component';
import { CreateCrewComponent } from 'app/elements/Crew/dialog/create-crew-dialog.component';
import { EditCrewComponent } from 'app/elements/Crew/dialog/edit-crew-dialog.component';
import { DeleteCrewComponent } from 'app/elements/Crew/dialog/delete-crew-dialog.component';
import { LoginComponent } from 'app/elements/Login/login.component';
import { SignupComponent } from 'app/elements/Signup/signup.component';
import { AirportListComponent } from 'app/elements/Airport/airport-list.component';
import { CreateAirportComponent } from 'app/elements/Airport/dialog/create-airport-dialog.component';
import { EditAirportComponent } from 'app/elements/Airport/dialog/edit-airport-dialog.component';
import { DeleteAirportComponent } from 'app/elements/Airport/dialog/delete-airport-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    DataTablesModule,
    MatDialogModule
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    DishListComponent,
    CreateDishComponent,
    EditDishComponent,
    DeleteDishComponent,
    StaffListComponent,
    CreateStaffComponent,
    EditStaffComponent,
    DeleteStaffComponent,
    CrewListComponent,
    CreateCrewComponent,
    EditCrewComponent,
    CreateCrewComponent,
    DeleteCrewComponent,
    LoginComponent,
    SignupComponent,
    AirportListComponent,
    CreateAirportComponent,
    EditAirportComponent,
    DeleteAirportComponent
  ]
})

export class AdminLayoutModule {}
