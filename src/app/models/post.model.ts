export interface Post {
    id: number; 
    title: string;
    content: string;
    authorName: string;
    authorId?: number;
    cognitoId?: string;
    createdAt: Date;
    updatedAt?: Date; 
    publishedAt?: Date;
    authorImageUrl: string;
    isActive: boolean;
  }

export interface UpsertPostRequest {
    id?: number;
    title: string;
    content: string;
  }

export interface UpsertPostResponse {
    id: number;
  }

export interface PostsPageRequest {
    pageSize?: number;
    cursorId?: number;
  }
