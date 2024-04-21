import {Component, EventEmitter} from '@angular/core';
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
  emailID: string = '';
  emailIDChanged: EventEmitter<string> = new EventEmitter<string>();
  setEmailID(emailID: string) {
    this.emailID = emailID;
    this.emailIDChanged.emit(emailID);
  }

  getEmailID(): string {
    return this.emailID;
  }
}
