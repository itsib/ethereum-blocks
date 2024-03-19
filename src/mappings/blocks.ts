import { ethereum } from '@graphprotocol/graph-ts';
import { Block } from '../types/schema';

export function handleBlock(block: ethereum.Block): void {
    let id = block.hash.toHex()
    let blockEntity = new Block(id);
    blockEntity.number = block.number;
    blockEntity.timestamp = block.timestamp;
    blockEntity.gasUsed = block.gasUsed;
    blockEntity.gasLimit = block.gasLimit;
    blockEntity.save();
  }