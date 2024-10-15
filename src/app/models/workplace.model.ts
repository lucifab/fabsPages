export interface Workplace {
    Id: number; 
    CompanyName: string;
    Title: string;
    StartedAt: Date;
    EndedAt: Date|null; 
    WorkImageUrl: string;
    WorkWebsite?: string;
  }