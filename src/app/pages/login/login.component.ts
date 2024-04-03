import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignDivVisiable: boolean  = true;
  emailID: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    let body = {
      "emailID": this.emailID,
      "password": this.password
    };
    const domain = this.emailID.substring(this.emailID.lastIndexOf('@') + 1);
    this.http.post<any>("http://localhost:8080/api/auth/login", body)
      .pipe(
        tap((response: any) => {
          if (response.success) {
            alert("Login successful!");
            // this.router.navigateByUrl('/sub-ticket');

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
            this.password = ''; // Clear password after successful login
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
}
