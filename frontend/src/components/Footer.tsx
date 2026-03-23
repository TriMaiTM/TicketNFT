import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e0e0e] w-full py-12 px-8 mt-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="space-y-2 text-center md:text-left">
        <div className="text-lg font-bold text-[#ffb3ae] font-headline">METAVENT</div>
        <p className="font-label text-sm tracking-wide opacity-60 text-[#e5e2e1]">© 2024 METAVENT. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <a className="text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors font-label text-sm tracking-wide opacity-60" href="#">Terms</a>
        <a className="text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors font-label text-sm tracking-wide opacity-60" href="#">Privacy</a>
        <a className="text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors font-label text-sm tracking-wide opacity-60" href="#">Discord</a>
        <a className="text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors font-label text-sm tracking-wide opacity-60" href="#">Twitter</a>
        <a className="text-[#e5e2e1] hover:text-[#ffb3ae] transition-colors font-label text-sm tracking-wide opacity-60" href="#">Support</a>
      </div>
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-lg opacity-60">share</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-lg opacity-60">rss_feed</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
