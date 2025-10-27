import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CandidateSearchService, CandidateItem } from '../candidate-search.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent implements OnInit {
  searchForm!: FormGroup;

  candidates$ = this.searchSvc.pagedCandidates$;
  totalCount$ = this.searchSvc.totalCount$;
  pageCount$ = this.searchSvc.pageCount$;

  selectedCandidate: CandidateItem | null = null;
  selectedCandidateIndex: number | null = null;

  currentPage = 1;
  pageCountNumber = 1;
  pages: number[] = [1];
  visiblePages: number[] = [1];

  totalCountNumber = 0;

  constructor(private fb: FormBuilder, public searchSvc: CandidateSearchService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      distanceKm: [10],
      excludeContacted: ['all'],
      timeAtJob: ['all'],
      availableImmediately: [false],
      skillFilters: [[]],
      skills: [''],
      jobTitle: [''],
      location: [''],
    });

    // Debounced live filters -> service
    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
      this.searchSvc.setQuery(val);
    });

    // Build pages when pageCount changes
    this.pageCount$.subscribe(n => {
      this.pageCountNumber = n;
      this.pages = Array.from({ length: n }, (_, i) => i + 1);
      if (this.currentPage > n) this.setPage(n);
      this.updateVisiblePages();
    });

    this.totalCount$.subscribe(t => this.totalCountNumber = t || 0);
  }

  toggleSkill(skill: string, checked: boolean): void {
    const selected = (this.searchForm.value.skillFilters as string[]) || [];
    const set = new Set(selected);
    if (checked) set.add(skill); else set.delete(skill);
    this.searchForm.patchValue({ skillFilters: Array.from(set) });
  }

  selectCandidate(index: number, item: CandidateItem): void {
    this.selectedCandidateIndex = index;
    this.selectedCandidate = item;
  }

  prevPage(): void {
    if (this.currentPage <= 1) return;
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    if (this.currentPage >= this.pageCountNumber) return;
    this.setPage(this.currentPage + 1);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.searchSvc.setPage(page);
    this.updateVisiblePages();
  }

  trustedUrl(url?: string | null): SafeResourceUrl | null {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  get rangeText(): string {
    const size = this.searchSvc.getPageSizeSnapshot();
    if (!this.totalCountNumber || this.totalCountNumber <= 0) return 'Showing 0–0 of 0 candidates';
    const start = (this.currentPage - 1) * size + 1;
    const end = Math.min(this.currentPage * size, this.totalCountNumber);
    return `Showing ${start}–${end} of ${this.totalCountNumber} candidates`;
  }

  private updateVisiblePages(): void {
    const total = this.pageCountNumber || 1;
    const current = Math.min(Math.max(1, this.currentPage), total);
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    start = Math.max(1, end - 4);
    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
