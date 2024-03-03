import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


   isSignDivVisiable: boolean  = true;
 //
 //  signUpObj: SignUpModel  = new SignUpModel();
 //  loginObj: LoginModel  = new LoginModel();
 //
 // // constructor(private router: Router){}

 name : string = ""
    email : string = ""
  password : string = ""
   constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    let body = {
      "name": this.name,
      "email": this.email,
      "password": this.password
    };

    this.http.post("http://localhost:8080/api/auth/login", body, {responseType: 'text'})
      .pipe(
        tap((resultData: any) => {
          const response = JSON.parse(resultData);
          console.log(response);
          if (response.success) {
            alert("Login successful!");
            this.router.navigateByUrl('/dashboard');
            this.name = '';
            this.email = '';
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

}


// export class SignUpModel  {
//   name: string;
//   email: string;
//   password: string;
//
//   constructor() {
//     this.email = "";
//     this.name = "";
//     this.password= ""
//   }
// }

// export class LoginModel  {
//   email: string;
//   password: string;
//
//   constructor() {
//     this.email = "";
//     this.password= ""
//   }
// }
