import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Job {
  id: string;
  title: string;
  datePosted: string;
  status: 'Open' | 'Paused' | 'Closed';
  ownerInitials: string;
  location?: string;
  description?: string;
  benefits?: string[];
  timeline?: string;
  openings?: string;
  type?: string;
  pay?: string;
}

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  jobs: Job[] = [];
  selectedJobs = new Set<string>();
  openMenuId: string | null = null;

  // modal state
  isModalOpen = false;
  selectedJob: Job | null = null;

  searchQuery = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Sample data; replace by API in real app
    this.jobs = [
      {
        id: '1',
        title: 'UI/UX Designer',
        datePosted: '20th Sep, 2025',
        status: 'Open',
        ownerInitials: 'YU',
        location: 'Madhapur, Hyderabad 500081',
        description: 'Looking for the Key Account Manager for Jalandhar location. Looking for the Key Account Manager for Jalandhar location. Designation:- Key Account Manager Experience:- 5-7 years & at least 2 years in ISSalary:- Salary will not be a constraint for the right candidate.',
        benefits: ['Health insurance', 'Provident Fund', 'Cell phone reimbursement', 'Paid sick time'],
        timeline: '10 Days',
        openings: '03',
        type: 'Full Time',
        pay: '₹10,00,000/per year'
      },
      {
        id: '2',
        title: 'React',
        datePosted: '21th Sep, 2025',
        status: 'Paused',
        ownerInitials: 'YU',
        location: 'Madhapur, Hyderabad 500081',
        description: 'React developer role. Work with front-end team.',
        benefits: ['PF', 'Health checkup'],
        timeline: '15 Days',
        openings: '02',
        type: 'Full Time',
        pay: '₹8,00,000/per year'
      },
      {
        id: '3',
        title: 'UI/UX Designer',
        datePosted: '22th Sep, 2025',
        status: 'Closed',
        ownerInitials: 'YU',
        location: 'Madhapur, Hyderabad 500081',
        description: 'Another UI/UX role.',
        benefits: ['Gym reimbursement'],
        timeline: '7 Days',
        openings: '01',
        type: 'Contract',
        pay: '₹6,00,000/per year'
      },
      // add more if needed
    ];
  }

  onSearch() {
    // For demo: just console.log; replace with filter or navigate as needed
    console.log('Search for', this.searchQuery);
  }

  onJobSelect(jobId: string) {
    if (this.selectedJobs.has(jobId)) {
      this.selectedJobs.delete(jobId);
    } else {
      this.selectedJobs.add(jobId);
    }
  }

  toggleSelectAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) {
      this.jobs.forEach(j => this.selectedJobs.add(j.id));
    } else {
      this.selectedJobs.clear();
    }
  }

  // Header checkbox: select all and navigate to first job details
  onSelectAllAndGo(e: Event) {
    this.toggleSelectAll(e);
    const checked = (e.target as HTMLInputElement).checked;
    if (checked && this.jobs.length > 0) {
      const firstId = this.jobs[0].id;
      this.router.navigate(['/jobs/details', firstId]);
    }
  }

  toggleMenu(jobId: string, event: MouseEvent) {
    // stop propagation to avoid other row click handlers
    event.stopPropagation();
    // toggle open menu
    this.openMenuId = this.openMenuId === jobId ? null : jobId;
  }

  closeMenu() {
    this.openMenuId = null;
  }

  // Click outside handling: close menu if open
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // If click is outside any .context-menu or .more-icon, close menu
    const target = event.target as HTMLElement;
    if (!target.closest('.context-menu') && !target.closest('.more-icon')) {
      this.closeMenu();
    }
  }

  // Keyboard: Escape closes modal and menu
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(evt: KeyboardEvent) {
    if (this.isModalOpen) {
      this.closeModal();
    } else if (this.openMenuId) {
      this.closeMenu();
    }
  }

  // Menu actions
  onView(job: Job, event?: MouseEvent) {
    if (event) event.stopPropagation();
    // Open inline modal preview
    this.closeMenu();
    this.selectedJob = job;
    this.isModalOpen = true;
  }

  onEdit(job: Job, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.closeMenu();
    // navigate to edit page
    this.router.navigate(['/jobs/edit', job.id]);
  }

  onDelete(job: Job, event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.closeMenu();
    const confirmed = confirm(`Are you sure you want to delete "${job.title}"?`);
    if (confirmed) {
      // remove from list; replace with API call if needed
      this.jobs = this.jobs.filter(j => j.id !== job.id);
      // also remove selection
      this.selectedJobs.delete(job.id);
    }
  }

  // Modal helpers
  closeModal() {
    this.isModalOpen = false;
    this.selectedJob = null;
  }

  confirmAndPost(job: Job | null) {
    if (!job) return;
    alert(`Confirmed and posted job "${job.title}".`);
    this.closeModal();
  }

  // Helper to fetch a job by id for context menu actions
  getJobById(id: string): Job | undefined {
    return this.jobs.find(j => j.id === id);
  }

  // Row click: open preview modal for job id
  openPreviewById(id: string) {
    const job = this.getJobById(id);
    if (job) {
      this.selectedJob = job;
      this.isModalOpen = true;
    }
  }

  
}


