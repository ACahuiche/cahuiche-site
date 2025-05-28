import { Timestamp } from "@angular/fire/firestore";

export interface Post{
    id: string;
    title: string;
    bodyPost: string;
    publishedDate: Timestamp;
    lastModifyDate: Timestamp | null;
    isPublic: boolean | null;
    author?: string;
    userId: string;
  }

export type PostForm = Omit<Post, 'id' | 'userId' >;
export type PostSave = Omit<Post, 'id' >;