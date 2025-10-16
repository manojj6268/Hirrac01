import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isProfileMenuOpen = false;

  constructor(private router: Router, private elRef: ElementRef) {}

  


  // Toggle dropdown menu
  toggleProfileMenu(){
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log('Profile menu toggled:', this.isProfileMenuOpen);
  }

  // // Navigate to profile
  goToProfile(): void {
    console.log('Navigating to profile...');
    this.isProfileMenuOpen = false;
    // adjust route to whatever your app uses for profile settings
    this.router.navigate(['/profile-setting']).catch(err => console.error(err));
  }

  // Navigate to messages
  goToMessages(): void {
    console.log('Navigating to messages...');
    this.router.navigate(['/messages']).catch(err => console.error(err));
  }

  // Logout action
  performLogout(): void {
    console.log('Logging out...');
    this.isProfileMenuOpen = false;

    this.router.navigate(['/login']).catch(err => console.error(err));
  }

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: Event): void {
    // if click happened outside this component element, close menu
    const clickedInside = this.elRef.nativeElement.contains(event.target as Node);
    if (!clickedInside && this.isProfileMenuOpen) {
      console.log('Clicked outside, closing menu');
      this.isProfileMenuOpen = false;         // <-- close (not toggle)
    }
   }

 }

