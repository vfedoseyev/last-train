import type { InventoryItemDefinition, ItemId } from "../../inventory/inventoryTypes";
import { asset } from "../../utils/asset";

// Реестр наполняется постепенно по мере реализации глав — не все ItemId из
// inventoryTypes.ts имеют определение сразу (см. GDD §40 для полного списка).
// Предметы Глав 2-8 перенесены в archive/data/items/later_chapters.ts —
// решение сосредоточиться на Прологе/Главе 1, см. TODO.md.
export const items: Partial<Record<ItemId, InventoryItemDefinition>> = {
  phone: {
    id: "phone",
    name: "Телефон",
    description: "На экране — сообщение от Миши: «Ты где?»",
    icon: asset("images/ui/phone.png"),
  },
};
