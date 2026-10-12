import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CartPage } from './pages/CartPage';
import { NearbyMapPage } from './pages/NearbyMapPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { AddProductPage } from './pages/AddProductPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { NGOPage } from './pages/NGOPage';
import { OrdersPage } from './pages/OrdersPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#F3F7FB] text-[#102A43]">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/nearby" element={<NearbyMapPage />} />
              
              {/* Seller portal */}
              <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
              <Route path="/seller/add" element={<AddProductPage />} />
              <Route path="/seller/listings" element={<MyListingsPage />} />

              {/* AI & Intelligence */}
              <Route path="/ai-insights" element={<AIInsightsPage />} />
              <Route path="/redistribution" element={<AIInsightsPage />} />

              {/* Workflows */}
              <Route path="/ngo" element={<NGOPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </MarketplaceProvider>
  );
}

export default App;
