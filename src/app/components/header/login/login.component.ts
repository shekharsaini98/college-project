import {Component, OnInit, Input} from '@angular/core';
import {UserService} from 'src/app/services/user-service.service';
import {FormGroup, FormControl} from '@angular/forms';

import {Router, ActivatedRoute} from '@angular/router';
import {PopUpService} from 'src/app/services/pop-up.service';
import {SecurityService} from 'src/app/services/security.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
              private dialog2: MatDialog) {
  }

  returnUrl: string;


  formFields: FormGroup;
  message: string;

  ngOnInit() {
    this.formFields = new FormGroup({
      Email: new FormControl(),
      Password: new FormControl()
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '300%';
    // dialogConfig.height = "900px";
    this.dialog.open(RegisterComponent);
  }


  closeDialog2() {
    this.dialog2.closeAll();
  }

  Login() {
    this.userService.LoginUser(this.formFields.value).subscribe(data => {

         // console.log(data)
        // tslint:disable-next-line:triple-equals
        // tslint:disable-next-line:triple-equals
      if(data) {
        if (data.message === 'Success') {
          this.message = data.message;

          this.userService.User(data);
          this.closeDialog2();

          this.router.navigate([this.returnUrl]);
        }


        this.message = data.message;
      }
      },
      error => {
        console.error(error);
      }
    );
  }

  newUser() {
    this.openDialog();
  }
}
