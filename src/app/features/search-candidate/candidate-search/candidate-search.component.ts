

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RecentSearch {
  skills: string;
  experience: string;
  location: string;
  date: Date;
}

@Component({
  selector: 'app-candidate-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss'],
})
export class CandidateSearchComponent {
  searchForm: FormGroup;
  showFilters = false;

  // 🧠 Dummy data for "Recently Searched"
  recentSearches: RecentSearch[] = [
    { skills: 'Angular Developer', experience: '3 Years', location: 'Hyderabad', date: new Date() },
    { skills: 'UI Designer', experience: '2 Years', location: 'Bangalore', date: new Date() },
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      skills: [''],
      experience: [''],
      location: [''],
      jobType: [''],
      salary: [''],
      qualification: [''],
    });
  }

  // 🔹 Toggle Advanced Filters Panel
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  // 🔹 Perform Search Action
  onSearch(): void {
    const formData = this.searchForm.value;

    // Add search to recent list
    this.recentSearches.unshift({
      skills: formData.skills,
      experience: formData.experience,
      location: formData.location,
      date: new Date(),
    });

    // Keep only latest 5 searches
    this.recentSearches = this.recentSearches.slice(0, 5);

    console.log('Searching with data:', formData);
  }
}