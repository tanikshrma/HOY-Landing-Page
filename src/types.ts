export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface LeadSubmission extends LeadFormData {
  id: string;
  submittedAt: string;
  dailySlotNumber: number;
}
