import { NavigationModule } from '@core/components/navigation/navigation.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    ModalModule.forRoot()
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPasswordStrengthModule,

    NavigationModule
  ]
})
export class SharedModule { }
