export interface Post {
    id: number; 
    title: string;
    content: string;
    authorName: string;
    authorId: number;
    createdAt: Date;
    updatedAt?: Date; 
    authorImageUrl: string;
    isActive: boolean;
  }