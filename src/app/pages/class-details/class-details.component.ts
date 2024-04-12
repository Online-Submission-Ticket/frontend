

import { Component, OnInit } from '@angular/core';
import { CardServiceComponent } from "../../service/card-service/card-service.component";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  teacherID: string = '';
  subjectDetails: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private cardService: CardServiceComponent) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teacherID = params['teacherId'];
      const classId = params['class'];
      if (classId) {
        this.getSubjectDetails(classId);
      }
    });
  }

  getSubjectDetails(classId: string): void {
    this.cardService.getSubjectsDetails(this.teacherID, classId).pipe(
      catchError(error => {
        console.error('Error fetching subject details:', error);
        this.errorMessage = 'An error occurred while fetching subject details.';
        return throwError(error);
      })
    ).subscribe(response => {
      if (response.success) {
        this.subjectDetails = response.data.formattedStudents;
        console.log('Subject details:', this.subjectDetails);
      } else {
        this.errorMessage = response.message;
      }
    });
  }


  toggleTheoryStatus(student: any): void {
    const newStatus = !student.subjects[0].status; // Toggle the status
    this.cardService.updateTheorySubmissionStatus(student.rollNo, newStatus).subscribe(response => {
      if (response.success) {
        // Update the status in the subjects array
        student.subjects.forEach((subject: { subjectName: any; status: any; }) => {
          if (subject.subjectName === response.data.student.subjects[0].subjectName) {
            subject.status = response.data.student.subjects[0].status;
          }
        });
        console.log('Status updated successfully:', newStatus);
      } else {
        console.error('Error updating status:', response.message);
      }
    });
  }
}
