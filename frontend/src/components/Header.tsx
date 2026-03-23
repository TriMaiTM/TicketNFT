import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../hooks/useWeb3';

const Header: React.FC = () => {
  const { walletAddress, connectWallet } = useWeb3();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "text-[#ffb3ae] border-b-2 border-[#ffb3ae] pb-1 transition-all duration-300" 
      : "text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors transition-all duration-300";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 py-4 max-w-full">
      <Link to="/" className="text-2xl font-black tracking-tighter text-[#ffb3ae] font-headline">METAVENT</Link>
      <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
        <Link to="/" className={getLinkClass("/")}>Explore</Link>
        <Link to="/marketplace" className={getLinkClass("/marketplace")}>Marketplace</Link>
        <Link to="/my-tickets" className={getLinkClass("/my-tickets")}>My Tickets</Link>
      </div>
      <div className="flex items-center gap-4">
        {!walletAddress ? (
            <button onClick={connectWallet} className="hidden lg:flex items-center gap-2 px-6 py-2 rounded-xl obsidian-gradient text-on-primary-fixed font-headline font-bold active:scale-95 duration-200 hover:opacity-80 transition-all">
                Connect Wallet
            </button>
        ) : (
            <div className="h-10 px-4 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden" title={walletAddress}>
                <span className="material-symbols-outlined text-outline mr-2 text-sm">account_balance_wallet</span>
                <span className="text-xs text-on-surface truncate w-24">{walletAddress}</span>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
