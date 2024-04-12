import {Component, OnInit} from '@angular/core';
import {CardServiceComponent} from "../../service/card-service/card-service.component";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrl: './batch-details.component.css'
})
export class BatchDetailsComponent implements OnInit {

  teacherID: string ='' ;
  labs: any[]= [];
  subjects: any[] = [];
  errorMessage: string = '';
  batchDetails: any;

  constructor(private route: ActivatedRoute,private cardService: CardServiceComponent) {}

  ngOnInit(): void {
    this.cardService.getCardDetails().pipe(
      catchError(error => {
        console.error('Error fetching card details:', error);
        this.errorMessage = 'An error occurred while fetching card details.';
        return throwError(error);
      })
    ).subscribe(response => {
      if (response.success) {
        this.teacherID = this.cardService.teacherID;
        this.labs = response.labs;
        this.subjects = response.subjects;
        console.log('Teacher ID:', this.teacherID);
        console.log('Labs:', this.labs);
       // console.log('Subjects:', this.subjects);
      } else {
        this.errorMessage = response.message;
      }
    });


    this.route.params.subscribe(params => {
      this.teacherID = params['teacherId'];
      if (params['batch']) {
        this.getBatchDetails(params['batch']);
      }
      // else if (params['classId']) {
      //   this.getSubjectDetails(params['classId']);
      // }
    });
  }

  getBatchDetails(batch: string): void {
    this.cardService.getBatchDetails(this.teacherID, batch).pipe(
      catchError(error => {
        console.error('Error fetching batch details:', error);
        this.errorMessage = 'An error occurred while fetching batch details.';
        return throwError(error);
      })
    ).subscribe(response => {
      if (response.success) {
        this.batchDetails = response.data;
        console.log('Batch details:', this.batchDetails);
      } else {
        this.errorMessage = response.message;
      }
    });
  }


  // Method to toggle lab status
  toggleLabStatus(teacherID: string, rollNo: string, labName: string, lab: any): void {
    this.cardService.updateLabStatus(teacherID, rollNo, labName, !lab.labStatus).subscribe(response => {
      if (response.success) {
        // Update lab status locally
        lab.labStatus = !lab.labStatus;
        console.log('Lab status updated successfully');
      } else {
        console.error('Error updating lab status:', response.message);
      }
    });
  }


}
