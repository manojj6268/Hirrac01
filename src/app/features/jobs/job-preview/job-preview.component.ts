import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrl: './job-preview.component.scss'
})
export class JobPreviewComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    // Emit close so parent can handle overlay close
    this.close.emit();
  }

  toggleBenefit(event: Event) {
    const el = event.currentTarget as HTMLElement;
    if (el) {
      el.classList.toggle('selected');
    }
  }
}
