// src/app/features/messages/messages-container/messages-container.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.scss']
})
export class MessagesContainerComponent {
  selectedConversation: any = null;
  searchText: string = '';

  onConversationSelected(convo: any): void {
    this.selectedConversation = convo;
  }
}

