// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-advanced-search-filters',
//   templateUrl: './advanced-search-filters.component.html',
//   styleUrl: './advanced-search-filters.component.scss'
// })
// export class AdvancedSearchFiltersComponent {

// }
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-search-filters',
  standalone: true, // Convert to standalone component
  imports: [CommonModule],
  templateUrl: './advanced-search-filters.component.html',
  styleUrls: ['./advanced-search-filters.component.scss']
})
export class AdvancedSearchFiltersComponent {
  @Output() applyFilters = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  // Job Experience options
  experienceOptions = [
    { label: '1 year', checked: false },
    { label: '2 years', checked: false },
    { label: '5 years', checked: false },
    { label: '10 years', checked: false }
  ];

  // Job Type options
  typeOptions = [
    { label: 'Fulltime', checked: false },
    { label: 'Temporary', checked: false },
    { label: 'Contract', checked: false },
    { label: 'Part time', checked: false },
    { label: 'Seasonal', checked: false }
  ];

  // Education options
  educationOptions = [
    { label: 'Graduation', checked: false },
    { label: 'PG', checked: false },
    { label: 'Diploma', checked: false }
  ];

  // Notice Period options
  noticeOptions = [
    { label: 'Immediate', checked: false },
    { label: '1 month', checked: false },
    { label: '3 months', checked: false }
  ];

  onCheckboxChange(option: any, category: string): void {
    option.checked = !option.checked;
  }

  onSave(): void {
    const selectedFilters = {
      experience: this.experienceOptions.filter(opt => opt.checked).map(opt => opt.label),
      type: this.typeOptions.filter(opt => opt.checked).map(opt => opt.label),
      education: this.educationOptions.filter(opt => opt.checked).map(opt => opt.label),
      notice: this.noticeOptions.filter(opt => opt.checked).map(opt => opt.label)
    };
    this.applyFilters.emit(selectedFilters);
    this.close.emit();
  }

  onCancel(): void {
    this.close.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}