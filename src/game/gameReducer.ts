import type { GameState } from "./GameState";
import { initialGameState } from "./GameState";
import type { GameAction } from "./gameActions";
import { getEnding } from "./ending";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_FLAG":
      return { ...state, flags: { ...state.flags, [action.flag]: action.value } };

    case "ADD_ITEM":
      if (state.inventory.includes(action.itemId)) return state;
      return { ...state, inventory: [...state.inventory, action.itemId] };

    case "REMOVE_ITEM":
      return { ...state, inventory: state.inventory.filter((id) => id !== action.itemId) };

    case "CHANGE_SCENE":
      return { ...state, currentSceneId: action.sceneId };

    case "START_DIALOGUE":
      return {
        ...state,
        dialogueState: { dialogueId: action.dialogueId, currentNodeId: "start" },
      };

    case "SET_DIALOGUE_NODE":
      if (!state.dialogueState) return state;
      if (action.nodeId === null) return { ...state, dialogueState: null };
      return {
        ...state,
        dialogueState: { ...state.dialogueState, currentNodeId: action.nodeId },
      };

    case "DISCOVER_CLUE":
      if (state.discoveredClues.includes(action.clueId)) return state;
      return { ...state, discoveredClues: [...state.discoveredClues, action.clueId] };

    case "START_QUEST":
      if (state.activeQuests.includes(action.questId)) return state;
      return { ...state, activeQuests: [...state.activeQuests, action.questId] };

    case "COMPLETE_QUEST":
      if (state.completedQuests.includes(action.questId)) return state;
      return {
        ...state,
        completedQuests: [...state.completedQuests, action.questId],
        activeQuests: state.activeQuests.filter((id) => id !== action.questId),
      };

    case "SET_CHAPTER":
      return { ...state, currentChapter: action.chapter };

    case "SET_VARIABLE":
      return { ...state, variables: { ...state.variables, [action.key]: action.value } };

    case "SET_PUZZLE":
      return { ...state, activePuzzleId: action.puzzleId };

    case "SOLVE_PUZZLE":
      if (state.solvedPuzzles.includes(action.puzzleId)) {
        return { ...state, activePuzzleId: null };
      }
      return {
        ...state,
        solvedPuzzles: [...state.solvedPuzzles, action.puzzleId],
        activePuzzleId: null,
      };

    case "COMPUTE_ENDING":
      return { ...state, ending: getEnding(state) };

    case "RESET_GAME":
      return { ...initialGameState };

    default:
      return state;
  }
}
