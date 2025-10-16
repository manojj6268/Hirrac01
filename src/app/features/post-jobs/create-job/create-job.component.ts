// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-create-job',
//   templateUrl: './create-job.component.html',
//   styleUrl: './create-job.component.scss'
// })
// export class CreateJobComponent {

// }

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements AfterViewInit {
  createJobForm: FormGroup;
  isPreviewMode = false;
  selectedBenefits = new Set<string>();
  today = new Date();

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  // Dropdown options
  recruitmentTimelineOptions = [
    'Immediate',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'Within 3 months',
    'Flexible'
  ];

  jobTypeOptions = [
    'Full Time',
    'Part Time',
    'Contract',
    'Internship',
    'Freelance'
  ];

  payUnitOptions = [
    'Per Hour',
    'Per Day',
    'Per Week',
    'Per Month',
    'Per Year',
    'Per Project'
  ];

  locationTypeOptions = [
    'On-site',
    'Remote',
    'Hybrid',
    'Client Location'
  ];

  benefitsOptions = [
    { label: 'Health Insurance', value: 'health_insurance' },
    { label: 'Provident Fund', value: 'provident_fund' },
    { label: 'Cell phone reimbursement', value: 'cellphone_reimbursement' },
    { label: 'Paid sick time', value: 'paid_sick_time' },
    { label: 'Work from home', value: 'work_from_home' },
    { label: 'Paid time off', value: 'paid_time_off' },
    { label: 'Food provided', value: 'food_provided' }
  ];

  constructor(private fb: FormBuilder) {
    this.createJobForm = this.fb.group({
      // Job Details
      jobTitle: ['', Validators.required],
      recruitmentTimeline: ['', Validators.required],
      numberOfPeople: ['', [Validators.required, Validators.min(1)]],
      jobType: ['', Validators.required],
      payMaximum: ['', [Validators.required, Validators.min(0)]],
      payUnit: ['', Validators.required],

      // Location Details
      locationType: ['', Validators.required],
      city: ['', Validators.required],
      area: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      state: [''], // Optional state field

      // Job Description
      jobDescription: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // Set initial value from form to editor
    const description = this.createJobForm.get('jobDescription')?.value || '';
    if (this.editor) {
      this.editor.nativeElement.innerHTML = description;
    }
  }

  updateDescription() {
    const html = this.editor.nativeElement.innerHTML;
    this.createJobForm.get('jobDescription')?.setValue(html);
  }

  onPreview() {
    if (this.createJobForm.valid) {
      this.isPreviewMode = true;
    } else {
      this.markFormGroupTouched();
    }
  }

  onSubmit() {
    if (this.createJobForm.valid) {
      console.log('Form submitted:', this.createJobForm.value);
      // Here you would typically send the data to your backend
      alert('Job posted successfully!');
    } else {
      this.markFormGroupTouched();
    }
  }

  onEdit() {
    this.isPreviewMode = false;
  }

  formatText(command: string) {
    // Focus on the editor before executing command
    this.editor.nativeElement.focus();

    // Execute the command
    document.execCommand(command, false);
  }

  toggleBenefit(benefitKey: string) {
    if (this.selectedBenefits.has(benefitKey)) {
      this.selectedBenefits.delete(benefitKey);
    } else {
      this.selectedBenefits.add(benefitKey);
    }
  }

  getBenefitLabel(key: string) {
    return this.benefitsOptions.find(b => b.value === key)?.label || key;
  }

  onClosePreview() {
    this.isPreviewMode = false;
  }

  getSelectedBenefits() {
    return Array.from(this.selectedBenefits);
  }

  private markFormGroupTouched() {
    Object.keys(this.createJobForm.controls).forEach(key => {
      const control = this.createJobForm.get(key);
      control?.markAsTouched();
    });
  }

  editField(field: string) {
    console.log('Edit field:', field);
    // TODO: Implement edit functionality to close preview and focus on form field
  }
}