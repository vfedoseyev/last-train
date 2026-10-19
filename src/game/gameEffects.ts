import type { ItemId } from "../inventory/inventoryTypes";
import type { StoryFlag } from "./storyFlags";
import type { SceneId } from "../scenes/sceneTypes";

// Декларативные эффекты для данных (диалоги, hotspots) — см. TECHNICAL ARCHITECTURE.md §76-78.
// Отличаются от GameAction (см. gameActions.ts): GameEffect описывается в контенте,
// executeEffects() в effectExecutor.ts переводит их в диспатч конкретных GameAction.
export type GameEffect =
  | { type: "setFlag"; flag: StoryFlag; value: boolean }
  | { type: "addItem"; itemId: ItemId }
  | { type: "removeItem"; itemId: ItemId }
  | { type: "discoverClue"; clueId: string }
  | { type: "startQuest"; questId: string }
  | { type: "completeQuest"; questId: string }
  | { type: "changeScene"; sceneId: SceneId }
  | { type: "startDialogue"; dialogueId: string }
  | { type: "setChapter"; chapter: number }
  | { type: "setVariable"; key: string; value: number | string }
  | { type: "startPuzzle"; puzzleId: string }
  | { type: "computeEnding" }
  // Не меняет GameState (поэтому обрабатывается отдельно в effectExecutor.ts,
  // не через dispatch) — нужен для хотспотов вроде рюкзака, которые технически
  // не "take" предмета в инвентарь, но по ощущениям должны звучать как подбор.
  | { type: "playSfx"; src: string };
