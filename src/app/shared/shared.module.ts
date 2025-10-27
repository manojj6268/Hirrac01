import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-setting/profile-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
   ProfileSettingsComponent,
   NotificationSettingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ProfileSettingsComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
