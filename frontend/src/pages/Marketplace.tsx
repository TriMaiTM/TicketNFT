import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface EventData {
  _id: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
}

interface TicketData {
  _id: string;
  tokenId: number;
  eventId: EventData;
}

interface ListingData {
  _id: string;
  ticketId: TicketData;
  sellerAddress: string;
  priceEth: number;
  status: string;
}

const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/marketplace')
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setListings(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch marketplace listings", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {/* Main Layout Container */}
      <div className="pt-24 flex min-h-screen w-full">
        {/* Sidebar Filter System */}
        <aside className="hidden xl:flex flex-col w-80 h-[calc(100vh-6rem)] sticky top-24 bg-surface-container-low px-6 py-8 overflow-y-auto">
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-24 bg-surface-container-high rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">inventory_2</span>
              <h3 className="text-xl font-headline font-bold mb-2">No active listings</h3>
              <p className="text-on-surface-variant">There are currently no tickets listed for sale on the marketplace.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {listings.map((listing) => {
                const event = listing.ticketId.eventId;
                return (
                  <div key={listing._id} className="group flex flex-col bg-surface-container-high rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300">
                    <div className="relative aspect-video">
                      <img alt={event.title} className="w-full h-full object-cover" src={event.imageUrl} />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-4 right-4 bg-surface-variant/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-primary/20">
                        <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-widest uppercase">Token #{listing.ticketId.tokenId}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline text-xl font-bold">{event.title}</h3>
                        <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">favorite</span>
                      </div>
                      <p className="text-on-tertiary-fixed-variant text-sm font-bold mb-6">
                        {new Date(event.date).toLocaleDateString()} • {event.location}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                        <div>
                          <span className="text-[10px] text-outline uppercase font-bold block mb-1">Asking Price</span>
                          <span className="text-xl font-mono font-bold text-primary">{listing.priceEth} ETH</span>
                        </div>
                        <Link to={`/event/${event._id}`} className="block text-center bg-on-surface text-surface py-2 px-6 rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all">
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Featured Horizontal Banner */}
          <div className="flex flex-col md:flex-row bg-primary-container/10 border border-primary/10 rounded-2xl overflow-hidden mt-8">
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
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
