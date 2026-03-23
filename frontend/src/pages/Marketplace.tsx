import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Marketplace: React.FC = () => {
  return (
    <>
      <Header />
      {/* Main Layout Container */}
      <div className="pt-24 flex min-h-screen w-full">
        {/* Sidebar Filter System */}
        <aside className="hidden lg:flex flex-col w-80 h-[calc(100vh-6rem)] sticky top-24 bg-surface-container-low px-6 py-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-xl font-bold tracking-tight">Filters</h2>
            <span className="material-symbols-outlined text-primary cursor-pointer">filter_list</span>
          </div>
          {/* Price Range */}
          <div className="mb-10">
            <label className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Price Range (ETH)</label>
            <div className="flex flex-col gap-4">
              <input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" type="range" />
              <div className="flex justify-between items-center gap-2">
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-2 flex-1">
                  <span className="text-[10px] text-outline block">MIN</span>
                  <span className="text-sm font-mono">0.05</span>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-2 flex-1">
                  <span className="text-[10px] text-outline block">MAX</span>
                  <span className="text-sm font-mono">12.5</span>
                </div>
              </div>
            </div>
          </div>
          {/* Event Category */}
          <div className="mb-10">
            <label className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Category</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high cursor-pointer hover:bg-surface-container-highest transition-colors">
                <input defaultChecked className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary" type="checkbox" />
                <span className="text-sm">Music & Concerts</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
                <input className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary" type="checkbox" />
                <span className="text-sm">Sports & Esports</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
                <input className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary" type="checkbox" />
                <span className="text-sm">Tech Conferences</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
                <input className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary" type="checkbox" />
                <span className="text-sm">Art Galleries</span>
              </label>
            </div>
          </div>
          {/* Date Picker Placeholder */}
          <div className="mb-10">
            <label className="text-xs font-bold uppercase tracking-widest text-outline mb-4 block">Event Date</label>
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 flex items-center justify-between cursor-pointer">
              <span className="text-sm">All Upcoming</span>
              <span className="material-symbols-outlined text-sm">calendar_today</span>
            </div>
          </div>
          <button className="mt-auto w-full py-4 border border-outline/30 rounded-xl font-bold hover:bg-surface-container-high transition-colors">
            Clear All Filters
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-6 lg:px-12 py-8 overflow-x-hidden">
          {/* Hero / Header Section */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter mb-4">MARKETPLACE</h1>
              <p className="text-on-surface-variant max-w-xl text-lg">Secure your entry to the most exclusive digital and physical events. Verified secondary market tickets powered by smart contracts.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant/10">
                <button className="px-6 py-2 rounded-full bg-surface-container-high text-primary font-bold shadow-xl">Live Listings</button>
                <button className="px-6 py-2 rounded-full text-on-surface-variant font-medium hover:text-on-surface transition-colors">Recent Sales</button>
              </div>
            </div>
          </header>

          {/* Bento Grid Marketplace */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Ticket Card 1 (Music) */}
            <div className="group flex flex-col bg-surface-container-high rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="Concert Stage" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB90UJHfvECOid-9eT61-0Q6LoIun2EIUsLSIoiyiaXCJR2KJAo55S4MSkr5jK5CDZXAuFv-YE723o6zcbTioivSuTPxnMRM0qUmsydPwAaDUnPlwInZL6LUHfNfUyN7M23hnuAq8LbYa2mH8FOeO2z_4Pgrq7Cd280OE-YZT7QcM7wlL7W-I6g0MAEXdQgGnKD8r378Iz5OdhcQlqqwRmOJLAah3YW5bF1V65NYCUkEvfOWMCaIz9IijAybyCKdjAJTVaChTvw3LJt" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-surface-variant/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Rare #042</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-xl font-bold">Midnight Synthwave Festival</h3>
                  <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">favorite</span>
                </div>
                <p className="text-on-tertiary-fixed-variant text-sm font-bold mb-6">Oct 24 • Neo Tokyo Arena</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div>
                    <span className="text-[10px] text-outline uppercase font-bold block mb-1">Floor Price</span>
                    <span className="text-xl font-mono font-bold text-primary">0.85 ETH</span>
                  </div>
                  <Link to="/event/1" className="block text-center bg-on-surface text-surface py-2 px-6 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Ticket Card 2 (Art) */}
            <div className="group flex flex-col bg-surface-container-high rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="Art Gallery" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4xYpPsB9elMVs_dtPGLY2HuCUmbo4FD_N4YqsDCd_BApTgu-Q8Do-AMSeLpwOhUTvZfkJe0Cn1p2S_yqA2GAASEJXB2u9HP1IdPvL2hI8J2KaemjDYx-selxcfRa0-cdSE-znHNfvjqd5QXr3aXCkItTY9OKR6ozmqv6PIERD6JHBxM0QJ_AgnYXEBcSwEB7gQDctRiRtfFBprw1QRyZyJmLpwsPjG7jfQTr2qIxV3I6WLeQvq7MwUN-ccQUsjZg_Ab_OZtaE2SmE" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-surface-variant/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Legendary #001</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-xl font-bold">Ether Visions Vernissage</h3>
                  <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">favorite</span>
                </div>
                <p className="text-on-tertiary-fixed-variant text-sm font-bold mb-6">Nov 12 • Metaverse Gallery 7</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div>
                    <span className="text-[10px] text-outline uppercase font-bold block mb-1">Floor Price</span>
                    <span className="text-xl font-mono font-bold text-primary">2.40 ETH</span>
                  </div>
                  <Link to="/event/1" className="block text-center bg-on-surface text-surface py-2 px-6 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Ticket Card 3 (Conference) */}
            <div className="group flex flex-col bg-surface-container-high rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300">
              <div className="relative aspect-video">
                <img alt="Conference" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_DJNVJcl5GbN8fsTlV1aoQpxA5VstLjDCnpXGBGVEhdXCHcFD16Dpzcj0utS3Fs8fXnh0No0jkonu5GrPtBEenJ59QrR41hprh8IrbkupU360_yomJw_OQ_MNZW9foVtSW4PXnLJSeeoFCY8wC6w8Z9N66cOShUpkS6hK7wYp5sIYaIHuF5RsGcamqS2s36H3JZ49BOzqzdkQt4nmxGw7dg_EMM_qnKduXnno2C5HOIW5i7DO2AqBSfhrhtnwWhs5s409_mH-EK8" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-surface-variant/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-primary/20">
                  <span className="text-[10px] font-bold tracking-widest uppercase">VIP Pass</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-xl font-bold">Web3 Global Summit</h3>
                  <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">favorite</span>
                </div>
                <p className="text-on-tertiary-fixed-variant text-sm font-bold mb-6">Dec 01 • Zurich Innovation Hub</p>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                  <div>
                    <span className="text-[10px] text-outline uppercase font-bold block mb-1">Floor Price</span>
                    <span className="text-xl font-mono font-bold text-primary">0.32 ETH</span>
                  </div>
                  <Link to="/event/1" className="block text-center bg-on-surface text-surface py-2 px-6 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Horizontal Banner */}
            <div className="md:col-span-2 xl:col-span-3 flex flex-col md:flex-row bg-primary-container/10 border border-primary/10 rounded-2xl overflow-hidden mt-8">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <span className="text-xs font-black tracking-widest uppercase text-primary">Featured Drop</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-black mb-4 leading-none">ASTRAL JOURNEY: <br/>WORLD TOUR</h2>
                <p className="text-on-surface-variant mb-8 text-lg">Limited edition tickets for the 2024 tour. Exclusive backstage NFT perks included for early secondary buyers.</p>
                <div className="flex gap-4">
                  <button className="bg-primary text-on-primary-fixed px-8 py-3 rounded-xl font-black tracking-tight active:scale-95 transition-all">View All 12 Passes</button>
                </div>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img alt="Featured Event" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjNn3Sh3BDx3IYaIhpGzKhd_AoHX0BYm7qKbBPDsVgWPMD6MZgIGZNZxI0C9CG8LT8a548D4qqlSz0hJtj-eziZrHeFHAYtxrovCCmgb7nBjgj4hryNMM4BM_F9Mu5lFVp6eyZKaJaLwV6tM-mw5iKXUVG1rQQVZ9moOf09BrnvCxzPf9LmfQXaFXVxlJsShK0c3NeTEgNJSOm11anQ83Dd4aGNIvOlEtWx3R1xg5FApdoWRvIbectJdbAeaXJpmANyztE8LEFlA7N" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
