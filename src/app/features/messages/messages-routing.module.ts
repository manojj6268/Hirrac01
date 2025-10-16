import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesContainerComponent } from './messages-container/messages-container.component';

const routes: Routes = [
  { path: '', component: MessagesContainerComponent } // default route for /messages
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}
