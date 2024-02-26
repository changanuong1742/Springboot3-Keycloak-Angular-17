import {Component} from '@angular/core';
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {RouterLink, RouterOutlet} from "@angular/router";
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    MatDrawerContainer,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatToolbar, MatIcon, MatListItem, MatList, MatDivider, RouterLink, RouterOutlet
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isDesktop: boolean | undefined;

  constructor(private breakpointObserver: BreakpointObserver, public keycloakService : KeycloakService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web]).subscribe(result => {
      this.isDesktop = window.innerWidth >= 1024;
    });
  }

  handleLogout(){
    this.keycloakService.logout(window.location.origin);
  }
}
