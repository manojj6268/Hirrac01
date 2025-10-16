import { Component } from '@angular/core';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent {
  selectedTab = 'upcoming';
  
  interviews = [
    {
      id: 1,
      title: 'Phone Interview',
      candidateName: 'Mahesh Sriramula',
      date: '10 Sept',
      time: '9 to 9:30 am (IST)',
      role: 'UI/UX Designer',
      type: 'phone',
      selected: true
    },
    {
      id: 2,
      title: 'Phone Interview',
      candidateName: 'Mahesh Sriramula',
      date: '10 Sept',
      time: '9 to 9:30 am (IST)',
      role: 'UI/UX Designer',
      type: 'phone',
      selected: false
    }
  ];

  selectedInterview = {
    title: 'Phone call with Mahesh Sriramula',
    proposedTime: 'Time proposed for Wednesday 10 September, 2025 from 9 to 9:30 am (IST)',
    notes: ''
  };

  onTabChange(tab: string) {
    this.selectedTab = tab;
  }

  onInterviewSelect(interview: any) {
    this.interviews.forEach(i => i.selected = false);
    interview.selected = true;
    this.selectedInterview = {
      title: `Phone call with ${interview.candidateName}`,
      proposedTime: `Time proposed for Wednesday 10 September, 2025 from 9 to 9:30 am (IST)`,
      notes: ''
    };
  }

  onReschedule() {
    console.log('Reschedule clicked');
  }

  onCancel() {
    console.log('Cancel clicked');
  }

  onNotesChange(notes: string) {
    this.selectedInterview.notes = notes;
  }
}

