import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-12 w-full flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 py-12 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-primary/20 text-primary text-sm font-label uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Live Now: Genesis Drop
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-[0.9]">
                CYBER <br />
                <span className="text-transparent bg-clip-text obsidian-gradient">SONIC 2024</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-lg leading-relaxed">
                The world's first fully tokenized immersive audio festival. Own your entry, trade your experience, and unlock exclusive backstage meta-vaults.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 rounded-xl obsidian-gradient text-on-primary-fixed font-headline font-bold text-lg hover:shadow-[0_0_30px_rgba(255,179,174,0.3)] transition-all active:scale-95">
                  Get Tickets
                </button>
                <button className="px-8 py-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-all font-headline font-bold text-lg active:scale-95">
                  View Collection
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative group w-full lg:w-auto">
              <div className="absolute -inset-4 obsidian-gradient opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity"></div>
              <div className="relative glass-card rounded-2xl overflow-hidden border border-outline-variant/30 aspect-[4/5] shadow-2xl">
                <img alt="Cyber Sonic NFT" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxhd1JSfQLuah8r1jYMfc-X-vKX49qCW0r-LQ1GP-649STld8WWqddQ4tULFtvkhiCxe8TA1E8Unw8CT3xZnyjc9q6rdcIKLpQ7o8MMmjsgU8h4P-E0FjdWkrMX-vPJy9nTzfKlaJrW6-8F0-6yibVVy-zMWJQv0KGLcy6mrRZ6XWpZCkx_7wHzsjvXBiZTJ9luK73-UtSRGpvWsJm1e9L0Lt9bMavWrViGj9An1OSBm3VdMiK_l0R8xXm1Wv57rBZNnqmqLCdarVt" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-primary font-headline font-bold text-2xl">#001 GENESIS</p>
                      <p className="text-on-surface-variant font-label">Floor: 1.25 ETH</p>
                    </div>
                    <div className="text-right">
                      <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Background Decoration Text */}
          <div className="absolute top-20 -right-20 opacity-[0.03] pointer-events-none select-none hidden lg:block">
            <h2 className="text-[20rem] font-headline font-black leading-none">FUTURE</h2>
          </div>
        </section>

        {/* Trending Grid */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-headline font-bold tracking-tight">Trending <span className="text-primary">Experiences</span></h2>
                <p className="text-on-surface-variant">Handpicked digital collectibles for the most exclusive events.</p>
              </div>
              <a className="hidden md:flex items-center gap-2 text-primary font-bold hover:opacity-70 transition-all" href="#">
                View All <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Event Card 1 */}
              <div className="bg-surface-container-high rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img alt="Neon Pulse Tokyo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs8nAxm928X3RmLopyJ7OqyPtXyGolQ-lXvD_5OggZ13qxxbfcoDYdPxq46apJJasMGz5TXc_RA-_ClMT3zMCHnh1NA_-3U7LM6rj7DczeXJXih_MB8H2IWB0O-CRUCmsEXQLpRYWi4Fgfc8_pio0ueFRhcEBqXkXdYT4sGDRk8mhvnTPohwIJlfWMF5uUZV6QX9qwnomfUFkxJXvBmV9fQ0PXsRQLlcOZbkv75AdyR_UypxHb9E-knNUFsu__t37e9Jy4mXxxD_pm" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md text-primary text-xs font-bold border border-primary/30">
                    HOT
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-headline font-bold">Neon Pulse Tokyo</h3>
                      <p className="text-sm text-on-tertiary-fixed-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span> Shibuya District
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant font-label">FROM</p>
                      <p className="text-primary font-bold">0.45 ETH</p>
                    </div>
                  </div>
                  <Link to="/event/1" className="block text-center w-full py-3 rounded-lg border border-outline-variant hover:border-primary/50 transition-colors font-headline font-bold text-sm">
                    Explore Tickets
                  </Link>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="bg-surface-container-high rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img alt="Meta-Logic Summit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhx2yBpiMctL8x--EoFFkiC8DhiCG3RpN1Rz3a-tXWDfhoRUG55nigR45uDijFSyI4cWiO2UMl4wg5cOOG2e-kirymeI7OmZjJFvdC9AyfqIK9U6SZsnqcZ0Lf-rHazE7aPaiTVv5rlsaBNYbkRm0KNAWngUdTAe2w6sLXMEHDb68aWO6MVsjaZ5NOVrtfWYGmUZZYiTb6z_y6dagtgoWzOpHPF0lN6Tc9fZf-zt09L8TWFW9K0BcA2o9oBYDIGFNTsckrxEjEhmSX" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md text-on-surface text-xs font-bold border border-outline-variant">
                    2 DAYS LEFT
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-headline font-bold">Meta-Logic Summit</h3>
                      <p className="text-sm text-on-tertiary-fixed-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span> Virtual Arena
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant font-label">FROM</p>
                      <p className="text-primary font-bold">0.12 ETH</p>
                    </div>
                  </div>
                  <Link to="/event/1" className="block text-center w-full py-3 rounded-lg border border-outline-variant hover:border-primary/50 transition-colors font-headline font-bold text-sm">
                    Explore Tickets
                  </Link>
                </div>
              </div>

              {/* Event Card 3 */}
              <div className="bg-surface-container-high rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img alt="Velvet Night NFT" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhEM3YnxbmywRlKNG66GHYlxdsx5ut4iGLDgSrpwVqsBthaQw0UeldFHGpgIi0HgDCeJWVO6G52MgkYm-3e4SbmEhfEyhMpNswMrtV0TUxHfnUVspcoc2acoKG1_nW3jTX2TmZNzdsAaDYeUAjCBx-gpDz5LtZvlMD8GBgG1gGViAJocN_nM6jE71fJsRk2KPLfIlg4OY4uzQpiFzApgVJhKZJMv-RxVXMODRjp8CKLTGFG4LkwphVpkVkxwxEVtTp75H4NP6Ktgh" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-headline font-bold">Velvet Night NFT</h3>
                      <p className="text-sm text-on-tertiary-fixed-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span> Paris, FR
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant font-label">FROM</p>
                      <p className="text-primary font-bold">0.88 ETH</p>
                    </div>
                  </div>
                  <Link to="/event/1" className="block text-center w-full py-3 rounded-lg border border-outline-variant hover:border-primary/50 transition-colors font-headline font-bold text-sm">
                    Explore Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;
