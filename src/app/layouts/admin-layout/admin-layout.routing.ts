import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DishListComponent } from 'app/elements/Dish/dish-list.component';
import { StaffListComponent } from 'app/elements/Staff/staff-list.component';
import { CrewListComponent } from 'app/elements/Crew/crew-list.component';
import { LoginComponent } from 'app/elements/Login/login.component';
import { AuthGuard } from 'app/auth.guard';
import { AirportListComponent } from 'app/elements/Airport/airport-list.component';
import { AuthAdminGuard } from 'app/authadmin.guard ';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent , canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent , canActivate: [AuthGuard] },
    { path: 'dishes',   component: DishListComponent , canActivate: [AuthGuard] },
    { path: 'staff',   component: StaffListComponent , canActivate: [AuthGuard] },
    { path: 'crews',   component: CrewListComponent , canActivate: [AuthGuard] },
    { path: 'airports',   component: AirportListComponent , canActivate: [AuthGuard] },
    { path: 'profile',   component: UserProfileComponent , canActivate: [AuthGuard] },
    { path: 'users',   component: DishListComponent , canActivate: [AuthAdminGuard] },
    /*
    { path: 'table-list',     component: TableListComponent , canActivate: [AuthGuard] },
    { path: 'typography',     component: TypographyComponent , canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent , canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent , canActivate: [AuthGuard] },
    { path: 'notifications',  component: NotificationsComponent , canActivate: [AuthGuard] },
    { path: 'upgrade',        component: UpgradeComponent , canActivate: [AuthGuard] },
    { path: 'product',         component: DishListComponent , canActivate: [AuthGuard] },
    { path: 'client',         component: DishListComponent , canActivate: [AuthGuard] },
    { path: 'subscription',         component: DishListComponent , canActivate: [AuthGuard] },
    */
    
];
