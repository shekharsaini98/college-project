import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicesOffered} from "../../models/services-offered";
import {UserService} from "../../services/user-service.service";
import {ServiceOfferedService} from "../../services/service-offered.service";
import {Location} from '@angular/common';
import {Charges} from '../../models/charges'

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  formControl: FormGroup;

  constructor(private fB: FormBuilder, private userService: UserService, private serve: ServiceOfferedService
    , private loc: Location) {
  }

  address: string;
  minDate = new Date();

  ngOnInit() {
    this.address = this.userService.CurrentUser.Address;
    this.formControl = this.fB.group({
      Address: [this.address, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      charges: [0, Validators.required],
      DateOfService: [new Date(), Validators.required],
      ServiceName: ['', Validators.required],
    });
  }

  onSubmit() {

    let service = new ServicesOffered();
    service.UserId = this.userService.CurrentUser._id;
    const date = this.formControl.value.DateOfService;
    const onlyDate = date.getDate();
    service.serviceType = service.mapService(this.formControl.value.ServiceName);
    service = {...service, ...this.formControl.value};
    console.log(service, 'onlyDate-', onlyDate, 'time-', date);
    this.serve.postServices(service).subscribe(data => {
      console.log(data);
      this.loc.back();
      this.loc.back();
    });
  }

  ChargeCalc() {
    console.log(this.formControl.value.ServiceName)
    const charge = new Charges();
    const t = new ServicesOffered();
    let type = t.mapService(this.formControl.value.ServiceName);
    const amount = charge.CalculateChargeforAll(type, 3);
    this.formControl.patchValue({
      charges: [amount]
    });
  }
}
