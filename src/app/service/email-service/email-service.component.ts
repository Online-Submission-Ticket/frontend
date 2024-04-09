import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrl: './email-service.component.css'
})

export class EmailServiceComponent {
  private emailID: string = '';

  setEmailID(emailID: string) {
    this.emailID = emailID;
  }

  getEmailID(): string {
    return this.emailID;
  }
}
