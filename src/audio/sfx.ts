// Громкость эффектов живёт вне React-дерева (как и общий <audio> в
// useBackgroundMusic.ts) — звук предмета/перехода запускается из мест, у которых
// нет доступа к Settings (Hotspot.tsx, GameContext.tsx), поэтому App.tsx
// синхронизирует это значение сюда при каждом изменении настроек.
let sfxVolume = 1;

export function setSfxVolume(volume: number): void {
  sfxVolume = volume;
}

// Каждый вызов — новый Audio(), а не общий элемент: звуки короткие и могут
// накладываться друг на друга (например, подобрал предмет прямо на входе в
// новую сцену), общий элемент просто обрезал бы предыдущий.
export function playSfx(src: string): void {
  if (sfxVolume <= 0 || typeof Audio === "undefined") return;
  const audio = new Audio(src);
  audio.volume = sfxVolume;
  audio.play().catch(() => {});
}
