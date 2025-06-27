
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import KolProfilePage from './pages/KolProfilePage';
import CopyTradingPage from './pages/CopyTradingPage';
import DashboardPage from './pages/DashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import SignalsPage from './pages/SignalsPage';
import TokenPositionsPage from './pages/TokenPositionsPage';
import CryptoNewsPage from './pages/CryptoNewsPage';
import FaqPage from './pages/FaqPage';
import CreatePostPage from './pages/CreatePostPage';
import AchievementsPage from './pages/AchievementsPage';
import MobileProfilePage from './pages/MobileProfilePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import SettingsPage from './pages/SettingsPage';
import ReferralsPage from './pages/ReferralsPage';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

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
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/token-positions" element={<TokenPositionsPage />} />
              <Route path="/crypto-news" element={<CryptoNewsPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/mobile-profile" element={<MobileProfilePage />} />
              <Route path="/subscriptions" element={<SubscriptionsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/referrals" element={<ReferralsPage />} />
            </Routes>
          </div>
        </LanguageProvider>  
      </AuthProvider>
    </Router>
  );
}

export default App;
