import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="team-container">
      <h1>Team Management</h1>
      <div class="team-content">
        <div class="team-card">
          <h3>Team Members</h3>
          <p>Manage your recruitment team members and their roles</p>
        </div>
        <div class="team-card">
          <h3>Permissions</h3>
          <p>Configure team member permissions and access levels</p>
        </div>
        <div class="team-card">
          <h3>Collaboration</h3>
          <p>Track team collaboration on recruitment activities</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 30px;
    }
    
    .team-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .team-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .team-card h3 {
      color: #555;
      margin-bottom: 10px;
    }
    
    .team-card p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class TeamComponent {

}

