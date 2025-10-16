// src/app/features/messages/messages-panel/messages-panel.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-messages-panel',
  templateUrl: './messages-panel.component.html',
  styleUrls: ['./messages-panel.component.scss']
})
export class MessagesPanelComponent implements OnChanges {
  @Input() selectedConversation: any = null;

  messages: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedConversation'] && this.selectedConversation) {
      // in a real app you'd fetch messages for selected conversation
      this.messages = [
        { from: 'me', text: `Hi ${this.selectedConversation.name}, Could you please share your portfolio?`, time: '10:35 AM' },
        { from: 'them', text: 'Sure — I will share it shortly.', time: '10:40 AM' }
      ];
    } else {
      this.messages = [];
    }
  }

  sendMessage(textarea: HTMLTextAreaElement) {
    const text = textarea.value.trim();
    if (!text) { return; }
    this.messages.push({ from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    textarea.value = '';
    setTimeout(() => { // mock reply
      this.messages.push({ from: 'them', text: 'Thanks — got it.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    }, 600);
  }
}


