import * as fs from 'fs';
import path from 'path';

/**
 * @typedef Network
 * @type {object}
 * @property {string} uid
 * @property {string} name
 * @property {string} cliName
 * @property {number} chainId
 * @property {boolean} testnet
 * @property {boolean} supportedOnHostedService
 * @property {boolean} supportedOnStudio
 * @property {boolean} fullySupportedOnNetwork
 * @property {boolean} partiallySupportedOnNetwork
 * @property {string[]} substreams
 */

/** @type {Network[]} */
const NETWORKS = JSON.parse(fs.readFileSync(path.resolve('./cli/utils/networks.json'), 'utf-8'));

/**
 *
 * @param chainId
 * @return {Network}
 */
export function findNetwork(chainId) {
  const uid = `evm-${chainId}`;
  const network = NETWORKS.find(item => item.uid === uid);

  if (!network) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  return network;
}

/**
 * Get network from manifest file
 * @param filepath
 * @returns {Network}
 */
export function parseFromManifest(filepath) {
  if (!fs.existsSync(filepath)) {
    throw new Error(`Subgraph not found. Are you sure you ran the codegen command?`);
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  const networkName = /network:\s([\w\d-]+)\s/.exec(content)?.[1];
  if (!networkName) {
    throw new Error(`No network found in subgraph.yaml`);
  }

  const network = NETWORKS.find(item => item.cliName === networkName);

  if (!network) {
    throw new Error(`Unsupported cliName: ${networkName}`);
  }

  return network;
}
