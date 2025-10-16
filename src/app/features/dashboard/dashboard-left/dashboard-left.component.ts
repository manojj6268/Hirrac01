import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-left',
  templateUrl: './dashboard-left.component.html',
  styleUrl: './dashboard-left.component.scss'
})
export class DashboardLeftComponent {
  
  // JSON data you provided (converted)
  data = {
    summary: [
      { label: 'Posted Jobs', value: 50 },
      { label: 'Applications', value: 150 },
      { label: 'Shortlisted', value: 100 },
      { label: 'Interview', value: 50 },
      { label: 'Hired', value: 2 },
      { label: 'Rejected', value: 50 }
    ],
    jobs: [
      { title: 'Product Designer', applications: 65, shortlisted: 50, interview: 30, hired: 0, rejected: 20 },
      { title: 'Java Developer', applications: 100, shortlisted: 65, interview: 10, hired: 1, rejected: 35 },
      { title: 'React Developer', applications: 20, shortlisted: 10, interview: 2, hired: 0, rejected: 15 },
      { title: 'Angular', applications: 150, shortlisted: 100, interview: 50, hired: 2, rejected: 150 },
      { title: 'Sr. UI/UX Designer', applications: 200, shortlisted: 20, interview: 5, hired: 0, rejected: 80 }
    ],
    interviews: [
      { name: 'Ravi Kumar', role: 'Software Engineer', type: 'Phone', time: '10:30 AM' },
      { name: 'Rahul Mehta', role: 'Data Analyst', type: 'In-Person', time: '12:00 PM' },
      { name: 'Vikram Singh', role: 'Project Coordinator', type: 'In-Person', time: '1:00 PM' },
      { name: 'Ananya Sharma', role: 'UI/UX Designer', type: 'In-Person', time: '11:30 AM (Tomorrow)' },
      { name: 'Priya Desai', role: 'QA Engineer', type: 'Phone', time: '1:30 PM (Tomorrow)' }
    ],
    recentSearch: {
      title: 'UI Designer',
      location: 'Orange, 1.5 Miles',
      criteria: 'UI Design, Interaction design, UX basics',
      timeAgo: '4d ago'
    }
  };

  // small helper values for top-left
  username = 'Yugendar';
  newApplicationsCount = 20;

}
