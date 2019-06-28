import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerIndexRoutingModule} from './customer-index-routing.module';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import {MaterialModule} from '../models/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReschedulePopupComponent} from './IndexModule/status/reschedule-popup/reschedule-popup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';


@NgModule({
  declarations: [SubCategoryComponent, ReschedulePopupComponent],
  imports: [
    CommonModule,
    CustomerIndexRoutingModule, MaterialModule, FormsModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule
  ],
  exports: [CustomerIndexRoutingModule, ReschedulePopupComponent],
  entryComponents: [ReschedulePopupComponent],
  providers: [MatSnackBar]
})
export class CustomerIndexModule {

}
