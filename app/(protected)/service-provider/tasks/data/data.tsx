import {
  IconArrowDown,
  IconArrowNarrowRight,
  IconArrowUp,
  IconCircleCheck,
  IconCircle,
  IconCircleX,
  IconHelpCircle,
  IconClock
} from "@tabler/icons-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: IconHelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: IconCircle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: IconClock,
  },
  {
    value: "done",
    label: "Done",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: IconArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: IconArrowNarrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: IconArrowUp,
  },
];
