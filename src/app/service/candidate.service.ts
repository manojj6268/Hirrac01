import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Candidate {
  id: number;
  name: string;
  role: string;
  location: string;
  skills: string[];
  experience: string;
  salary: string;
  availability: boolean;
  image: string;
  lastUpdated: string;
  matchPercentage: number;
  contacted: boolean;
  timeAtJob: string;
  resumeUrl: string; // Added for resume preview/download
  status?: string; // Added for status tracking
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  // Mock data for demonstration (in real app, this would come from backend)
  private mockCandidates: Candidate[] = [
    {
      id: 1,
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
      resumeUrl: 'https://example.com/resume1.pdf'
    },
    {
      id: 2,
      name: 'John Doe',
      role: 'UI Designer',
      location: 'Hyderabad, India',
      skills: ['Design', 'Prototyping', 'Adobe XD'],
      experience: '3-5 years',
      salary: '$60k - $80k',
      availability: false,
      image: 'assets/images/candidate2.jpg',
      lastUpdated: '2 days ago',
      matchPercentage: 85,
      contacted: true,
      timeAtJob: '1 year',
      resumeUrl: 'https://example.com/resume2.pdf'
    },
    // Add more mock candidates...
    ...Array.from({ length: 23 }, (_, i) => ({
      id: i + 3,
      name: `Candidate ${i + 3}`,
      role: 'UI Designer',
      location: 'Hyderabad, India',
      skills: ['UI/UX', 'React'],
      experience: '2-5 years',
      salary: '$50k - $70k',
      availability: true,
      image: 'assets/images/default-avatar.png',
      lastUpdated: '1 week ago',
      matchPercentage: 75 + Math.random() * 25,
      contacted: false,
      timeAtJob: '1-2 years',
      resumeUrl: `https://example.com/resume${i + 3}.pdf`
    }))
  ];

  constructor(private http: HttpClient) {}

  // Fetch candidates based on search parameters
  // In real app, this would call backend API
  searchCandidates(params: {
    jobTitle?: string;
    skills?: string;
    location?: string;
    distance?: number;
    excludeContacted?: string;
    timeAtJob?: string;
    showAvailableOnly?: boolean;
    selectedSkills?: string[];
  }): Observable<Candidate[]> {
    // Simulate API call with mock data and local filtering
    return of(this.mockCandidates).pipe(
      map(candidates => this.filterCandidates(candidates, params))
    );

    // Real implementation would be:
    // const httpParams = new HttpParams({ fromObject: params as any });
    // return this.http.get<Candidate[]>('/api/candidates/search', { params: httpParams });
  }

  private filterCandidates(candidates: Candidate[], params: any): Candidate[] {
    return candidates.filter(candidate => {
      // Job title filter (simple string match)
      if (params.jobTitle && !candidate.role.toLowerCase().includes(params.jobTitle.toLowerCase())) {
        return false;
      }

      // Skills filter
      if (params.skills) {
        const searchSkills = params.skills.toLowerCase().split(' ');
        const hasMatchingSkill = searchSkills.some((skill: string) =>
          candidate.skills.some(cSkill => cSkill.toLowerCase().includes(skill))
        );
        if (!hasMatchingSkill) return false;
      }

      // Location filter (simple string match)
      if (params.location && !candidate.location.toLowerCase().includes(params.location.toLowerCase())) {
        return false;
      }

      // Distance filter (mock - in real app, use geolocation)
      // For now, assume all are within range

      // Exclude contacted
      if (params.excludeContacted === 'Hide Contacted' && candidate.contacted) {
        return false;
      }

      // Time at job
      if (params.timeAtJob && params.timeAtJob !== 'All' && candidate.timeAtJob !== params.timeAtJob) {
        return false;
      }

      // Availability
      if (params.showAvailableOnly && !candidate.availability) {
        return false;
      }

      // Selected skills
      if (params.selectedSkills && params.selectedSkills.length > 0) {
        const hasSelectedSkill = params.selectedSkills.some((skill: string) =>
          candidate.skills.includes(skill)
        );
        if (!hasSelectedSkill) return false;
      }

      return true;
    });
  }
}
