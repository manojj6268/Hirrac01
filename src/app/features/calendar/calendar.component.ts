import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <h1>Calendar & Scheduling</h1>
      <div class="calendar-content">
        <div class="calendar-card">
          <h3>Interview Schedule</h3>
          <p>Schedule and manage candidate interviews</p>
        </div>
        <div class="calendar-card">
          <h3>Team Meetings</h3>
          <p>Plan and organize team meetings and reviews</p>
        </div>
        <div class="calendar-card">
          <h3>Deadlines</h3>
          <p>Track important recruitment deadlines and milestones</p>
        </div>
        <div class="calendar-card">
          <h3>Events</h3>
          <p>Manage recruitment events and job fairs</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 30px;
    }
    
    .calendar-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .calendar-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .calendar-card h3 {
      color: #555;
      margin-bottom: 10px;
    }
    
    .calendar-card p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class CalendarComponent {

}

