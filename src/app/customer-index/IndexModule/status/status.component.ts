import {Component, OnInit} from '@angular/core';
import {ServiceOfferedService} from '../../../services/service-offered.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ServicesOffered} from '../../../models/services-offered';
import {ReschedulePopupComponent} from './reschedule-popup/reschedule-popup.component';
import {MatDialog} from '@angular/material/dialog';

export interface IrescheduleService {
  DateOfService: Date;
  ServiceName: string;
  BookingDate: Date;

}

// @ts-ignore
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})


export class StatusComponent implements OnInit {

  constructor(private service: ServiceOfferedService, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  dataSource = new MatTableDataSource<ServicesOffered>();

  displayedColumns: string[] = ['ServiceName', 'BookingDate', 'DateOfService', 'status', 'action'];
  serviceViewModel: ServicesOffered = new ServicesOffered();
  collectionService: ServicesOffered[] = [];
  dateOfService: string;

  ngOnInit() {
    this.getServices();
  }

  getServices() {
    this.service.getPendingService().subscribe(data => {
      this.collectionService = this.serviceViewModel.mapper(data);
      this.dataSource.data = this.collectionService;
    });


  }

  Cancel(id: string) {
    console.log(id);
    this.service.updateService(id, {isCompleted: true}).subscribe(data => {
      if (data) {
        if (data.message.trim() == 'updated') {
          this.snackBar.open('You deleted the service successfully', '', {
            duration: 5 * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.getServices();
        }
      }
    });
  }

  openDialog(): void {

  }

  Reschedule(id: string) {
    const dialogRef = this.dialog.open(ReschedulePopupComponent, {
      width: '300%"',
      data: {DateOfService: this.dateOfService}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dateOfService = result;
      console.log(result)
      this.service.updateService(id, {DateOfService: this.dateOfService}).subscribe(data => {
        if (data) {
          console.log(new Date(this.dateOfService));
          if (data.message.trim() == 'updated') {
            this.snackBar.open('You have rescheduled the service successfully', '', {
              duration: 5 * 1000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            });
            this.getServices();
          }
        }
      });
    });
  }
}
