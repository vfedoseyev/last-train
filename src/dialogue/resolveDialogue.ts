import type { DialogueState } from "../game/GameState";
import type { Dialogue, DialogueNode } from "./dialogueTypes";
import { dialogues } from "./dialogueRegistry";

export interface ResolvedDialogue {
  dialogue: Dialogue;
  node: DialogueNode;
}

// Общая проверка для DialogueBox (что показывать) и Scene (нужно ли темнить сцену) —
// чтобы обе стороны согласились, что диалог реально есть, а не просто dialogueState
// формально не пуст (например, из повреждённого/устаревшего сохранения).
export function resolveDialogue(dialogueState: DialogueState | null): ResolvedDialogue | null {
  if (!dialogueState) return null;

  const dialogue = dialogues[dialogueState.dialogueId];
  if (!dialogue) return null;

  const node = dialogue.nodes.find((n) => n.id === dialogueState.currentNodeId);
  if (!node) return null;

  return { dialogue, node };
}
