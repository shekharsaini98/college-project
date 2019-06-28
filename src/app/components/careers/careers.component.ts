import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {LoginComponent} from "../header/login/login.component";
import {UserService} from "../../services/user-service.service";
import {Router} from "@angular/router";
import {CountryService} from "../../services/country.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  private openregister = false;

  constructor(private _loginservice: UserService, private route: Router, private countryService: CountryService,
              private dialog2: MatDialog, private snBar: MatSnackBar, private l: Location) {
  }

  formFields: FormGroup;

  message: string;

  public country$: string[];
  state$: string[];

  States: string[];
  forLogin = false;

  ngOnInit() {
    this.formFields = new FormGroup({
      Username: new FormControl(),
      Email: new FormControl(),
      Password: new FormControl(),
      ConfirmPassword: new FormControl(),
      PhoneNumber: new FormControl(),
      Address: new FormControl(),
      Country: new FormControl(),
      State: new FormControl()

    });

    this.Country();
    this.state();


  }


  Register(): void {

    let careers = {};
    careers['Role'] = 'Worker';
    careers = {...careers, ...this.formFields.value}
    this._loginservice.RegisterUser(careers).subscribe(data => {


      if (data == null || data === undefined) {

      }
      if (data.message === 'Successfully Saved') {
        // console.log(data.message);
        this.message = data.message;
        this.openregister = false;
        this.snBar.open('You have successfully registered!! Congratulation you are now a part of our team.\n' +
          '    Strongest and Fastest growing company in India.\n' +
          '    Go and Login right away', '', {
          duration: 5 * 1000,
          verticalPosition: 'top',

        });
        this.l.back();

      }

      this.message = data.message;

    });


  }

  Country(): void {
    this.country$ = this.countryService.getCountry();


  }


  state(): void {
    // tslint:disable-next-line:prefer-const
    let SelectedcountryName = this.formFields.value.Country;
    if (SelectedcountryName != null && SelectedcountryName !== undefined) {

      const AllState = this.countryService.getState();
      const index = this.country$.indexOf(SelectedcountryName);
      // tslint:disable-next-line:prefer-const
      let states = AllState[index + 1].split('|');
      this.States = states;
    }
  }

  joinus() {
    this.openregister = true;
  }

  openLogin() {
    this.openDialog2();
  }

  openDialog2() {
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.width = '300%';
    this.dialog2.open(LoginComponent);
  }

}
