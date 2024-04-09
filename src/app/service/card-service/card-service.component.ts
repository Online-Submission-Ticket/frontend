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
  // apiUrl = 'http://localhost:8080/api/getTeacher/tanksalenishant5@pict.edu';

   // apiUrl: string = '';
  constructor(private http: HttpClient,
              private emailService: EmailServiceComponent
              ) { }

  emailID = this.emailService.getEmailID();

apiUrl = `http://localhost:8080/api/getTeacher/${this.emailID}`;
  // ngOnInit() {
  //   //const emailID = this.emailService.getEmailID();
  //
  //   this.apiUrl = `http://localhost:8080/api/getTeacher/${emailID}`;
  //   // Now use this.apiUrl to make API calls
  // }
  getCardDetails(): Observable<any> {
    // return this.http.get(this.apiUrl)
    //   .pipe(
    //     catchError(error => this.handleError(error))
    //   );
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


}
