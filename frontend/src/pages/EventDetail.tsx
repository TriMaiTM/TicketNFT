import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWeb3 } from '../hooks/useWeb3';
import { getTicketNFTContract } from '../hooks/useContracts';
import { parseEther } from 'ethers';

interface EventData {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  priceEth: number;
  imageUrl: string;
  totalTickets: number;
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const { walletAddress, signer } = useWeb3();
  const [isMinting, setIsMinting] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/events/${id}`)
        .then(res => res.json())
        .then(resData => {
          if (resData.success) setEvent(resData.data);
        })
        .catch(err => console.error("Failed to fetch event details", err));
    }
  }, [id]);

  if (!event) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-20 flex justify-center items-center min-h-[60vh]">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Main Content Canvas */}
      <main className="pt-24 pb-20">
        {/* Hero Section: Large Event Banner */}
        <section className="relative w-full h-[614px] overflow-hidden px-6 lg:px-12">
          <div className="absolute inset-0 z-0">
            <img alt={event.title} className="w-full h-full object-cover" src={event.imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end pb-12">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full w-fit mb-4">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs font-headline font-bold tracking-widest">EXCLUSIVE DROP</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-none mb-4 uppercase">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span>{event.location}</span>
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
              <p className="text-lg text-on-surface/80 leading-relaxed font-body whitespace-pre-line">
                {event.description}
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
                <span className="text-xl font-headline font-bold text-on-surface">Dynamic NFT</span>
              </div>
              <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
                <span className="block text-xs text-on-surface-variant uppercase mb-2">Supply</span>
                <span className="text-xl font-headline font-bold text-on-surface">{event.totalTickets} Max</span>
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
                      <span className="text-3xl font-headline font-bold">{event.priceEth} ETH</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/10">
                  <span className="text-sm">Network Fee</span>
                  <span className="text-sm font-bold">Variable</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={async () => {
                    if (!walletAddress || !signer) {
                      alert("Please connect your wallet first via the Header.");
                      return;
                    }
                    if (!event) return;

                    try {
                      setIsMinting(true);
                      const ticketNFTContract = getTicketNFTContract(signer);
                      const priceEthEth = event.priceEth.toString();
                      
                      const tx = await ticketNFTContract.mintTicket(event._id, {
                        value: parseEther(priceEthEth)
                      });
                      
                      const receipt = await tx.wait();
                      
                      // Extract the tokenId from the Transfer event
                      let mintedTokenId = Math.floor(Math.random() * 10000); 
                      for (const log of receipt.logs) {
                        try {
                          const parsedLog = ticketNFTContract.interface.parseLog(log);
                          if (parsedLog && parsedLog.name === 'Transfer') {
                            mintedTokenId = Number(parsedLog.args[2]);
                            break;
                          }
                        } catch(e) {}
                      }

                      // Save to backend
                      const response = await fetch('http://localhost:5000/api/tickets/mint', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          eventId: event._id,
                          tokenId: mintedTokenId,
                          ownerAddress: walletAddress
                        })
                      });
                      
                      const data = await response.json();
                      if (data.success) {
                        alert('Ticket successfully minted and saved!');
                      } else {
                        alert('Ticket minted on chain, but failed to save to database.');
                      }
                    } catch (err: any) {
                      console.error("Minting failed", err);
                      alert("Minting failed: " + (err.message || "Unknown error"));
                    } finally {
                      setIsMinting(false);
                    }
                  }}
                  disabled={isMinting}
                  className={`w-full ${isMinting ? 'bg-surface-container text-on-surface-variant' : 'obsidian-gradient text-on-primary-fixed shadow-[0_10px_30px_rgba(255,83,82,0.3)] hover:opacity-90 active:scale-95'} py-4 rounded-xl font-headline font-extrabold text-lg transition-all`}
                >
                  {isMinting ? 'MINTING...' : 'BUY TICKET'}
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
