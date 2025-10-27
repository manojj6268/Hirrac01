import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Candidate {
  id: number
  name: string
  location: string
  experience: string
  years: string
  skills: string[]
  status: string
  avatar: string
  email?: string
  phone?: string
  job?: string
  title?: string
  selected?: boolean 
};

interface interviewFormData {
  duration: string;
  format: "phone" | "in-person"
  message: string
  date: string
  time: string
  timeZone: string
};


@Component({
  selector: 'app-applied-candidate-list',
  templateUrl: './applied-candidate-list.component.html',
  styleUrls: ['./applied-candidate-list.component.scss']
})

export class AppliedCandidateListComponent implements OnInit {
  candidates: Candidate[] = []
  selectedCandidate: Candidate | null = null
  isHeaderChecked = false;
  isModalOpen = false
  openDropdownId: number | null = null
  isInterviewModalOpen = false;
  isMessageModalOpen = false;
  isVideoModalOpen = false; 

  messageText = '';

  activeTab = "resume"
  titleFilter = ""
  locationFilter = ""
  statusFilter = ""
  searchQuery = ""



 interviewForm: interviewFormData = {
  duration: '',
  format: 'phone', // 'phone' or 'in-person'
  message: '',
  date: '',
  time: '',
  timeZone: ''
};

  ngOnInit() {
    this.candidates = [
      {
        id: 1,
        name: "Anusha",
        location: "New Hamption, New York",
        experience: "UI/UX designer",
        years: "5yr",
        skills: ["UI/UX Design", "UX Design", "Interface Design"],
        status: "Status",
        avatar: "A",
        title: "UI/UX Designer",
      },
      {
        id: 2,
        name: "Babu",
        location: "New Hamption, New York",
        experience: "UI/UX designer",
        years: "5yr",
        skills: ["UI/UX Design", "UX Design", "Interface Design"],
        status: "shortlisted",
        avatar: "B",
        title: "UI/UX Designer",
      },
      {
        id: 3,
        name: "Chandra",
        location: "New Hamption, New York",
        experience: "UI/UX designer",
        years: "5yr",
        skills: ["UI/UX Design", "UX Design", "Interface Design"],
        status: "Interview",
        avatar: "C",
        title: "UI/UX Designer",
      },
      {
        id: 4,
        name: "Kiran",
        location: "New Hamption, New York",
        experience: "UI/UX designer",
        years: "5yr",
        skills: ["UI/UX Design", "UX Design", "Interface Design"],
        status: "Rejected",
        avatar: "K",
        title: "UI/UX Designer",
      },
      {
        id: 5,
        name: "Raju",
        location: "New Hamption, New York",
        experience: "UI/UX designer",
        years: "5yr",
        skills: ["UI/UX Design", "UX Design", "Interface Design"],
        status: "Status",
        avatar: "R",
        title: "UI/UX Designer",
      },
    ]
  }

  get selectedCount(): number {
  return this.candidates.filter(c => !!(c as any).selected).length;
}

  toggleHeaderCheckbox() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.candidates = this.candidates.map(c => ({ ...c, selected: this.isHeaderChecked }));
  }

  /** Bulk action helpers (implement as needed) */
  onBulkSetStatus(status: string) {
    if (!status) return;
    this.candidates = this.candidates.map(c => (c as any).selected ? { ...c, status } : c);
    console.log('Bulk set status ->', status);
  }

  onBulkSendMessage() {
  // For demonstration: open message modal for the first selected candidate, or handle multi-select
  const first = this.candidates.find(c => (c as any).selected);
  if (first) {
    this.selectedCandidate = first;
    this.isMessageModalOpen = true;
  }
}
onBulkDownload() {
  const selected = this.candidates.filter(c => (c as any).selected);
  console.log('Bulk download for:', selected.map(s => s.name));
}

onBulkDelete() {
  const selected = this.candidates.filter(c => (c as any).selected);
  if (!selected.length) return;
  // remove selected from candidates
  this.candidates = this.candidates.filter(c => !(c as any).selected);
  // when done, hide bulk toolbar
  this.isHeaderChecked = false;
}
  onViewClick(candidate: Candidate) {
    this.selectedCandidate = candidate
    this.isModalOpen = true
  }

  onRowClick(candidate: Candidate) {
    this.onViewClick(candidate)
  }
  onCloseModal() {
    this.isModalOpen = false
    this.selectedCandidate = null
  }

  toggleDropdown(candidateId: number) {
    this.openDropdownId = this.openDropdownId === candidateId ? null : candidateId
  }

  onView(candidate: Candidate) {
    console.log("View clicked for:", candidate.name)
    this.onViewClick(candidate)
    this.openDropdownId = null
  }

  onDownload(candidate: Candidate) {
    console.log("Download clicked for:", candidate.name)
    this.openDropdownId = null
  }

  onDelete(candidate: Candidate) {
    console.log("Delete clicked for:", candidate.name)
    this.candidates = this.candidates.filter((c) => c.id !== candidate.id)
    this.openDropdownId = null
  }

  // <CHANGE> Added search functionality to filter candidates by name
  onSearch() {
    console.log("Search for:", this.searchQuery)

    if (this.searchQuery.trim() === "") {
      // <CHANGE> If search is empty, reset to show all candidates
      this.candidates = [
        // ... all original candidates ...
      ]
    } else {
      // <CHANGE> Filter candidates by name (case-insensitive)
      this.candidates = this.candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  }

  // <CHANGE> Added onToggleStar method for star button
  onToggleStar() {
    console.log("Star toggled for:", this.selectedCandidate?.name)
  }

  // <CHANGE> Added onCopyEmail method with clipboard functionality
  onCopyEmail() {
    const email = "ben_alter@hotmail.com"
    navigator.clipboard.writeText(email)
    console.log("Email copied:", email)
  }

  // <CHANGE> Added onCopyPhone method with clipboard functionality
  onCopyPhone() {
    const phone = "+1-970-333-3833"
    navigator.clipboard.writeText(phone)
    console.log("Phone copied:", phone)
  }

  // <CHANGE> Added onStatusCheck method for status check button
  onStatusCheck() {
    console.log("Status checked for:", this.selectedCandidate?.name)
  }

  // <CHANGE> Added onStatusCross method for status reject button
  onStatusCross() {
    console.log("Status rejected for:", this.selectedCandidate?.name)
  }

  // <CHANGE> Added onCreateInterview method for interview button
  onCreateInterview() {
    console.log("Create interview for:", this.selectedCandidate?.name)
    this.isInterviewModalOpen = true
  }

  onCloseInterviewModal() {
    this.isInterviewModalOpen = false
    this.resetInterviewForm()
  }
  resetInterviewForm() {
    this.interviewForm = {
      duration: "",
      format: "phone",
      message: "",
      date: "",
      time: "",
      timeZone: "",
    }
  }
  onSendInterviewRequest() {
    console.log("Interview request sent:", this.interviewForm)
    console.log("For candidate:", this.selectedCandidate?.name)
    // Add your API call here
    this.onCloseInterviewModal()
  }
  // <CHANGE> Added onSendMessage method for message button
  onSendMessage() {
    if(this.selectedCandidate){
      console.log("Opening message modal for:", this.selectedCandidate.name)
      this.isMessageModalOpen = true
    }else{
        console.log("no candidate selected")
    }
  }

    closeMessageModal() {
     this.isMessageModalOpen = false;
      this.resetMessageForm();
     console.log("Message modal closed");
  }

  resetMessageForm() {
       this.messageText = ""
  }

  sendMessage() {
    if (this.messageText.trim()) {
      console.log("Message sent to:", this.selectedCandidate?.name);
      console.log("Message content:", this.messageText);
      // Add your API call here

      const messagePayload = {
        candidateId: this.selectedCandidate?.id,
        candidateName: this.selectedCandidate?.name,
        message: this.messageText,
        timestamp: new Date(),
      }

      console.log("[v0] Message payload:", messagePayload)
      
      this.closeMessageModal();
    }else {
      console.log('Message is empty, cannot send');
    }
  }

  // <CHANGE> Added onDownloadResume method for download button
  onDownloadResume() {
    console.log("Download resume for:", this.selectedCandidate?.name)
  }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "shortlisted":
        return "status-shortlisted"
      case "interview":
        return "status-interview"
      case "rejected":
        return "status-rejected"
      default:
        return "status-default"
    }
  }
   openVideoModal() {
    this.isVideoModalOpen = true
    console.log("[v0] Video modal opened for:", this.selectedCandidate?.name)
  }

  closeVideoModal() {
    this.isVideoModalOpen = false
    console.log("[v0] Video modal closed")
  }
}
