import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWeb3 } from '../hooks/useWeb3';

const CreateEvent: React.FC = () => {
  const { walletAddress } = useWeb3();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    priceEth: 0.1,
    imageUrl: '',
    totalTickets: 100
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert("Sự kiện đã được tạo thành công!");
        window.location.href = `/event/${data.data._id}`;
      } else {
        alert("Lỗi khi tạo sự kiện: " + data.error);
      }
    } catch(err) {
      console.error(err);
      alert("Lỗi kết nối tới Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-headline font-black mb-8">Tạo Sự Kiện Mới (Cho BTC)</h1>
          <form onSubmit={handleSubmit} className="bg-surface-container p-8 rounded-2xl border border-outline-variant/20 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Tên sự kiện</label>
              <input required type="text" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none" 
                     value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="VD: The Eras Tour" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Mô tả</label>
              <textarea required rows={4} className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Nhập chi tiết về sự kiện..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Địa điểm</label>
                <input required type="text" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                       value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Sân vận động Mỹ Đình" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Ngày diễn ra</label>
                <input required type="date" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                       value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Giá vé (ETH)</label>
                <input required type="number" step="0.001" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                       value={formData.priceEth} onChange={e => setFormData({...formData, priceEth: parseFloat(e.target.value)})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Tổng số vé (Tối đa)</label>
                <input required type="number" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                       value={formData.totalTickets} onChange={e => setFormData({...formData, totalTickets: parseInt(e.target.value)})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">URL Hình ảnh Cover</label>
              <input required type="url" className="w-full bg-surface py-3 px-4 rounded-xl border border-outline-variant/30 focus:border-primary outline-none"
                     value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-on-primary-fixed py-4 rounded-xl font-headline font-bold mt-4 transition-all active:scale-95 disabled:opacity-50">
              {loading ? "Đang xử lý..." : "TẠO SỰ KIỆN MỚI"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateEvent;
