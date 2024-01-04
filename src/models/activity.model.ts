export interface IActivity {
  direction: string;
  from: number;
  to: number;
  via: number;
  duration: number;
  call_type: string;
  is_archived: boolean;
  readonly id: string;
  created_at: string;
}
