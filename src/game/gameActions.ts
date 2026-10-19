import type { ItemId } from "../inventory/inventoryTypes";
import type { StoryFlag } from "./storyFlags";
import type { SceneId } from "../scenes/sceneTypes";

// Экшены диспатча (императивные) — см. TECHNICAL ARCHITECTURE.md §8.
// Не заводи параллельный набор с другими именами/регистром.
export type GameAction =
  | { type: "ADD_ITEM"; itemId: ItemId }
  | { type: "REMOVE_ITEM"; itemId: ItemId }
  | { type: "SET_FLAG"; flag: StoryFlag; value: boolean }
  | { type: "CHANGE_SCENE"; sceneId: SceneId }
  | { type: "START_DIALOGUE"; dialogueId: string }
  | { type: "SET_DIALOGUE_NODE"; nodeId: string | null }
  | { type: "DISCOVER_CLUE"; clueId: string }
  | { type: "START_QUEST"; questId: string }
  | { type: "COMPLETE_QUEST"; questId: string }
  | { type: "SET_CHAPTER"; chapter: number }
  | { type: "SET_VARIABLE"; key: string; value: number | string }
  | { type: "SET_PUZZLE"; puzzleId: string | null }
  | { type: "SOLVE_PUZZLE"; puzzleId: string }
  | { type: "COMPUTE_ENDING" }
  | { type: "RESET_GAME" };
