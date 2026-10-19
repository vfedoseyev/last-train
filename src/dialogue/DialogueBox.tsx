import { useEffect } from "react";
import type { GameEffect } from "../game/gameEffects";
import { useGame } from "../game/GameContext";
import { resolveDialogue } from "./resolveDialogue";
import { evaluateConditions } from "../utils/conditions";
import { executeEffects } from "../game/effectExecutor";
import "./DialogueBox.css";

export function DialogueBox() {
  const { state, dispatch } = useGame();

  const resolved = resolveDialogue(state.dialogueState);

  // Самовосстановление: если dialogueState указывает на несуществующий диалог/узел
  // (например, из старого сохранения), не оставляем сцену затемнённой навсегда без
  // видимого диалога — закрываем его.
  useEffect(() => {
    if (state.dialogueState && !resolved) {
      dispatch({ type: "SET_DIALOGUE_NODE", nodeId: null });
    }
  }, [state.dialogueState, resolved, dispatch]);

  if (!resolved) return null;
  const { node } = resolved;

  const goToNode = (nodeId: string | null, effects?: GameEffect[]) => {
    if (effects) executeEffects(effects, dispatch);
    dispatch({ type: "SET_DIALOGUE_NODE", nodeId });
  };

  const availableChoices = node.choices?.filter((choice) =>
    evaluateConditions(choice.conditions, state)
  );

  return (
    <div className="dialogue-box">
      <div className="dialogue-box__speaker">{node.speaker}</div>
      <div className="dialogue-box__text">{node.text}</div>
      <div className="dialogue-box__actions">
        {availableChoices && availableChoices.length > 0 ? (
          availableChoices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => goToNode(choice.nextNodeId, choice.effects)}
            >
              {choice.text}
            </button>
          ))
        ) : (
          <button type="button" onClick={() => goToNode(node.next ?? null, node.effects)}>
            {node.next ? "Продолжить" : "Закрыть"}
          </button>
        )}
      </div>
    </div>
  );
}
