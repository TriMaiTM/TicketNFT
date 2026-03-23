import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EventDetail: React.FC = () => {
  return (
    <>
      <Header />
      {/* Main Content Canvas */}
      <main className="pt-24 pb-20">
        {/* Hero Section: Large Event Banner */}
        <section className="relative w-full h-[614px] overflow-hidden px-6 lg:px-12">
          <div className="absolute inset-0 z-0">
            <img alt="Event Hero" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD10mv-z2pinH3wHz0usC588T6JyuoO87FxNnpowdWknnUr70l1J2sRlRZLyqzCQoAvS-4DDFaBQO30oIyYHU6ZPuz3p5OhuvFJwNWjy7BbOJkqa_4ubyWCbVe220-21VdOER1Mo-yFWYceAmrk4LNFIWoPrDpmtB_xV0cQnFg8P6qsA5sgLLi32U5cgQZ9N9oTCiuWPKO03rdRyYrywiKnWW_mZrCk12LVfAkhkvD02CwA-sv-htmk8_BPRAb7KW5vfifLRexKUtpm" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end pb-12">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs font-headline font-bold tracking-widest">EXCLUSIVE DROP</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-none mb-4 uppercase">
              Neon<br/><span className="text-primary">Synapse</span> 2024
            </h1>
            <div className="flex flex-wrap gap-6 text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span>OCT 24, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>TOKYO CYBERDISTRICT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold tracking-tight">THE EXPERIENCE</h2>
              <p className="text-lg text-on-surface/80 leading-relaxed font-body">
                Immerse yourself in the ultimate fusion of generative art and rhythmic precision. Neon Synapse 2024 is not just an event; it's a decentralized sensory overload. This ticket grants you access to the main arena, an exclusive airdrop of the event soundtrack, and a 1-of-1 commemorative NFT badge with evolving metadata based on your attendance.
              </p>
            </div>

            {/* Attributes Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
                <span className="block text-xs text-on-surface-variant uppercase mb-2">Rarity</span>
                <span className="text-xl font-headline font-bold text-primary">Legendary</span>
              </div>
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
                <span className="block text-xs text-on-surface-variant uppercase mb-2">Access</span>
                <span className="text-xl font-headline font-bold text-on-surface">VIP Area</span>
              </div>
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
                <span className="block text-xs text-on-surface-variant uppercase mb-2">Type</span>
                <span className="text-xl font-headline font-bold text-on-surface">Dynamic</span>
              </div>
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
                <span className="block text-xs text-on-surface-variant uppercase mb-2">Supply</span>
                <span className="text-xl font-headline font-bold text-on-surface">500 / 500</span>
              </div>
            </div>

            {/* Location Map Section */}
            <div className="rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-low">
              <div className="p-6 flex justify-between items-center">
                <h3 className="text-xl font-headline font-bold">VENUE LOCATION</h3>
                <span className="text-sm text-primary cursor-pointer hover:underline">Get Directions →</span>
              </div>
              <div className="h-80 w-full relative">
                <img alt="Map location" className="w-full h-full object-cover grayscale brightness-50 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmPtHhZ9TeTnWu2_q6C04etPxYHPsuTNHcrLWI66qP3epXHqnMkWUkico1-YjLrXhl7xDv0f5TlLj7AeEEuE9Pt2NNTll8zm69NIlrUjid9TgALnDz7YCrZDQYD_woCcSUK8yTUrji0y9lpfVy4datY1W4M0m9kEGZx6JMUbCX2gSSIMiL6qxSCmwo9Jh2JiK_NxcG9ey5fblFKHdXj5HoRJpSK624eeuRT2CZhDGFtDLg4Z0YXoQv3NGUUYFVlr_5oFmThiX6rLdW" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary animate-pulse">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 glass-card rounded-2xl p-8 border border-outline-variant/20 shadow-2xl bg-surface-container-high/40">
              <h3 className="text-2xl font-headline font-bold mb-6">MINT TICKET</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                  <div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-widest">Current Price</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-headline font-bold">0.45 ETH</span>
                    </div>
                  </div>
                  <span className="text-on-surface-variant mb-1 font-medium">≈ $1,124.20</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                  <span className="text-sm">Network Fee</span>
                  <span className="text-sm font-bold">0.0012 ETH</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full obsidian-gradient text-on-primary-fixed py-4 rounded-xl font-headline font-extrabold text-lg shadow-[0_10px_30px_rgba(255,83,82,0.3)] hover:opacity-90 active:scale-95 transition-all">
                  BUY TICKET
                </button>
                <button className="w-full bg-surface-container-highest border border-outline-variant/30 text-on-surface py-4 rounded-xl font-headline font-bold hover:bg-surface-container-high transition-all">
                  MAKE OFFER
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-outline-variant/20">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-tertiary">info</span>
                  <span className="text-xs text-on-surface-variant leading-tight">Tickets are fully transferable but subject to a 5% secondary royalty back to the artist.</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary">verified_user</span>
                  <span className="text-xs text-on-surface-variant leading-tight">Verified Smart Contract: 0x71...4E21</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventDetail;
