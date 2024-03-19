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