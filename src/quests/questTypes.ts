import type { Condition } from "../utils/conditions";

export interface QuestObjective {
  id: string;
  description: string;
  conditions: Condition[];
}

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
}
