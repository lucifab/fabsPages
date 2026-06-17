export interface Post {
    id: number; 
    title: string;
    content: string;
    authorName: string;
    authorId?: number;
    cognitoId?: string;
    createdAt: Date;
    updatedAt?: Date; 
    authorImageUrl: string;
    isActive: boolean;
  }

export interface PostRequest {
    title: string;
    content: string;
  }

export interface PostsPageRequest {
    pageSize?: number;
    cursorId?: number;
  }
