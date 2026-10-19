import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages для project-сайта отдаёт по пути /<имя-репозитория>/, а не с
  // корня домена — без base все абсолютные пути (/images/..., /audio/...) вели
  // бы на несуществующий корень github.io и ломали бы все ассеты в проде.
  base: '/last-train/',
  server: {
    // По умолчанию Vite слушал только ::1 (IPv6 loopback). На этой машине включён
    // системный прокси, а 127.0.0.1 (в отличие от ::1) явно в его списке исключений —
    // биндимся туда, чтобы браузер не пытался пустить localhost через прокси.
    host: '127.0.0.1',
  },
})
