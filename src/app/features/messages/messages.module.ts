import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesContainerComponent } from './messages-container/messages-container.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesPanelComponent } from './messages-panel/messages-panel.component';

@NgModule({
  declarations: [
    MessagesContainerComponent,
    MessagesListComponent,
    MessagesPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MessagesContainerComponent,
    MessagesListComponent,
    MessagesPanelComponent
  ]
})
export class MessagesModule {}
