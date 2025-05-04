
import { Incident } from "./types";

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination issues. The bias was detected during a routine audit of recommendation patterns across different user groups.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information for handling hazardous materials in a laboratory setting. This could have led to dangerous situations if the information had been followed without verification by domain experts.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata during conversations. While no private information was revealed, this indicates a potential vulnerability that could be exploited in future interactions.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Autonomous Vehicle Navigation Error",
    description: "AI system in autonomous vehicle misinterpreted road signs under specific weather conditions, potentially causing navigation issues. The error was identified in simulation before any real-world incidents occurred.",
    severity: "Medium",
    reported_at: "2025-02-28T11:45:00Z"
  },
  {
    id: 5,
    title: "Medical Diagnosis Inaccuracy",
    description: "AI diagnostic tool showed reduced accuracy for specific patient demographics, potentially leading to missed diagnoses. This pattern was caught during a comprehensive review of the system's performance across diverse patient groups.",
    severity: "High",
    reported_at: "2025-03-25T16:20:00Z"
  }
];
