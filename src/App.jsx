import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Create from './pages/Create'
import Leaderboard from './pages/Leaderboard'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<Create />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#141414',
            border: '1px solid #333',
            color: '#fff',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.85rem',
            borderRadius: '10px',
          },
          success: { iconTheme: { primary: '#FFD700', secondary: '#000' } },
          error: { iconTheme: { primary: '#ff4444', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  )
}
