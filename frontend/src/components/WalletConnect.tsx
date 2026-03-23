import React from 'react';

interface WalletConnectProps {
  walletAddress: string;
  connectWallet: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ walletAddress, connectWallet }) => {
  if (!walletAddress) {
    return (
      <button
        onClick={connectWallet}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300"
      >
        🦊 Kết nối ví MetaMask
      </button>
    );
  }

  return (
    <div className="bg-green-100 text-green-800 p-4 rounded-lg border border-green-300 mb-4">
      <p className="font-semibold">Đã kết nối</p>
      <p className="text-xs mt-1 truncate">{walletAddress}</p>
    </div>
  );
};

export default WalletConnect;
