import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-setting/profile-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
   ProfileSettingsComponent,
   NotificationSettingComponent,
   SideNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ProfileSettingsComponent,
    SideNavComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class SharedModule { }
