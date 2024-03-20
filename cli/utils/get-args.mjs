/**
 * Parse args and find --chain-id or -c
 * @param {?number} defaultChainId
 * @returns {number}
 */
export function getChiaId(defaultChainId) {
  const index = process.argv.findIndex(arg => arg === '--chain-id' || arg === '-c');
  const chainId = index !== -1 ? parseInt(process.argv[index + 1], 10) : undefined;

  if (chainId) {
    return chainId;
  }
  if (defaultChainId) {
    return defaultChainId;
  }
  throw new Error('Missing required parameter --chain-id, -c');
}

/**
 * Parse args and find --name or -n
 * @returns {string}
 */
export function getSubgraphName() {
  const index = process.argv.findIndex(arg => arg === '--name' || arg === '-n');
  const name = index !== -1 ? process.argv[index + 1] : undefined;

  if (name) {
    return name;
  }
  throw new Error('Missing required parameter --name, -n');
}

/**
 * Parse args and find --token or -t
 * @returns {string}
 */
export function getAccessToken() {
  const index = process.argv.findIndex(arg => arg === '--token' || arg === '-t');
  const token = index !== -1 ? process.argv[index + 1] : undefined;

  if (token) {
    return token;
  }
  throw new Error('Missing required parameter --token, -t');
}

/**
 * Parse args and find --version or -v
 * @returns {string}
 */
export function getVersion(defaultVersion = 'v0.0.1') {
  const index = process.argv.findIndex(arg => arg === '--version' || arg === '-v');
  const versionLabel = index !== -1 ? process.argv[index + 1] : undefined;

  if (versionLabel) {
    return versionLabel;
  }
  return defaultVersion;
}