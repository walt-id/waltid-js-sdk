import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@waltid-sdk/vue',
            fileName: 'index',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                manualChunks: undefined,
            },
        },
    },
    plugins: [vue(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
})