import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.scss']
})
export class CompanySettingComponent  implements OnInit {
  form: FormGroup;
  submitting = false;
  showSuccess = false;
  logoLoaded = true;

  industries = ['E-Commerce', 'Hospitality', 'Retail', 'Finance', 'Other'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: [''],
      gstin: [''],
      website: ['', Validators.required],
      industry: ['', Validators.required],
      companySize: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogoError() {
    // hide image and show placeholder
    this.logoLoaded = false;
  }

  getControl(name: string) {
    return this.form.get(name)!;
  }

  submit() {
    if (this.form.invalid) {
      // mark all as touched to surface validation UI
      Object.values(this.form.controls).forEach((c) => c.markAsTouched());
      return;
    }

    this.submitting = true;
    console.log('Form value:', this.form.value);

    // show temporary success state: disable button briefly and show a small toast text
    this.showSuccess = true;

    // simple ephemeral state (non-critical UI behavior)
    setTimeout(() => {
      this.submitting = false;
      // keep success visible for a moment then hide
      setTimeout(() => {
        this.showSuccess = false;
      }, 1400);
    }, 900);
  }

}
