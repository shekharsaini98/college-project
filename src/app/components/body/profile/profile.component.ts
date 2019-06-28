import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user-service.service';
import {AppUser} from '../../../models/app-user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CountryService} from '../../../services/country.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private user: UserService, private fB: FormBuilder, private countryService: CountryService,
              private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.user$ = this.route.snapshot.data['user'].services;
    console.log(this.user$);
  }
  private country$: string[];
  private States: string[];

  edit: boolean = false;
  formControl: FormGroup;
  user$: AppUser;

  step = -1;

  Image: File = null;
  private imageUpload = false;

  appUser: AppUser = new AppUser();
  userUpload = false;

  ngOnInit() {

    this.formControl = this.fB.group({
      displayPic: [null],
      Country: [null],
      State: [null],
      PhoneNumber: [null],
      Username: [null],
      fLine: [null],
      lLine: [null],
      pCode: [null],


    })

    this.Country();
  }


  Edit() {
    this.edit = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onFileChange(event) {
    this.imageUpload = true;
    this.Image = <File>event.target.files[0];

  }

  onSubmit() {
    console.log(this.formControl.value);

    const fd = new FormData();

    if (this.formControl.value.fLine !== null && this.formControl.value.fLine !== undefined) {
      let fLine = this.formControl.value.fLine;
      fLine = fLine.concat(', ' + this.formControl.value.lLine);
      this.appUser.Address = fLine;
      this.userUpload = true;
    }

    if (this.formControl.value.PhoneNumber !== null && this.formControl.value.PhoneNumber !== undefined) {
      this.appUser.PhoneNumber = this.formControl.value.PhoneNumber;
      this.userUpload = true;
    }

    if (this.formControl.value.Username !== null && this.formControl.value.Username !== undefined) {
      this.appUser.Username = this.formControl.value.Username;
      this.userUpload = true;
    }

    if (this.formControl.value.Country !== null && this.formControl.value.Country !== undefined) {
      this.appUser.Country = this.formControl.value.Country;
    }

    if (this.formControl.value.State !== null && this.formControl.value.State !== undefined) {
      this.appUser.State = this.formControl.value.State;
      this.userUpload = true;
    }

    if (this.userUpload) {
      console.log(this.appUser)
      this.appUser._id = this.user$._id;
      this.user.profileUpdate(this.appUser).subscribe(data => {
        console.log(data);
        if(data){
          this.snackBar.open('Data uploaded', '', {
            duration: 5 * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          location.reload();
        }
      });
    }
    if (this.imageUpload) {

      fd.append('displayPic', this.Image, this.Image.name);
      fd.append('id', this.user$._id);
      console.log(fd)
      this.user.displayPicUpdate(fd).subscribe(data => {
        if (data) {
          this.snackBar.open('Image uploaded', '', {
            duration: 5 * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          location.reload();
        }
      });
    }
  }


//country and states
  Country(): void {
    this.country$ = this.countryService.getCountry();


  }


  state(): void {
    const SelectedcountryName = this.formControl.value.Country;
    if (SelectedcountryName != null && SelectedcountryName !== undefined) {

      const AllState = this.countryService.getState();
      const index = this.country$.indexOf(SelectedcountryName);
      const states = AllState[index + 1].split('|');
      this.States = states;
    }
  }
}
