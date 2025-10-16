import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="candidates-container">
      <h1>Candidates Management</h1>
      <div class="candidates-content">
        <div class="candidates-card">
          <h3>All Candidates</h3>
          <p>View and manage all candidate profiles</p>
        </div>
        <div class="candidates-card">
          <h3>Shortlisted</h3>
          <p>Review candidates who have been shortlisted</p>
        </div>
        <div class="candidates-card">
          <h3>Interviews</h3>
          <p>Schedule and manage candidate interviews</p>
        </div>
        <div class="candidates-card">
          <h3>Hired</h3>
          <p>Track successfully hired candidates</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .candidates-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 30px;
    }
    
    .candidates-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .candidates-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .candidates-card h3 {
      color: #555;
      margin-bottom: 10px;
    }
    
    .candidates-card p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class CandidatesComponent {

}

