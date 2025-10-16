import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-messaging',
  standalone: true,
  template: `
    <div class="modal">
      <div class="modal-content">
        <h2>Send Message</h2>
        <button (click)="onClose()">Close</button>
        <button (click)="send()">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
    .modal-content { background: white; padding: 20px; border-radius: 8px; }
  `]
})
export class MessagingComponent {
  @Output() close = new EventEmitter<void>();
  @Output() sendMessage = new EventEmitter<any>();

  send() {
    this.sendMessage.emit({/* message data */});
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
