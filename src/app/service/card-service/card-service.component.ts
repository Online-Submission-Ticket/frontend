import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class CardServiceComponent {

   apiUrl = 'http://localhost:8080/api/getTeacher/tanksalenishant5@pict.edu';
  constructor(private http: HttpClient) { }


  getCardDetails(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Error fetching card details'); // Throw error to be caught by caller
  }


}
