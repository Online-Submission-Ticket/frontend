import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardServiceComponent } from "../../service/card-service/card-service.component";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: 'app-cc-class',
  templateUrl: './cc-class.component.html',
  styleUrls: ['./cc-class.component.css']
})
export class CcClassComponent implements OnInit {

  teacherID: string = '';
  ccStudents: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private cardService: CardServiceComponent) { }

  ngOnInit(): void {
    console.log('CC Class component initialized');
    this.route.params.subscribe(params => {
      this.teacherID = params['teacherId'];
      // if (this.teacherID) {
      //   console.log('Teacher ID:', this.teacherID);
      //   this.getCCSubjectDetails();
      //
      // }
      this.getCCSubjectDetails();
    });
  }

  getCCSubjectDetails(): void {
    this.cardService.getSubjectsDetailsForCC(this.teacherID).pipe(
      catchError(error => {
        console.error('Error fetching CC subject details:', error);
        this.errorMessage = 'An error occurred while fetching CC subject details.';
        return throwError(error);
      })
    ).subscribe(response => {
      if (response.success) {
        this.ccStudents = response.data.formattedStudents;
        console.log('CC Subject details:', this.ccStudents);
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  toggleSubmission(student: any): void {
    // Toggle the submission status
    student.submissionStatus = !student.submissionStatus;

    // Call the API to update the submission status
    this.cardService.updateSubmissionStatus(student.rollNo, student.submissionStatus).subscribe(
      response => {
        if (!response.success) {
          // Revert the submission status if API call fails
          student.submissionStatus = !student.submissionStatus;
          console.error('Error updating submission status:', response.message);
          // Optionally, show an error message to the user
        }
      },
      error => {
        // Revert the submission status if API call fails
        student.submissionStatus = !student.submissionStatus;
        console.error('Error updating submission status:', error);
        // Optionally, show an error message to the user
      }
    );
  }
}
