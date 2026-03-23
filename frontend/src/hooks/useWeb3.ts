import { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

export function useWeb3() {
  return useContext(Web3Context);
}
