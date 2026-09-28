// Sent on window whenever the shown time changes: the browser's clock ticking, or a time picked to preview.
export const CLOCK_CHANGE = "clock:change";

export type ClockChange = CustomEvent<{ hours: number; minutes: number }>;
