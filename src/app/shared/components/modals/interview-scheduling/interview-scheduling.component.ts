import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-interview-scheduling',
  standalone: true,
  template: `
    <div class="modal">
      <div class="modal-content">
        <h2>Schedule Interview</h2>
        <button (click)="onClose()">Close</button>
        <button (click)="schedule()">Schedule</button>
      </div>
    </div>
  `,
  styles: [`
    .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
    .modal-content { background: white; padding: 20px; border-radius: 8px; }
  `]
})
export class InterviewSchedulingComponent {
  @Output() close = new EventEmitter<void>();
  @Output() scheduled = new EventEmitter<any>();

  schedule() {
    this.scheduled.emit({/* interview data */});
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
