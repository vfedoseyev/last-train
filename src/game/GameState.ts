import type { SceneId } from "../scenes/sceneTypes";
import type { ItemId } from "../inventory/inventoryTypes";
import type { StoryFlag } from "./storyFlags";

export interface DialogueState {
  dialogueId: string;
  currentNodeId: string;
}

// Каноническая форма — TECHNICAL ARCHITECTURE.md §5, плюс currentChapter/solvedPuzzles/seenDialogues
// (см. CLAUDE_CODE_PROMPT.md §9). ending и dialogueState не заполняются заранее, а вычисляются/
// устанавливаются по ходу игры (§158-159 TECHNICAL ARCHITECTURE.md).
export interface GameState {
  currentSceneId: SceneId;
  currentChapter: number;

  inventory: ItemId[];

  flags: Partial<Record<StoryFlag, boolean>>;
  variables: Record<string, number | string>;

  completedQuests: string[];
  activeQuests: string[];

  discoveredClues: string[];
  solvedPuzzles: string[];
  seenDialogues: string[];

  dialogueState: DialogueState | null;
  activePuzzleId: string | null;

  gameTime: number;
  ending: string | null;
}

export const initialGameState: GameState = {
  currentSceneId: "home",
  currentChapter: 0,

  inventory: [],

  flags: {},
  variables: {},

  completedQuests: [],
  activeQuests: [],

  discoveredClues: [],
  solvedPuzzles: [],
  seenDialogues: [],

  dialogueState: null,
  activePuzzleId: null,

  gameTime: 0,
  ending: null,
};
