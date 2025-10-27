import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, firstValueFrom } from 'rxjs';

export interface SearchQuery {
  jobTitle?: string;
  skills?: string;
  location?: string;
  distanceKm?: number;
  excludeContacted?: 'all' | 'contacted' | 'not_contacted';
  timeAtJob?: 'all' | '<1' | '1-3' | '>3';
  availableImmediately?: boolean;
  skillFilters?: string[];
}

export interface CandidateItem {
  id: string;
  name: string;
  lastUpdatedWeeks: number;
  location: string;
  role: string;
  match: number;
  contacted?: boolean;
  timeAtJob?: number; // years
  skills?: string[];
  available?: boolean;
  resumeUrl?: string;
  resumeText?: string;
}

@Injectable({ providedIn: 'root' })
export class CandidateSearchService {
  private query$ = new BehaviorSubject<SearchQuery>({});
  private allCandidates$ = new BehaviorSubject<CandidateItem[]>([]);
  private initialized = false;

  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(10);
  readonly pageSizeObs$ = this.pageSize$.asObservable();
  readonly loading$ = new BehaviorSubject<boolean>(true);

  // public streams
  readonly filteredCandidates$ = combineLatest([
    this.allCandidates$,
    this.query$,
  ]).pipe(
    map(([list, q]) => this.applyFilters(list, q))
  );

  readonly pagedCandidates$ = combineLatest([
    this.filteredCandidates$,
    this.page$,
    this.pageSize$,
  ]).pipe(
    map(([list, page, size]) => {
      const start = (page - 1) * size;
      return list.slice(start, start + size);
    })
  );

  readonly totalCount$ = this.filteredCandidates$.pipe(map(list => list.length));
  readonly pageCount$ = combineLatest([this.totalCount$, this.pageSize$]).pipe(
    map(([total, size]) => Math.max(1, Math.ceil(total / size)))
  );

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    if (this.initialized) return;
    try {
      this.loading$.next(true);
      const data = await firstValueFrom(this.http.get<CandidateItem[]>('/assets/candidates.json'));
      this.allCandidates$.next(data || []);
      this.initialized = true;
    } catch {
      // fallback to inline mock if fetch fails
      this.allCandidates$.next(this.mockData());
      this.initialized = true;
    } finally {
      this.loading$.next(false);
    }
  }

  setQuery(partial: Partial<SearchQuery>) {
    this.query$.next({ ...this.query$.value, ...partial });
    this.setPage(1);
  }

  getQuerySnapshot(): SearchQuery { return this.query$.value; }

  setPage(page: number) { this.page$.next(page); }
  setPageSize(size: number) { this.pageSize$.next(size); this.setPage(1); }
  getPageSizeSnapshot(): number { return this.pageSize$.value; }

  getById(id: string) {
    return this.allCandidates$.value.find(c => c.id === id) || null;
  }

  // Filtering logic
  private applyFilters(list: CandidateItem[], q: SearchQuery): CandidateItem[] {
    const term = (q.jobTitle || q.skills || '').toLowerCase();
    const location = (q.location || '').toLowerCase();

    return list.filter(c => {
      // text term across name, role, skills
      if (term) {
        const hay = `${c.name} ${c.role} ${(c.skills || []).join(' ')}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }

      // location contains
      if (location) {
        if (!c.location.toLowerCase().includes(location)) return false;
      }

      // distance mock: if <=10km only allow locations containing 'Madhapur' or 'Gachibowli'
      if (q.distanceKm && q.distanceKm <= 10) {
        const near = /(madhapur|gachibowli)/i.test(c.location);
        if (!near) return false;
      }

      // contacted filter
      if (q.excludeContacted === 'contacted' && !c.contacted) return false;
      if (q.excludeContacted === 'not_contacted' && c.contacted) return false;

      // time at job buckets
      if (q.timeAtJob && q.timeAtJob !== 'all') {
        const yrs = c.timeAtJob ?? 0;
        if (q.timeAtJob === '<1' && !(yrs < 1)) return false;
        if (q.timeAtJob === '1-3' && !(yrs >= 1 && yrs <= 3)) return false;
        if (q.timeAtJob === '>3' && !(yrs > 3)) return false;
      }

      // availability immediate: accept candidate.available === true or skills include 'available'
      if (q.availableImmediately) {
        const available = (c as any).available === true || (c.skills || []).includes('available');
        if (!available) return false;
      }

      // skill filters: all of selected must be present
      if (q.skillFilters && q.skillFilters.length) {
        const skillSet = new Set((c.skills || []).map(s => s.toLowerCase()));
        const all = q.skillFilters.every(s => skillSet.has(s.toLowerCase()));
        if (!all) return false;
      }
      return true;
    });
  }

  // Mock dataset
  private mockData(): CandidateItem[] {
    const base: CandidateItem[] = [
      { id: '1', name: 'Nissa Milla', lastUpdatedWeeks: 1, location: 'Madhapur, Hyderabad', role: 'Lead UI Designer', match: 98, contacted: false, timeAtJob: 2, skills: ['UI','UX','Figma','available'] },
      { id: '2', name: 'Darlene Robertson', lastUpdatedWeeks: 1, location: 'Madhapur, Hyderabad', role: 'Lead UI Designer', match: 98, contacted: true, timeAtJob: 4, skills: ['UI','React','Figma'] },
      { id: '3', name: 'Jenny Wilson', lastUpdatedWeeks: 2, location: 'Gachibowli, Hyderabad', role: 'Senior UX Designer', match: 95, contacted: false, timeAtJob: 1, skills: ['UX','Figma','Angular'] },
      { id: '4', name: 'Jacob Jones', lastUpdatedWeeks: 2, location: 'Kondapur, Hyderabad', role: 'UI/UX Designer', match: 92, contacted: false, timeAtJob: 0.5, skills: ['UI','UX','available'] },
    ];
    // Repeat to have more items
    return base.concat(base.map((c, i) => ({ ...c, id: (10 + i).toString(), name: c.name + ' Jr.' })));
  }
}
