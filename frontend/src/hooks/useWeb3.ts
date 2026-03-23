import { useState, useCallback } from 'react';
import { BrowserProvider, type Signer } from 'ethers';

export function useWeb3() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);

  const connectWallet = useCallback(async () => {
    if (window.ethereum == null) {
      alert("Bạn chưa cài đặt ví MetaMask!");
      return;
    }
    try {
      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);
      const web3Signer = await browserProvider.getSigner();
      
      setProvider(browserProvider);
      setSigner(web3Signer);
      setWalletAddress(await web3Signer.getAddress());
    } catch (error) {
      console.error("Lỗi kết nối ví:", error);
    }
  }, []);

  return { walletAddress, connectWallet, provider, signer };
}
