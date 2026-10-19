import type { InventoryItemDefinition } from "./inventoryTypes";

interface InventoryItemProps {
  item: InventoryItemDefinition;
  selected: boolean;
  onClick: () => void;
}

export function InventoryItem({ item, selected, onClick }: InventoryItemProps) {
  return (
    <button
      type="button"
      className={`inventory-item ${selected ? "inventory-item--selected" : ""}`}
      title={item.description}
      onClick={onClick}
    >
      {item.icon === "placeholder" ? (
        item.name[0]
      ) : (
        <img className="inventory-item__icon" src={item.icon} alt="" />
      )}
    </button>
  );
}
