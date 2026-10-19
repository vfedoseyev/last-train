import type { ItemId } from "./inventoryTypes";
import { useGame } from "../game/GameContext";
import { items } from "./itemRegistry";
import { InventoryItem } from "./InventoryItem";
import "./Inventory.css";

interface InventoryProps {
  selectedItemId: ItemId | null;
  onSelectItem: (itemId: ItemId | null) => void;
  disabled?: boolean;
}

export function Inventory({ selectedItemId, onSelectItem, disabled }: InventoryProps) {
  const { state } = useGame();

  if (state.inventory.length === 0) {
    return <div className="inventory inventory__empty">Инвентарь пуст</div>;
  }

  return (
    <div className={`inventory ${disabled ? "inventory--disabled" : ""}`}>
      {state.inventory.map((itemId) => {
        const item = items[itemId];
        if (!item) return null;
        return (
          <InventoryItem
            key={itemId}
            item={item}
            selected={selectedItemId === itemId}
            onClick={() => {
              if (disabled) return;
              onSelectItem(selectedItemId === itemId ? null : itemId);
            }}
          />
        );
      })}
    </div>
  );
}
