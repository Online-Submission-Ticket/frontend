import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-ticket',
  templateUrl: './sub-ticket.component.html',
  styleUrls: ['./sub-ticket.component.css']
})
export class SubTicketComponent implements OnInit {
  studentDetails: any;
  rollNo: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudentDetails();
    const storedEmailID = localStorage.getItem('emailID');
    const storedPassword = localStorage.getItem('password');
  }

  // fetchStudentDetails() {
  //
  //   this.http.get<any>('http://localhost:8080/api/getStudent/33201@gmail.com').subscribe(response => {
  //     this.studentDetails = response.data;
  //
  //   });
  // }
  fetchStudentDetails() {
    // Retrieve email ID from local storage
    const storedEmailID = localStorage.getItem('emailID');

    // Check if storedEmailID is not null or undefined
    if (storedEmailID) {
      // Append storedEmailID to the endpoint URL
      const apiUrl = `http://localhost:8080/api/getStudent/${storedEmailID}`;

      // Make the HTTP GET request
      this.http.get<any>(apiUrl).subscribe(response => {
        this.studentDetails = response.data;
      });
    } else {
      console.error('Email ID not found ');
      // Handle the case where email ID is not found in local storage
    }
  }

}
