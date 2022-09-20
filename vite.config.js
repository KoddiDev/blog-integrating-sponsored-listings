import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
    if (mode === 'development') {
        return { base: '/sub-dir/' };
    }
});