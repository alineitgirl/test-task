import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] })
    ],
    base: 'test-task',
    build: {
        lib: {
            entry: 'src/main.tsx',
            name: 'MyWidget',
            fileName: 'widget',
            formats: ['iife']
        },
    }
});
