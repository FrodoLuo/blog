
export interface IMedia {
  id: number;
  description: string;
  tag: 'cover' | 'standard' | 'rail';
  orderReference: number;
  created_at: string;
  updated_at: string;
  source: string;
}
