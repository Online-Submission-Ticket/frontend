import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {EmailServiceComponent} from "../email-service/email-service.component";


@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class CardServiceComponent {
  teacherID: string = '';

  constructor(private http: HttpClient,
              private emailService: EmailServiceComponent
              ) { }

  emailID = this.emailService.getEmailID();

apiUrl = `http://localhost:8080/api/getTeacher/${this.emailID}`;
  // ngOnInit() {
  //   //const emailID = this.emailService.getEmailID();
  //
  //  this.apiUrl = `http://localhost:8080/api/getTeacher/${this.emailID}`;
  //
  // }
  getCardDetails(): Observable<any> {

    return this.http.get(this.apiUrl).pipe(
      tap((response: any) => {
        if (response.success) {
          this.teacherID = response.data.teacherID;
          console.log(this.teacherID)// Store teacherID from the response
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  getBatchDetails(teacherId: string, batch: string): Observable<any> {
    // const url = `http://localhost:8080/api/connectStu/lab/${teacherId}/${batch}`;
    const url = `http://localhost:8080/api/connectStu/lab/ABC12/${batch}`;

    return this.http.get(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getSubjectsDetails(teacherId: string, classId: string): Observable<any> {
   // const url = `http://localhost:8080/api/connectStu/theory/${teacherId}/${classId}`;
  const url = `http://localhost:8080/api/connectStu/theory/ABC12/${classId}`;

    return this.http.get(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Error fetching card details'); // Throw error to be caught by caller
  }

  getSubjectsDetailsForCC(teacherId: string): Observable<any> {
    const url = `http://localhost:8080/api/connectStuToCC/ABC12/cc`;
    return this.http.get<any>(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching CC subject details:', error);
          return throwError(error);
        })
      );
  }
  updateSubmissionStatus(rollNo: string, submissionStatus: boolean): Observable<any> {
    const apiUrl = `http://localhost:8080/api/approve/cc/ABC12/${rollNo}`;
    console.log('rollno:', rollNo);
    return this.http.post(apiUrl, { submissionStatus }).pipe(
      catchError(error => {
        console.error('Error updating submission status:', error);
        return throwError(error);
      })
    );
  }

  updateLabStatus(teacherID: string, rollNo: string, labName: string, submissionStatus: boolean): Observable<any> {
    const url = `http://localhost:8080/api/approve/lab/ABC12/CCL/${rollNo}/N`;
    return this.http.post<any>(url, { submissionStatus }).pipe(
      catchError(error => {
        console.error('Error updating lab status:', error);
        return throwError(error);
      })
    );
  }



  updateTheorySubmissionStatus(rollNo: string, submissionStatus: boolean): Observable<any> {
    const apiUrl = `http://localhost:8080/api/approve/theory/ABC12/CC/${rollNo}`;
    console.log('rollno:', rollNo);
    return this.http.post(apiUrl, { submissionStatus }).pipe(
      catchError(error => {
        console.error('Error updating theory submission status:', error);
        return throwError(error);
      })
    );
  }


}
