export interface Post {
    Id: number; 
    Title: string;
    Content: string;
    AuthorName: string;
    AuthorId: number;
    CreatedAt: Date;
    UpdatedAt?: Date; 
    AuthorImageUrl: string;
  }