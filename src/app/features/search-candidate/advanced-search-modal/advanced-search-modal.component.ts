import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface AdvancedFilters {
  experienceMin?: number;
  experienceMax?: number;
  salaryMin?: number;
  salaryMax?: number;
  noticePeriod?: string;
  availableImmediately?: boolean;
  company?: string;
  education?: string;
  skills?: string[];
}

@Component({
  selector: 'app-advanced-search-modal',
  templateUrl: './advanced-search-modal.component.html',
  styleUrls: ['./advanced-search-modal.component.css']
})
export class AdvancedSearchModalComponent implements OnChanges {
  @Input() open = false;
  @Input() initial: Partial<AdvancedFilters> = {};
  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<AdvancedFilters>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      experienceMin: [0],
      experienceMax: [10],
      salaryMin: [0],
      salaryMax: [0],
      noticePeriod: [''],
      availableImmediately: [false],
      company: [''],
      education: [''],
      skills: [[]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initial'] && this.initial) {
      this.form.patchValue(this.initial);
    }
  }

  onApply() {
    this.apply.emit(this.form.value);
  }

  onClose() {
    this.close.emit();
  }

  onSkillsBlur(ev: Event) {
    const target = ev.target as HTMLInputElement | null;
    const val = (target?.value || '').split(',').map(s => s.trim()).filter(Boolean);
    this.form.patchValue({ skills: val });
  }
}
