import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWeb3 } from '../hooks/useWeb3';

const MyTickets: React.FC = () => {
  const { walletAddress } = useWeb3();

  return (
    <>
      <Header />
      <div className="pt-24 flex min-h-screen">
        {/* SideNavBar (Desktop Only) */}
        <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#1c1b1b] flex-col gap-2 py-8 pt-24 px-4 font-body font-medium z-40">
          <div className="mb-8 px-4">
            <div className="text-xl font-bold text-[#e5e2e1] mb-1">Collector Alpha</div>
            <div className="text-xs opacity-60 font-mono">{walletAddress ? `${walletAddress.substring(0,6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Not Connected'}</div>
            <button className="mt-4 text-xs text-[#ffb3ae] hover:underline uppercase tracking-widest transition-all">View Profile</button>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 bg-[#2a2a2a] text-[#ffb3ae] rounded-lg px-4 py-3 active:translate-x-1 duration-150 transition-all" href="#">
              <span className="material-symbols-outlined">confirmation_number</span>
              <span>My Tickets</span>
            </a>
            <a className="flex items-center gap-3 text-[#e5e2e1] opacity-60 px-4 py-3 hover:bg-[#2a2a2a] hover:opacity-100 transition-all active:translate-x-1 duration-150" href="#">
              <span className="material-symbols-outlined">grid_view</span>
              <span>Collections</span>
            </a>
            <a className="flex items-center gap-3 text-[#e5e2e1] opacity-60 px-4 py-3 hover:bg-[#2a2a2a] hover:opacity-100 transition-all active:translate-x-1 duration-150" href="#">
              <span className="material-symbols-outlined">insights</span>
              <span>Activity</span>
            </a>
            <a className="flex items-center gap-3 text-[#e5e2e1] opacity-60 px-4 py-3 hover:bg-[#2a2a2a] hover:opacity-100 transition-all active:translate-x-1 duration-150" href="#">
              <span className="material-symbols-outlined">favorite</span>
              <span>Favorites</span>
            </a>
            <a className="flex items-center gap-3 text-[#e5e2e1] opacity-60 px-4 py-3 hover:bg-[#2a2a2a] hover:opacity-100 transition-all active:translate-x-1 duration-150" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Canvas */}
        <main className="md:pl-64 pb-12 px-6 min-h-screen w-full">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter text-on-surface mb-2">My Tickets</h1>
                <p className="text-on-surface-variant max-w-xl text-lg">Your gateway to exclusive digital experiences. Manage, trade, or enter your next event.</p>
              </div>
              <div className="bg-surface-container-high rounded-xl p-6 min-w-[280px] glass-card">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-label opacity-60 text-sm">Wallet Balance</span>
                  <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                </div>
                <div className="text-3xl font-headline font-bold text-on-surface">12.48 ETH</div>
                <div className="text-sm text-tertiary-fixed-dim mt-1">≈ $42,910.24 USD</div>
              </div>
            </header>

            {/* Bento Grid - Upcoming */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-headline font-bold text-primary">Upcoming Events</h2>
                <span className="h-[1px] flex-grow mx-8 bg-outline-variant/20 hidden md:block"></span>
                <div className="flex gap-2">
                  <button className="p-2 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-lg">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-2 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-lg">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Featured Ticket (Large) */}
                <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-surface-container-high">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
                  <img alt="Cyber Concert" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDpEO9iVj4JR6qhY3Nt46I0POr3-e2-dgX2js6X2Wez30DHLctv0PWcIdW5C7DxasrT6jHf9_PMqnDr3WafWy9wFWLaKe7bU9yrGd0u9PdrNDzNnPwzJTbQjpFvtqTPY0XwgoMjcQ_vVk0C_wyZgGuq4LSGwgUORePLQoVsOL69NW4EqDF-my8NFMxmvJjDI-pg7NxYBq4eQ6Oj_OiHMnps62kwWVVSbVtZXtYtZ1Yp4EK8Cp2aZ62a-PIeZivpnfZkOFeZhXFtfhu" />
                  <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">VIP Pass</span>
                      <h3 className="text-4xl font-headline font-black tracking-tight text-on-surface mb-2">NEON VOID: SYMPHONY</h3>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span className="text-sm font-label">OCT 24, 2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span className="text-sm font-label">Virtual Arena 01</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="bg-on-surface text-surface px-6 py-3 rounded-lg font-headline font-bold active:scale-95 transition-all">Enter Gate</button>
                      <button className="border border-outline-variant/40 hover:border-primary/60 text-on-surface px-6 py-3 rounded-lg font-headline font-bold active:scale-95 transition-all">List for Sale</button>
                    </div>
                  </div>
                </div>

                {/* Secondary Ticket (Tall) */}
                <div className="md:col-span-4 rounded-xl bg-surface-container-high p-6 flex flex-col border border-outline-variant/10">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden mb-6 relative">
                    <img alt="Art Exhibit" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbUUsvSOzjgudE1IqVjrvbcqy0Qb1o_oN7dBQn76CcbCg-43IDAsPoNL99WLI-JvfhIpzKQhHRswEg1zrbi0Kjn5jU7NUt29ltROO-KTZDrBHJ6P6YRQWeyFfbx8TcGQ8gEuSyan6DrS3pc7IBprfz6-rov-zXUz24glNjr-iN0GtHxqoUCmTaZQ1fmC2IakZ41tiySRiJs1--pxffIdY_edr5fWMs3WUT1KwcHATwbDRqwbnRoMh1eRQLn6x1REmkQJlOOaIQQDwH" />
                    <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md p-2 rounded-lg text-primary">
                      <span className="text-xs font-headline font-bold tracking-widest">#8821</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-1">Etheric Landscapes</h3>
                  <p className="text-sm text-on-surface-variant mb-6">Digital Art Vernissage</p>
                  <div className="mt-auto space-y-3">
                    <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed py-3 rounded-lg font-headline font-bold transition-all hover:opacity-90 active:scale-[0.98]">View QR Code</button>
                    <button className="w-full text-sm font-bold opacity-60 hover:opacity-100 transition-all py-2">List for Sale</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Past Events - Horizontal List */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface-variant mb-8">Past Experiences</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Past Item 1 */}
                <div className="group">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-500">
                    <img alt="Festival" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5_ZEU2HM-hDOveWO-kLtmZrXJ0xG45R8MuY7WNbCBL0ZZ0JhRkfpRgcmy_p-NiZIMChVumIgKVmlO9JKALw52eCcFwG4xqltKJLV8qkcV_H7O7UGIwI001FOXiPLKELqzqQPL2AmPEvtntlTJMG-B0aiF9cNlPNeh3NZu7YBctJNZjPrL67bYLNfIjlivqIbRamo7G2N4wCKge861TXIiuRxZAY5QvtuE692DjjAbfVV_bvXqUB8Q1wzyucAoM1N3kJMIt_A5AoB" />
                    <div className="absolute inset-0 bg-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-surface text-on-surface px-4 py-2 rounded-full font-bold text-xs uppercase tracking-tighter">View Recap</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-on-surface opacity-80 group-hover:opacity-100 transition-opacity">Pulse Underground</h4>
                      <p className="text-xs text-on-tertiary-fixed-variant">Aug 12, 2024 • Berlin</p>
                    </div>
                    <span className="text-[10px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant font-bold">EXPIRED</span>
                  </div>
                </div>
                {/* Past Item 2 */}
                <div className="group">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-500">
                    <img alt="Gaming" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUVZE1jpftq-PyoceiNinAuZ4xvC_gm0CJcbD-yoPifwy_bH9E8G4APqsDLk7tBG_uQC09FhmFINOldcaUwH06mGE_SjKy-Sm55qHjwOjQRI9bBRNUuCtkxrAgB3fiMwdzz8K_eScbJMVhUkslfjg0mHCdLWjinU3MbcS0KpfH2wzk7Xkt8lOn7Ls1Yg2ZmhavH-kV1MLY-IEpJ9q02cIstBWFkgwLcHNJAju0UwSjHEibTkOje9RII6Z97LmswO0rucxPWw81pVF8" />
                    <div className="absolute inset-0 bg-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-surface text-on-surface px-4 py-2 rounded-full font-bold text-xs uppercase tracking-tighter">View Recap</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-on-surface opacity-80 group-hover:opacity-100 transition-opacity">Genesis League Finals</h4>
                      <p className="text-xs text-on-tertiary-fixed-variant">June 04, 2024 • Meta-Stadium</p>
                    </div>
                    <span className="text-[10px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant font-bold">EXPIRED</span>
                  </div>
                </div>
                {/* Past Item 3 */}
                <div className="group">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-500">
                    <img alt="Conference" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYLeS0M5hk4PkaycPcTcS5WjnWKXSGgAGRDosJ-VvgJAUIcxVa_LTbFMbznywvgrmaWmWS9yd9c-E5zaWPng4gr-usIehSdYcgfQV89B6GzL9CIOxGlZDiHqcyC9Qcy2sJfhXY9XOqURyUCZRrjZKavxdErx_TYMAzkKm-9Hy-hs2CHlRDtEYxeavW3OPTxAh22Wn40V2Fw0DIP6-xx8ZZZvE01fXst2o74ZUSifTYBJuANK6go4nFoGIYPtHytyClRXU_g_fUDja-" />
                    <div className="absolute inset-0 bg-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-surface text-on-surface px-4 py-2 rounded-full font-bold text-xs uppercase tracking-tighter">View Recap</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline font-bold text-on-surface opacity-80 group-hover:opacity-100 transition-opacity">Web3 Summit: NYC</h4>
                      <p className="text-xs text-on-tertiary-fixed-variant">May 21, 2024 • New York City</p>
                    </div>
                    <span className="text-[10px] bg-surface-container-highest px-2 py-1 rounded text-on-surface-variant font-bold">EXPIRED</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MyTickets;
