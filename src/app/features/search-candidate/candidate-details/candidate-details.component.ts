import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidateService, Candidate } from '../../../service/candidate.service';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent implements OnInit{
  
candidate: Candidate | null = null;
  activeTab: 'resume' | 'video' = 'resume';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      // In a real app, fetch candidate by ID
      // For now, we'll use mock data
      this.candidate = {
        id: +id,
        name: 'Nissa Milla',
        role: 'Lead UI Designer',
        location: 'Madhapur, Hyderabad',
        skills: ['UI/UX', 'Figma', 'React'],
        experience: '5+ years',
        salary: '$80k - $100k',
        availability: true,
        image: 'assets/images/candidate1.jpg',
        lastUpdated: '1 week ago',
        matchPercentage: 98,
        contacted: false,
        timeAtJob: '2 years',
        resumeUrl: 'https://example.com/resume1.pdf',
        status: 'Shortlisted'
      };
    }
  }

  setActiveTab(tab: 'resume' | 'video'): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/candidate-search/results']);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  }

  downloadResume(): void {
    if (this.candidate?.resumeUrl) {
      const link = document.createElement('a');
      link.href = this.candidate.resumeUrl;
      link.download = `${this.candidate.name}_resume.pdf`;
      link.click();
    }
  }

  toggleFavorite(): void {
    // Implement favorite toggle logic
    console.log('Toggle favorite for:', this.candidate?.name);
  }

  navigateToAdvancedFilters(): void {
    this.router.navigate(['/candidate-search/advanced']);
  }

  navigateToCandidateResults(): void {
    this.router.navigate(['/candidate-search/results']);
  }
}