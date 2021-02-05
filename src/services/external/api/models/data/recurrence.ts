export type Recurrence = "oneTime" | "daily" | "weekly" | "biweekly" | "monthly" | "yearly";

interface RecurrenceLabel {
    [label: string]: Recurrence;
}

export const RecurrenceLabels: RecurrenceLabel = {
    "One Time": "oneTime",
    "Daily": "daily",
    "Weekly": "weekly",
    "Biweekly": "biweekly",
    "Monthly": "monthly",
    "Yearly": "yearly"
}

export const RecurrenceMap = {
    "oneTime": "One Time",
    "daily": "Daily",
    "weekly": "Weekly",
    "biweekly": "Biweekly",
    "monthly": "Monthly",
    "yearly": "Yearly"
}