import { HelperComponent } from './components/helper/helper.component';
import { ErrorModule } from './errors/errors.module';
import { NavigationModule } from '@core/components/navigation/navigation.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { MatTabsModule } from '@angular/material/tabs';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    HelperComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TranslateModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    ErrorModule,

    AccordionModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPasswordStrengthModule,
    MatTabsModule,
    MatIconModule,

    NavigationModule,


    HelperComponent,
  ]
})
export class SharedModule {

 }
