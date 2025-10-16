import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-container">
      <h1>Analytics Dashboard</h1>
      <div class="analytics-content">
        <div class="analytics-card">
          <h3>Job Performance</h3>
          <p>Track job posting performance and application rates</p>
        </div>
        <div class="analytics-card">
          <h3>Candidate Metrics</h3>
          <p>Monitor candidate engagement and conversion rates</p>
        </div>
        <div class="analytics-card">
          <h3>Hiring Trends</h3>
          <p>Analyze hiring patterns and seasonal trends</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #333;
      margin-bottom: 30px;
    }
    
    .analytics-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .analytics-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border: 1px solid #e0e0e0;
    }
    
    .analytics-card h3 {
      color: #555;
      margin-bottom: 10px;
    }
    
    .analytics-card p {
      color: #666;
      line-height: 1.5;
    }
  `]
})
export class AnalyticsComponent {

}

