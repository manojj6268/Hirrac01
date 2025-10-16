import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrl: './job-preview.component.scss'
})
export class JobPreviewComponent {

  constructor(private router: Router) {}

  onClose() {
    // Navigate back to jobs list
    this.router.navigate(['/jobs']);
  }
}
