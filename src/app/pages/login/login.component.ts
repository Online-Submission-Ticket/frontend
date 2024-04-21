import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {EmailServiceComponent} from "../../service/email-service/email-service.component";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;
  emailID: string = "";
  password: string = "";
  newPassword : string = "";

  constructor(private http: HttpClient,
              private router: Router,
              private emailService: EmailServiceComponent

              ) {}


  onLogin() {
    let body = {
      "emailID": this.emailID,
      "password": this.password,

    };
     if (this.emailID==='admin@gmail.com')
      {
        this.router.navigateByUrl('/file-upload');
      }
    const domain = this.emailID.substring(this.emailID.lastIndexOf('@') + 1);
    this.http.post<any>("http://localhost:8080/api/auth/login", body)
      .pipe(
        tap((response: any) => {
          if (response.success) {
            alert("Login successful!");
            // this.router.navigateByUrl('/sub-ticket');
            this.emailService.setEmailID(this.emailID);
            //const domain = this.emailID.substring(this.emailID.lastIndexOf('@') + 1);
            if (domain === 'pict.edu')
            {
              this.router.navigateByUrl('/dashboard');

            }
            else if (domain === 'gmail.com')
            {
              this.router.navigateByUrl('/sub-ticket');

            }
            else
            {
              console.log('Email domain is not supported');
            }
            this.emailID = ''; // Clear emailID after successful login
            this.password = '';

          } else {
            throw new Error("Login failed. Please check your credentials and try again.");
          }
        }),
        catchError((error) => {
          if (error.status === 401) {
            alert("Unauthorized access. Please check your credentials.");
          } else {
            alert("An error occurred while logging in. Please try again later.");
          }
          return throwError(error);
        })
      )
      .subscribe();
  }
  resetPassword()
  {
    this.isSignDivVisiable = false;
    // Prepare the request body
    const body = {
      emailID: this.emailID,
      newPassword: this.newPassword
    };

    // Make the HTTP POST request to the API endpoint
    this.http.post<any>('http://localhost:8080/api/auth/set/password', body)
      .subscribe(
        response => {
          // Handle success response
          console.log('Password reset successfully:', response);
          // Optionally, navigate to a success page or display a success message
        },
        error => {
          // Handle error response
          console.error('Error resetting password:', error);
          // Optionally, display an error message to the user
        }
      );
  }

}
