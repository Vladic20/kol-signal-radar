
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import KolDashboardPage from "./pages/KolDashboardPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import KolPage from "./pages/KolPage";
import KolProfilePage from "./pages/KolProfilePage";
import TradingViewCallerPage from "./pages/TradingViewCallerPage";
import TradingViewCallerProfilePage from "./pages/TradingViewCallerProfilePage";
import SignalsPage from "./pages/SignalsPage";
import CryptoNewsPage from "./pages/CryptoNewsPage";
import FeedPage from "./pages/FeedPage";
import PostDetailPage from "./pages/PostDetailPage";
import CopyTradingPage from "./pages/CopyTradingPage";
import TokenPositionsPage from "./pages/TokenPositionsPage";
import PresentationPage from "./pages/PresentationPage";
import FaqPage from "./pages/FaqPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/user-dashboard" element={<UserDashboardPage />} />
                <Route path="/kol-dashboard" element={<KolDashboardPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/kol/:id" element={<KolPage />} />
                <Route path="/kol-profile/:id" element={<KolProfilePage />} />
                <Route path="/tradingview-caller/:id" element={<TradingViewCallerPage />} />
                <Route path="/tradingview-caller-profile/:id" element={<TradingViewCallerProfilePage />} />
                <Route path="/signals" element={<SignalsPage />} />
                <Route path="/news" element={<CryptoNewsPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route path="/copy-trading" element={<CopyTradingPage />} />
                <Route path="/token-positions" element={<TokenPositionsPage />} />
                <Route path="/presentation" element={<PresentationPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
