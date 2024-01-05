export type ActivityDirection = "inbound" | "outbound";
export type ActivityCallType = "missed" | "answered" | "voicemail";

export interface IActivity {
  direction: ActivityDirection;
  from: number;
  to: number;
  via: number;
  duration: number;
  call_type: ActivityCallType;
  is_archived: boolean;
  readonly id: string;
  created_at: string;
}
