import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import KolProfilePage from './pages/KolProfilePage';
import CopyTradingPage from './pages/CopyTradingPage';
import DashboardPage from './pages/DashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FeedPage from './pages/FeedPage';
import SignalsPage from './pages/SignalsPage';
import TokenPositionsPage from './pages/TokenPositionsPage';
import CryptoNewsPage from './pages/CryptoNewsPage';
import FaqPage from './pages/FaqPage';
import AuthProvider from './contexts/AuthContext';
import LanguageProvider from './contexts/LanguageContext';
import MobileProfilePage from './pages/MobileProfilePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background bg-mesh">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/kol/:id" element={<KolProfilePage />} />
              <Route path="/kol-profile/:id" element={<KolProfilePage />} />
              <Route path="/copy-trading" element={<CopyTradingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/user-dashboard" element={<UserDashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/token-positions" element={<TokenPositionsPage />} />
              <Route path="/crypto-news" element={<CryptoNewsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/mobile-profile" element={<MobileProfilePage />} />
            </Routes>
          </div>
        </LanguageProvider>  
      </AuthProvider>
    </Router>
  );
}

export default App;
