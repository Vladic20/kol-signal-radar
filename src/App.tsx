
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ApiProvider } from "@/contexts/ApiContext";

// Pages
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import FeedPage from "./pages/FeedPage";
import SignalsPage from "./pages/SignalsPage";
import PostDetailPage from "./pages/PostDetailPage";
import KolPage from "./pages/KolPage";
import TradingViewCallerPage from "./pages/TradingViewCallerPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import CryptoNewsPage from "./pages/CryptoNewsPage";
import CopyTradingPage from "./pages/CopyTradingPage";
import TokenPositionsPage from "./pages/TokenPositionsPage";
import PresentationPage from "./pages/PresentationPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 минут
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <ApiProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/signals" element={<SignalsPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/crypto-news" element={<CryptoNewsPage />} />
                <Route path="/copy-trading" element={<CopyTradingPage />} />
                <Route path="/token-positions" element={<TokenPositionsPage />} />
                <Route path="/presentation" element={<PresentationPage />} />
                <Route path="/kol/:id" element={<KolPage />} />
                <Route path="/tradingview-caller/:id" element={<TradingViewCallerPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ApiProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
