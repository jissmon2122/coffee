const fs = require('fs');
const path = require('path');

const distServerIndex = path.join(__dirname, '..', 'dist', 'server', 'index.js');
const distIndex = path.join(__dirname, '..', 'dist', 'index.js');

if (fs.existsSync(distServerIndex)) {
  fs.copyFileSync(distServerIndex, distIndex);
  console.log(`Copied ${distServerIndex} -> ${distIndex}`);
} else {
  console.warn(`${distServerIndex} not found, skipping copy.`);
}
