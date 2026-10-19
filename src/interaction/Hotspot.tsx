import type { HotspotDefinition } from "./interactionTypes";
import type { ItemId } from "../inventory/inventoryTypes";
import { useGame } from "../game/GameContext";
import { evaluateConditions } from "../utils/conditions";
import { executeEffects } from "../game/effectExecutor";
import { playSfx } from "../audio/sfx";
import { asset } from "../utils/asset";

interface HotspotProps {
  hotspot: HotspotDefinition;
  onInspect: (text: string) => void;
  selectedItemId: ItemId | null;
  onItemUsed: () => void;
  onActivate: (hotspotId: string | null) => void;
  spotlight: boolean;
  showLabel: boolean;
}

export function Hotspot({
  hotspot,
  onInspect,
  selectedItemId,
  onItemUsed,
  onActivate,
  spotlight,
  showLabel,
}: HotspotProps) {
  const { state, dispatch } = useGame();

  if (!evaluateConditions(hotspot.visibleWhen, state)) return null;

  const enabled = evaluateConditions(hotspot.enabledWhen, state);

  const handleClick = () => {
    // Пока идёт диалог или открыта головоломка, остальные хотспоты недоступны
    // (CLAUDE_CODE_PROMPT.md §17.1).
    if (state.dialogueState || state.activePuzzleId) return;
    if (!enabled) return;

    const { interaction } = hotspot;

    let text = interaction.text;
    let effects = interaction.effects;
    let dialogueId = interaction.dialogueId;
    let matchedVariant = false;

    if (interaction.variants) {
      const variant = interaction.variants.find((candidate) =>
        evaluateConditions(candidate.conditions, state)
      );
      if (variant) {
        matchedVariant = true;
        text = variant.text ?? text;
        effects = variant.effects ?? effects;
        dialogueId = variant.dialogueId ?? dialogueId;
      }
    }

    // requiredItem гейтит только "базовое" состояние — если сработал вариант
    // (например, "кассета уже сказала всё" после того, как батарейки израсходованы),
    // выбор предмета уже не нужен.
    if (interaction.type === "use" && interaction.requiredItem && !matchedVariant) {
      if (selectedItemId !== interaction.requiredItem) {
        onInspect(
          selectedItemId
            ? "Это здесь не пригодится."
            : "Сначала выбери подходящий предмет в инвентаре."
        );
        return;
      }
      onItemUsed();
    }

    if (interaction.type === "take" && interaction.itemId) {
      dispatch({ type: "ADD_ITEM", itemId: interaction.itemId });
      playSfx(asset("audio/sfx/item-pickup.mp3"));
    }

    // Спотлайт должен включаться на любом хотспоте, который реально открывает диалог —
    // не только type: "talk" напрямую, но и, например, "use", если startDialogue
    // приходит через effects (магнитофон + батарейки → запись кассеты).
    const opensDialogue =
      (interaction.type === "talk" && Boolean(dialogueId)) ||
      (effects?.some((effect) => effect.type === "startDialogue") ?? false);

    if (interaction.type === "talk" && dialogueId) {
      dispatch({ type: "START_DIALOGUE", dialogueId });
    }

    if (effects) {
      executeEffects(effects, dispatch);
    }

    if (opensDialogue) {
      onActivate(hotspot.id);
    }

    if (text) {
      onInspect(text);
    }
  };

  return (
    <button
      type="button"
      className={`hotspot hotspot--${enabled ? "available" : "disabled"} ${
        spotlight ? "hotspot--spotlight" : ""
      } ${showLabel ? "hotspot--outlined" : ""}`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onClick={handleClick}
      aria-label={hotspot.label ?? hotspot.interaction.text ?? hotspot.id}
    >
      {hotspot.image && <img className="hotspot__prop" src={hotspot.image} alt="" />}
      {showLabel && <span className="hotspot__label">{hotspot.label ?? hotspot.id}</span>}
    </button>
  );
}
