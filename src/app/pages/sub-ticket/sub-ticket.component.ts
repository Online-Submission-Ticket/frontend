import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EmailServiceComponent} from "../../service/email-service/email-service.component";

@Component({
  selector: 'app-sub-ticket',
  templateUrl: './sub-ticket.component.html',
  styleUrls: ['./sub-ticket.component.css']
})
export class SubTicketComponent implements OnInit {
  studentDetails: any;
  rollNo: any;
  constructor(private http: HttpClient, protected emailService : EmailServiceComponent) { }

  ngOnInit(): void {
    // this.fetchStudentDetails();
    this.emailService.emailIDChanged.subscribe((emailID: string) => {
      console.log('Email ID changed:', emailID);

      this.fetchStudentDetails(emailID);
    });
  }

  // fetchStudentDetails() {
  //   const emailID = this.emailService.emailID;
  //   console.log('email id : ',emailID);
  //   this.http.get<any>( `http://localhost:8080/api/getStudent/${emailID}`).subscribe(response => {
  //     this.studentDetails = response.data;
  //
  //   });
  // }
  emailID = this.emailService.getEmailID();
  fetchStudentDetails(emailID: string) {
    console.log('Fetching student details for email ID:', emailID);
    this.http.get<any>(`http://localhost:8080/api/getStudent/${this.emailID}`).subscribe(response => {
      this.studentDetails = response.data;

    });
  }
}
