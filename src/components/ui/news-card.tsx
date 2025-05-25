
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  source: string;
  url?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  category,
  publishedAt,
  imageUrl,
  source,
  url
}) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cryptocurrency':
      case 'криптовалюты':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
      case 'memcoin':
      case 'мемкоины':
        return 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30';
      case 'dex':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30';
      case 'exchanges':
      case 'биржи':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30';
      case 'sandbox':
      case 'песочница':
        return 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="glass-effect hover:border-neon-purple/30 transition-all duration-300 group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <Badge className={`${getCategoryColor(category)} border`}>
            {category}
          </Badge>
          <div className="flex items-center text-gray-400 text-xs">
            <Clock size={12} className="mr-1" />
            {formatDate(publishedAt)}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-neon-blue transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Источник: {source}
          </span>
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-blue hover:text-neon-purple transition-colors flex items-center text-xs"
            >
              Читать полностью
              <ExternalLink size={12} className="ml-1" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
