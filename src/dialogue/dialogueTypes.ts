import type { Condition } from "../utils/conditions";
import type { GameEffect } from "../game/gameEffects";

export interface DialogueChoice {
  id: string;
  text: string;
  nextNodeId: string;
  conditions?: Condition[];
  effects?: GameEffect[];
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  next?: string;
  choices?: DialogueChoice[];
  conditions?: Condition[];
  effects?: GameEffect[];
}

// Первый узел любого диалога всегда имеет id "start" — см. TECHNICAL ARCHITECTURE.md §31.
export interface Dialogue {
  id: string;
  startNodeId: "start";
  nodes: DialogueNode[];
}
