import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-setting/profile-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { MatIconModule } from '@angular/material/icon';
import { SupportComponent } from './support/support.component';
import { CompanySettingComponent } from './company-setting/company-setting.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
   ProfileSettingsComponent,
   NotificationSettingComponent,
   SupportComponent,
   CompanySettingComponent,
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
    NotificationSettingComponent,
    SupportComponent,
    CompanySettingComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
