import React from 'react';
import { KOL } from '@/data/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, StarOff, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface KOLTableRowProps {
  kol: KOL;
  rank: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function KOLTableRow({ kol, rank, isFavorite = false, onToggleFavorite }: KOLTableRowProps) {
  const { t, language } = useLanguage();
  const { isPremium } = useAuth();
  const navigate = useNavigate();

  // Функция для форматирования числа подписчиков
  const formatFollowers = (followers: number) => {
    if (followers >= 1000000) {
      return `${(followers / 1000000).toFixed(1)}M`;
    } else if (followers >= 1000) {
      return `${(followers / 1000).toFixed(1)}K`;
    } else {
      return followers.toString();
    }
  };

  // Суммируем подписчиков со всех платформ
  const totalFollowers = kol.platforms.reduce((sum, platform) => sum + platform.followers, 0);

  // Получаем основную платформу (с наибольшим количеством подписчиков)
  const mainPlatform = kol.platforms.reduce(
    (max, platform) => (platform.followers > max.followers ? platform : max),
    kol.platforms[0]
  );

  // Обработка клика по строке для перехода на страницу KOL
  const handleRowClick = () => {
    // Если это премиум KOL и пользователь без премиум-доступа, показываем сообщение
    if (kol.premium && !isPremium) {
      return;
    }
    navigate(`/kol-profile/${kol.id}`);
  };

  // Обработка нажатия на кнопку "Подробнее"
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем срабатывание обработчика клика по строке
    navigate(`/kol-profile/${kol.id}`);
  };

  // Обработка добавления/удаления из избранного
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем срабатывание обработчика клика по строке
    if (onToggleFavorite) {
      onToggleFavorite(kol.id);
    }
  };

  // Используем правильные переводы для частоты сигналов
  const translateSignalFreq = (freq: string) => {
    // Создаем ключи для перевода
    const signalFreqKey = freq.toLowerCase().replace(/\s+/g, '_');
    return t(signalFreqKey as any) || freq;
  };

  return (
    <tr 
      className={`border-b border-white/10 hover:bg-black/20 transition-colors cursor-pointer ${kol.premium && !isPremium ? 'opacity-50' : ''}`}
      onClick={handleRowClick}
    >
      <td className="px-3 py-4 font-semibold text-center">{rank}</td>
      <td className="px-3 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="font-medium">{kol.name}</div>
            <div className="text-xs text-gray-400">
              {kol.language === 'Both' ? 'EN/RU' : kol.language}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2">
            {mainPlatform.name === 'Twitter' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            )}
            {mainPlatform.name === 'Telegram' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.75 8.34l-1.85 8.7c-.14.62-.5.77-.99.47l-2.77-2.04-1.33 1.28c-.14.14-.28.28-.56.28l.2-2.79L16.59 9c.35-.31-.08-.45-.52-.17l-7.12 4.47-3.05-.95c-.67-.21-.68-.67.14-.99L16.5 7.33c.56-.21 1.04.13 1.25 1.01z" />
              </svg>
            )}
            {mainPlatform.name === 'YouTube' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M23.498 6.186a2.815 2.815 0 00-2.029-1.998C19.995 4 12 4 12 4s-7.995 0-9.47.188a2.815 2.815 0 00-2.03 1.998C.3 7.652 0 10.826 0 12s.3 4.348.5 5.814a2.815 2.815 0 002.03 1.998C4.005 20 12 20 12 20s7.995 0 9.469-.188a2.815 2.815 0 002.03-1.998C23.7 16.348 24 13.174 24 12s-.3-4.348-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            )}
            {mainPlatform.name === 'Discord' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            )}
          </div>
          <span>{mainPlatform.name}</span>
        </div>
      </td>
      <td className="px-3 py-4 text-right">{formatFollowers(totalFollowers)}</td>
      <td className="px-3 py-4">{kol.signalFrequency}</td>
      <td className="px-3 py-4">
        <div className="flex items-center">
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-neon-purple h-1.5 rounded-full" 
              style={{ width: `${kol.engagement}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs">{kol.engagement}%</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <Badge 
          variant={kol.reputation === 'Clean' ? 'default' : 'destructive'}
          className={kol.reputation === 'Clean' ? 'bg-green-600/20 text-green-400' : ''}
        >
          {kol.reputation}
        </Badge>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center">
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                kol.accuracy > 75 ? 'bg-green-500' : 
                kol.accuracy > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${kol.accuracy}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs">{kol.accuracy}%</span>
        </div>
      </td>
      <td className="px-3 py-4">
        <div className="flex space-x-2">
          {isPremium && onToggleFavorite && (
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? (
                <StarOff className="h-4 w-4 text-yellow-400" />
              ) : (
                <Star className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="border-white/20"
            onClick={handleDetailsClick}
            disabled={kol.premium && !isPremium}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            {t('details')}
          </Button>
        </div>
      </td>
    </tr>
  );
}
