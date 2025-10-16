// src/app/features/messages/messages-list/messages-list.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent {
  @Output() conversationSelected = new EventEmitter<any>();

  searchText = '';
  selectedConvo: any = null;

  conversations = [
    { id: 1, name: 'Mahesh Sriramula', role: 'UI/UX Designer', date: 'Sep 10', location: 'Madhapur, Hyderabad' },
    { id: 2, name: 'Anita Kapoor', role: 'Frontend Developer', date: 'Sep 09', location: 'Delhi' },
    { id: 3, name: 'Ravi Kumar', role: 'Backend Developer', date: 'Sep 07', location: 'Bengaluru' }
  ];

  selectConversation(convo: any): void {
    this.selectedConvo = convo;
    this.conversationSelected.emit(convo);
  }

  get filteredConversations() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) { return this.conversations; }
    return this.conversations.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q) ||
      (c.location && c.location.toLowerCase().includes(q))
    );
  }

  initials(name: string) {
    return name ? name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : '';
  }
}

