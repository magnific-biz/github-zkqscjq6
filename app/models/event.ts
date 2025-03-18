export interface Event {
  id?: number;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  location?: string;
  url?: string;
  user_id: string;
  created_at?: string;
}
