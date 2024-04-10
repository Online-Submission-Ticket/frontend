import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  selectedOption: string = 'students'; // Default to students

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onFilechange(event: any): void {
    this.selectedFile = event.target.files.item(0);
  }

  uploadFile(): void {
    if (this.selectedFile) {

      if (this.selectedFile.type !== 'text/csv') {
        this.showNotification('Please select a CSV file.');
        return;
      }

      const formData = new FormData();
      formData.append('dataFile', this.selectedFile);

      const apiUrl = this.selectedOption === 'students' ? 'http://localhost:8080/api/upload/students/upload-students' : 'http://localhost:8080/api/upload/teachers/upload-teachers';

      this.http.post<any>(apiUrl, formData)
        .subscribe(
          response => {
            console.log('Upload successful:', response);
            // Reset selected file after upload
            this.selectedFile = null;
            // Show success Snackbar notification
            this.showNotification('Data uploaded successfully!');
          },
          error => {
            console.error('Upload failed:', error);
            // Show error Snackbar notification
            this.showNotification('Error uploading data. Please try again.');
          }
        );
    } else {
      console.error('No file selected.');
      this.showNotification('No file selected.');
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
