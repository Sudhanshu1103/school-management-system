export interface SchoolEvent {
  _id?: string;
  title: string;
  description: string;
  shortDescription?: string;
  date: string | Date;
  location: string;
  image?: string;
  createdAt?: string;
}
