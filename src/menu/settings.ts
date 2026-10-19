const SETTINGS_KEY = "last-train-settings";

export type TextSize = "normal" | "large";

export interface Settings {
  textSize: TextSize;
  // 0..1. 0 — то же самое, что раньше было musicEnabled: false.
  musicVolume: number;
  // 0..1 — громкость коротких звуков (взятие предмета, переход между сценами),
  // отдельно от музыки (см. audio/sfx.ts).
  sfxVolume: number;
}

const defaultSettings: Settings = { textSize: "normal", musicVolume: 0.6, sfxVolume: 0.8 };

export function loadSettings(): Settings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;

  try {
    return { ...defaultSettings, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
