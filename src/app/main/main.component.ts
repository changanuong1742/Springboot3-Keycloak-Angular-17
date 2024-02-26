import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LayoutDashboardComponent} from '../layouts/layout-dashboard/layout-dashboard.component';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, LayoutDashboardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent{
}
