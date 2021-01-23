export type Recurrence = "daily" | "weekly" | "biweekly" | "monthly" | "yearly";

interface RecurrenceLabel {
    [label: string]: Recurrence;
}

export const RecurrenceLabels: RecurrenceLabel = {
    "Daily": "daily",
    "Weekly": "weekly",
    "Biweekly": "biweekly",
    "Monthly": "monthly",
    "Yearly": "yearly"
}