import {Component, OnInit} from '@angular/core';
import {CardServiceComponent} from "../../service/card-service/card-service.component";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  cardDetails: any;
  errorMessage: string = '';


  constructor(private cardService: CardServiceComponent) {}

  ngOnInit(): void {
    this.cardService.getCardDetails().pipe(
      catchError(error => {
        console.error('Error fetching card details:', error);
        this.errorMessage = 'An error occurred while fetching card details.';
        return throwError(error);
      })
    ).subscribe(response => {
      if (response.success) {
        this.cardDetails = response.data;
        console.log('lab.batch:', this.cardDetails.labs[0].batch);
      } else {
        this.errorMessage = response.message;
      }
    });
  }

}
