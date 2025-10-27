import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesContainerComponent } from './messages-container/messages-container.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessagesPanelComponent } from './messages-panel/messages-panel.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  declarations: [
    MessagesContainerComponent,
    MessagesListComponent,
    MessagesPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule,
  ],
  exports: [
    MessagesContainerComponent,
    MessagesListComponent,
    MessagesPanelComponent
  ]
})
export class MessagesModule {}
