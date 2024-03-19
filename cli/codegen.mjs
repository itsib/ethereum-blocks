import path from 'path';
import handlebars from 'handlebars';
import * as fs from 'fs';
import { findNetwork } from './utils/find-network.mjs';
import { getChiaId } from './utils/get-args.mjs';
import { spawnSync } from 'child_process';

const PJ_ROOT = path.resolve(process.argv[1], '../..');
const NETWORK = findNetwork(getChiaId());

/**
 * Build config file from template
 */
function createSubgraphYaml() {
  const filename = 'templates/subgraph.hbs';
  const templateFile = path.resolve(PJ_ROOT, filename);
  if (!fs.existsSync(templateFile)) {
    throw new Error(`File ${filename} not exist.`);
  }

  console.log(`\x1b[2;37m  Compile manifest ${filename} › subgraph.yaml\x1b[0m`);

  const templateContent = fs.readFileSync(templateFile, 'utf-8');
  const outputContent = handlebars.compile(templateContent)({ network: NETWORK.cliName });
  const outputFilePath = path.resolve(PJ_ROOT, 'subgraph.yaml');

  fs.writeFileSync(outputFilePath, outputContent);

  console.log(`\x1b[0;32m✔\x1b[0m File subgraph.yaml created for ${NETWORK.name}`);
}

createSubgraphYaml();

spawnSync('node', ['node_modules/.bin/graph', 'codegen', '--output-dir', 'src/types/'], { stdio: 'inherit' });