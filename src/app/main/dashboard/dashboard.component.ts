import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
  // public profile!: KeycloakProfile;
  //
  // constructor(public keycloakService: KeycloakService, private http: HttpClient) {
  // }
  //
  // ngOnInit(): void {
  //   console.log(1)
  //   if (this.keycloakService.isLoggedIn()) {
  //     this.keycloakService.loadUserProfile().then(profile => {
  //       this.profile = profile;
  //       console.log(this.keycloakService)
  //
  //     });
  //   } else {
  //     this.keycloakService.login()
  //   }
  //
  // }
}
