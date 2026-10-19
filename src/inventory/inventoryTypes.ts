export type ItemId =
  | "phone"
  | "keys"
  | "flashlight"
  | "batteries"
  | "old_photo"
  | "cassette"
  | "cassette_player"
  | "station_key"
  | "station_log"
  | "train_schedule"
  | "old_tool"
  | "lena_backpack"
  | "lena_letter"
  | "lena_ticket"
  | "voice_recorder"
  | "pendant"
  | "weather_station_note"
  | "school_archive"
  | "photograph";

export interface InventoryItemDefinition {
  id: ItemId;
  name: string;
  description: string;
  icon: string;
}
