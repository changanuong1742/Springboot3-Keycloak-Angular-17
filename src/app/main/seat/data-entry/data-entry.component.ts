import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import {ActivatedRoute, Route, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {Seat} from "../data-table/data-table.component";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIcon, MatButton, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.scss'
})
export class DataEntryComponent implements OnInit, AfterViewInit {

  showSuccessMessage = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  formData!: FormGroup;

  editId!: string | null;

  constructor(public keycloakService: KeycloakService, private http: HttpClient, private _snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.formData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  openSnackBarSuccess(value: string) {
    this._snackBar.open(value, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  ngOnInit() {
  }

  getSeatById(id: string) {
    this.http.get(`http://localhost:8081/api/seat/edit/${id}`).subscribe({
      next: (seat: any) => {  // Đặt kiểu dữ liệu của seat nếu có
        this.formData.get('name')?.setValue(seat.name);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  ngAfterViewInit() {
    this.editId = this.route.snapshot.queryParamMap.get('id');
    if (this.editId && this.keycloakService.getUserRoles().includes('edit-seat')) {
      this.getSeatById(this.editId)
    } else {
      this.router.navigate(['/seat']);
    }
  }

  submitForm() {
    if (!this.formData.invalid) {
      if (this.editId != null) {
        this.formData.addControl('id', this.fb.control(this.editId));

        console.log(this.formData.getRawValue())
        this.http.put("http://localhost:8081/api/seat", this.formData.getRawValue()).subscribe({
          next: data => {
            this.showSuccessMessage = true;
            this.openSnackBarSuccess("Success");
          },
          error: err => {
            this.openSnackBarSuccess("Fail");
          }
        })
      } else {
        this.http.post("http://localhost:8081/api/seat", this.formData.getRawValue()).subscribe({
          next: data => {
            this.showSuccessMessage = true;
            this.openSnackBarSuccess("Success");
          },
          error: err => {
            this.openSnackBarSuccess("Fail");
          }
        })
      }
      this.router.navigate(['/seat']);
    }
  }
}
