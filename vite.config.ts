import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { readdirSync } from 'fs';

// 获取所有assets图片的映射
function getAssetAliases() {
  const aliases: Record<string, string> = {};
  const assetDirs = ['ai-analysis', 'favorites-main', 'favorites-detail', 'inspiration-main', 'inspiration-detail'];
  
  assetDirs.forEach(dir => {
    const assetPath = path.resolve(__dirname, `./src/assets/${dir}`);
    try {
      const files = readdirSync(assetPath);
      files.forEach(file => {
        if (file.endsWith('.png')) {
          const hash = file.replace('.png', '');
          aliases[`figma:asset/${hash}.png`] = path.resolve(assetPath, file);
        }
      });
    } catch (e) {
      // 文件夹不存在时忽略
    }
  });
  
  return aliases;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      ...getAssetAliases(),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});

