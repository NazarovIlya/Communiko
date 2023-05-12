import { UserProfile } from "./UserProfile";

export interface Activeness {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  pointTime: string;
  location: string;
  authorName?: string;
  isActual?: boolean;
  users?: UserProfile[]
}