export interface Notice {
  _id?: string;
  title: string;
  description: string;
  category?: string;
  date?: string | Date;
  createdAt?: string;
}
