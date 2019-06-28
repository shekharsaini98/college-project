import { LoginComponent } from './login/login.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { PopUpService } from 'src/app/services/pop-up.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  
  ngOnInit() {
    
  }
 constructor(public dynamicServic:PopUpService){}

 get dynamicService(){
return this.dynamicServic;
 }
}
