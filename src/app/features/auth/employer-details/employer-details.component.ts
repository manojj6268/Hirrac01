
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrl: './employer-details.component.scss'
})
export class EmployerDetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  uploadedLogoName: string | undefined;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      companyName: ['', Validators.required],
      gstin: [''],
      website: [''],
      industry: ['', Validators.required],
      companySize: [''],
      location: [''],
      foundedIn: [''],
      logo: [null]
    });
  }

  get companyName() { return this.detailsForm.get('companyName'); }
  get industry() { return this.detailsForm.get('industry'); }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.uploadedLogoName = input.files[0].name;
  } else {
    this.uploadedLogoName = undefined;
  }
}

  onSave() {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      return;
    }
    console.log('Company details', this.detailsForm.value);
    alert('Details saved (demo).');
    // optionally navigate to dashboard
    // this.router.navigate(['/dashboard']);
  }
}