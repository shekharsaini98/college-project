import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FeedBackService} from '../../../services/feed-back.service';
import {Feedback} from "../../../models/feedback";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private fService: FeedBackService,
              private fb: FormBuilder, private loc: Location, private router: Router) {
  }

  formControl: FormGroup;
  feedBackModel: Feedback;
  t = {
    smileyCondition0: false,
    smileyCondition1: false,
    smileyCondition2: false,
    smileyCondition3: false,
    smileyCondition4: false
  }

  smileyCondition(val) {
    for (let i = 0; i <=4; i++) {
      this.t['smileyCondition' + i] = false;
    }
    this.t['smileyCondition' + val] = true;
  }


  ngOnInit() {
    this.formControl = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      rating: [null]
    });
  }

  sendFeedBack() {
    console.log(this.formControl.value);
    // this.feedBackModel.sentBy =
    this.fService.postFeedBack(this.formControl.value).subscribe(data => {

    });
    this.snackBar.open('Thank You!! We got your feedback', '', {
      duration: 5 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
    this.loc.back();
  }
}
