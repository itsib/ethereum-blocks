import path from 'path';
import * as fs from 'fs';

const PJ_ROOT = path.resolve(process.argv[1], '../..');

const FILES = [
  'subgraph.yaml',
  'build',
  'src/types',
];

/**
 * Remove file or dir recursive
 * @param pathname {string} File or dir name related project root directory
 */
function remove(pathname) {
  fs.rmSync(path.resolve(PJ_ROOT, pathname), { force: true, recursive: true });

  console.log(`\x1b[2;37m  Removed › ${pathname}\x1b[0m`);
}

FILES.forEach(filename => remove(filename));

console.log(`\x1b[0;32m✔\x1b[0m Clean complete.`);