import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Marketplace from './pages/Marketplace';
import MyTickets from './pages/MyTickets';

function App() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body text-on-surface">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/my-tickets" element={<MyTickets />} />
      </Routes>
    </div>
  );
}

export default App;