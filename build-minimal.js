import { writeFileSync, mkdirSync, copyFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Create minimal dist directory
const distDir = join(process.cwd(), 'dist');
const publicDir = join(process.cwd(), 'public');

// Create dist directory if it doesn't exist
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Create minimal index.html
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/log-lottery/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>抽奖系统</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="https://localhost:6719/log-lottery/src/main.ts"></script>
  </body>
</html>`;

// Write index.html to dist
writeFileSync(join(distDir, 'index.html'), indexHtml);

// Copy music files to dist
const musicDir = join(distDir, 'music');
if (!existsSync(musicDir)) {
  mkdirSync(musicDir, { recursive: true });
}

// Copy necessary files from public
const filesToCopy = [
  'favicon.ico',
  'music/抽奖音乐.mp3',
  'music/中奖音乐.wav',
  'music/click.wav'
];

filesToCopy.forEach(file => {
  const srcPath = join(publicDir, file);
  const destPath = join(distDir, file);
  const destDir = join(distDir, file.split('/').slice(0, -1).join('/'));
  
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('\nMinimal dist directory created successfully!');
console.log('You can now run Tauri build.');
