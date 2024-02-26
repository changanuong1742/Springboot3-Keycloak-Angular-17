import {Routes} from "@angular/router";
import {DataTableComponent} from "./data-table/data-table.component";
import {DataEntryComponent} from "./data-entry/data-entry.component";
import {AuthGuard} from "../../core/guards/guards.component";

export const SEAT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DataTableComponent,
    canActivate: [AuthGuard], data: {roles: ['view-seat']}

  },
  {
    path: 'form',
    component: DataEntryComponent,
    canActivate: [AuthGuard], data: {roles: ['create-seat']}
  }
];
