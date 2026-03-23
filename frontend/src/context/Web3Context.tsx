import React, { createContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import { BrowserProvider, type Signer } from 'ethers';

interface Web3ContextType {
  walletAddress: string;
  provider: BrowserProvider | null;
  signer: Signer | null;
  connectWallet: () => Promise<void>;
}

export const Web3Context = createContext<Web3ContextType>({
  walletAddress: "",
  provider: null,
  signer: null,
  connectWallet: async () => {},
});

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  // Optional: Auto-connect if already authorized
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(async (accounts: string[]) => {
        if (accounts.length > 0) {
          const browserProvider = new BrowserProvider(window.ethereum);
          const web3Signer = await browserProvider.getSigner();
          setProvider(browserProvider);
          setSigner(web3Signer);
          setWalletAddress(accounts[0]);
        }
      }).catch(console.error);
    }
  }, []);

  return (
    <Web3Context.Provider value={{ walletAddress, provider, signer, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
