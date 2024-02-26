import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {TableComponent} from "../../../shared/components/table/table.component";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatFormField} from "@angular/material/form-field";
import {KeycloakService} from "keycloak-angular";

export interface Seat {
  id: number,
  name: string
}


@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatTable,
    MatRowDef,
    MatHeaderRowDef,
    TableComponent,
    MatFormField,
  ],
  styleUrl: './data-table.component.scss'
})

export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  data: Seat[] = []

  listAction: any = {
    edit: false,
    delete: false,
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, private http: HttpClient, public keycloakService: KeycloakService) {
  }

  openSnackBarSuccess(value: string) {
    this._snackBar.open(value, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  ngOnInit() {
    this.getAllSeats();
    if (this.keycloakService.getUserRoles().includes('edit-seat')) {
      this.listAction.edit = true;
    }
    if (this.keycloakService.getUserRoles().includes('delete-seat')) {
      this.listAction.delete = true;
    }
  }

  getAllSeats() {
    this.http.get<Seat[]>("http://localhost:8081/api/seat").subscribe({
      next: seats => {
        this.data = seats;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  removeRecord(obj: any) {
    this.http.delete(`http://localhost:8081/api/seat/${obj.id}`).subscribe({
      next: seats => {
        this.openSnackBarSuccess("Deleted")
        this.getAllSeats();
      },
      error: err => {
        this.openSnackBarSuccess("Error delete")
      }
    });
  }
}
