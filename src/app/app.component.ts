import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test-angular';

  public profile!: KeycloakProfile;

  constructor(public keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(profile => {
        this.profile = profile;
      });
    } else {
      this.keycloakService.login()
    }
  }
}
