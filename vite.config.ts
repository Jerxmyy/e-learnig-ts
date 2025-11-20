import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    host: "0.0.0.0", // Permet l'accès depuis le réseau local
    port: 5173,
    strictPort: false, // Si le port est occupé, essaie le suivant
  },
});
