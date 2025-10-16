import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenedSubject = new BehaviorSubject<boolean>(true);
  isOpened$ = this.isOpenedSubject.asObservable();

  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  get isOpened(): boolean {
    return this.isOpenedSubject.value;
  }

  get isCollapsed(): boolean {
    return this.isCollapsedSubject.value;
  }

  toggle(): void {
    this.isOpenedSubject.next(!this.isOpenedSubject.value);
  }

  toggleCollapse(): void {
    this.isCollapsedSubject.next(!this.isCollapsedSubject.value);
  }

  constructor() { }
}
