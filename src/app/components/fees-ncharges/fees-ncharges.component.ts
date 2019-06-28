import {Component} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  cost: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'House Cleaning', weight: 1.0079, cost: 5000},
  {position: 2, name: 'House Renovation', weight: 4.0026, cost: 12000},
  {position: 3, name: 'Dry Cleaning', weight: 6.941, cost: 3000},
  {position: 4, name: 'Normal Washing', weight: 9.0122, cost: 2000},
  {position: 5, name: 'Cooking Veg', weight: 10.811, cost: 6000},
  {position: 6, name: 'Cooking Non-Veg', weight: 12.0107, cost: 8000},
  {position: 7, name: 'Caterning Veg', weight: 14.0067, cost: 20000},
  {position: 8, name: 'Caterning Non-Veg', weight: 15.9994, cost: 30000},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-fees-ncharges',
  templateUrl: './fees-ncharges.component.html',
  styleUrls: ['./fees-ncharges.component.css']
})
export class FeesNchargesComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'cost'];
  dataSource = ELEMENT_DATA;
}