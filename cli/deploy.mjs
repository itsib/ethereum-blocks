import path from 'path';
import { parseFromManifest } from './utils/find-network.mjs';
import { getAccessToken, getSubgraphName } from './utils/get-args.mjs';
import { spawnSync } from 'child_process';

const PJ_ROOT = path.resolve(process.argv[1], '../..');
const NETWORK = parseFromManifest(path.resolve(PJ_ROOT, 'subgraph.yaml'));
const SUBGRAPH_NAME = getSubgraphName();
const ACCESS_TOKEN = getAccessToken();
const PRODUCT = SUBGRAPH_NAME.includes('/') ? 'hosted-service' : 'studio';

function deployHostedServiceArgs() {
  const deployNode = 'https://api.thegraph.com/deploy/';
  const ipfs = 'https://api.thegraph.com/ipfs/';

  return ['node_modules/.bin/graph', 'deploy', '--product', 'hosted-service', '--node', deployNode, '--ipfs', ipfs, '--deploy-key', ACCESS_TOKEN];
}

function deployStudioArgs() {
  const deployNode = 'https://api.studio.thegraph.com/deploy/';
  const ipfs = 'https://api.thegraph.com/ipfs/api/v0';
  const version = 'v0.0.1';

  return ['node_modules/.bin/graph', 'deploy', '--studio', '--node', deployNode, '--ipfs', ipfs, '--version-label', version, '--access-token', ACCESS_TOKEN];
}

if (PRODUCT === 'studio' && !NETWORK.supportedOnStudio) {
  throw new Error(`Studio is not supported for network ${NETWORK.name}`);
}

if (PRODUCT === 'hosted-service' && !NETWORK.supportedOnHostedService) {
  throw new Error(`Hosted Service is not supported for network ${NETWORK.name}`);
}

const args = PRODUCT === 'studio' ? deployStudioArgs() : deployHostedServiceArgs();

spawnSync('node', [...args, SUBGRAPH_NAME], { stdio: 'inherit', cwd: process.cwd()  });


