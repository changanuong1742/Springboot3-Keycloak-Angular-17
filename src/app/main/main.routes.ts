import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LayoutDashboardComponent} from "../layouts/layout-dashboard/layout-dashboard.component";
import {AuthGuard} from "../core/guards/guards.component";

export const Main_Router: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard], data: {roles: ['view-seat']}
      },
      {
        path: 'seat',
        loadChildren: () =>
          import('./seat/seat.routes')
            .then(m => m.SEAT_ROUTES)
      },
    ]
  },

];
