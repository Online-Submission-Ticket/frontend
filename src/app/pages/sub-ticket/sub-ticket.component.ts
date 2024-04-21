import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sub-ticket',
  templateUrl: './sub-ticket.component.html',
  styleUrls: ['./sub-ticket.component.css']
})
export class SubTicketComponent implements OnInit {
  studentDetails: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails() {

    this.http.get<any>('http://localhost:8080/api/getStudent/33201@gmail.com').subscribe(response => {
      this.studentDetails = response.data;
    });
  }
}
