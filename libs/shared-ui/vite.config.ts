/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true,
            interval: 500
        }
    },
    preview: {
        host: true,
        port: 3000
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './testSetup.js',
        coverage: {
            provider:'istanbul',
            reporter: ['text', 'json', 'html', 'lcov'],
        }
    },
})
