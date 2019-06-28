import {Component, OnInit} from '@angular/core';
import {ServiceOfferedService} from '../../../services/service-offered.service';
import {MatTableDataSource} from '@angular/material';
import {ServicesOffered} from '../../../models/services-offered';
import {UserService} from "../../../services/user-service.service";
import {WorkerServiceService} from "../../../services/worker-service.service";


@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit {

  constructor(private service: ServiceOfferedService, private user: UserService, private workerS: WorkerServiceService) {
  }

  Role = this.user.Role;
  dataSource = new MatTableDataSource<ServicesOffered>();
  dataSource1 = new MatTableDataSource<ServicesOffered>();

  displayedColumns: string[] = ['ServiceName', 'BookingDate', 'DateOfService', 'status', 'action'];
  displayedColumns1: string[] = ['ServiceName', 'BookedOn', 'serviceDueOn', 'Username', 'action'];
  serviceViewModel: ServicesOffered = new ServicesOffered();

  ngOnInit() {
    if (this.Role.Customer) {
      this.getServices();
    } else {
      this.getWorkerService();
    }


  }

  getServices() {
    this.service.getAllservicesForUser().subscribe(data => {
      data = this.serviceViewModel.mapper(data);
      this.dataSource.data = data;
    });
  }

  getWorkerService() {
    this.workerS.getAllservicesForUser().subscribe(data => {
      data = this.serviceViewModel.mapper(data);
      this.dataSource1.data = data;
    });
  }
}
