import { Timestamp } from "@angular/fire/firestore";

export interface ErrorLog {
  timestamp: Timestamp;
  element: string;
  errorMessage: string;
  AISolution?: string;
  userId?: string;
}