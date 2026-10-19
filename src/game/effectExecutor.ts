import type { Dispatch } from "react";
import type { GameEffect } from "./gameEffects";
import type { GameAction } from "./gameActions";
import { playSfx } from "../audio/sfx";

function effectToAction(effect: Exclude<GameEffect, { type: "playSfx" }>): GameAction {
  switch (effect.type) {
    case "setFlag":
      return { type: "SET_FLAG", flag: effect.flag, value: effect.value };
    case "addItem":
      return { type: "ADD_ITEM", itemId: effect.itemId };
    case "removeItem":
      return { type: "REMOVE_ITEM", itemId: effect.itemId };
    case "discoverClue":
      return { type: "DISCOVER_CLUE", clueId: effect.clueId };
    case "startQuest":
      return { type: "START_QUEST", questId: effect.questId };
    case "completeQuest":
      return { type: "COMPLETE_QUEST", questId: effect.questId };
    case "changeScene":
      return { type: "CHANGE_SCENE", sceneId: effect.sceneId };
    case "startDialogue":
      return { type: "START_DIALOGUE", dialogueId: effect.dialogueId };
    case "setChapter":
      return { type: "SET_CHAPTER", chapter: effect.chapter };
    case "setVariable":
      return { type: "SET_VARIABLE", key: effect.key, value: effect.value };
    case "startPuzzle":
      return { type: "SET_PUZZLE", puzzleId: effect.puzzleId };
    case "computeEnding":
      return { type: "COMPUTE_ENDING" };
  }
}

export function executeEffects(effects: GameEffect[], dispatch: Dispatch<GameAction>): void {
  effects.forEach((effect) => {
    if (effect.type === "playSfx") {
      playSfx(effect.src);
      return;
    }
    dispatch(effectToAction(effect));
  });
}
