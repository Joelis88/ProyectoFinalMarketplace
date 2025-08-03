import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ruta de salida (por defecto es "dist")
  },
  // Configuración para SPA - manejo de rutas en desarrollo
  server: {
    historyApiFallback: true,
  },
  // Asegura que archivos estáticos se copien correctamente
  publicDir: 'public',
});
