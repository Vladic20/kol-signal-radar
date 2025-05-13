
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Signal, KOL } from '@/data/mockData';
import { PricePoint } from '@/data/signal-history';
import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

interface SignalDetailDialogProps {
  signal: Signal;
  kol: KOL;
  priceHistory: PricePoint[];
  open: boolean;
  onClose: () => void;
}

export function SignalDetailDialog({ signal, kol, priceHistory, open, onClose }: SignalDetailDialogProps) {
  const { t, language } = useLanguage();
  
  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Format relative time (e.g., "2 days ago")
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: language === 'en' ? enUS : ru
    });
  };
  
  // Format X-axis dates
  const formatXAxis = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  // Translate signal types and status
  const translateType = (type: string) => {
    if (type.toLowerCase() === "long") return t("long");
    if (type.toLowerCase() === "short") return t("short");
    return type;
  };
  
  const translateStatus = (status: string) => {
    if (status.toLowerCase() === "open") return t("open");
    if (status.toLowerCase() === "closed") return t("closed");
    if (status.toLowerCase() === "canceled") return t("canceled");
    return status;
  };
  
  // Find min and max prices for chart display
  const prices = priceHistory.map(point => point.price);
  const minPrice = Math.min(...prices) * 0.99;
  const maxPrice = Math.max(...prices) * 1.01;
  
  // Custom chart tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border p-2 rounded shadow-lg text-xs">
          <p>{formatDate(label)}</p>
          <p className="font-semibold text-neon-blue">
            Price: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[650px] bg-background border-border p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold">{signal.asset}</DialogTitle>
              <Badge variant={signal.type === 'Long' ? 'default' : 'destructive'} className="bg-gradient-to-r from-neon-green to-neon-blue text-white">
                {translateType(signal.type)}
              </Badge>
              <Badge variant={
                signal.status === 'Open' ? 'outline' : 
                signal.status === 'Closed' ? 'default' : 'secondary'
              }>
                {translateStatus(signal.status)}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatTimeAgo(signal.date)}
            </span>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={kol.avatar} alt={kol.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm">{kol.name}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            {signal.description || (language === 'en' ? 
              `${signal.type} position on ${signal.asset} with target at $${signal.targetPrice.toLocaleString()}.` : 
              `Позиция ${signal.type === 'Long' ? 'на повышение' : 'на понижение'} по ${signal.asset} с целью $${signal.targetPrice.toLocaleString()}.`
            )}
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-muted-foreground">{t('entryPrice')}</div>
              <div className="font-semibold">${signal.entryPrice.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{t('targetPrice')}</div>
              <div className="font-semibold">${signal.targetPrice.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{t('stopLoss')}</div>
              <div className="font-semibold">${signal.stopLoss.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <AspectRatio ratio={16/9} className="px-4 pb-6">
          <ChartContainer config={{
            price: { color: "#ffffff" },
            entry: { color: "#8B5CF6" },
            target: { color: "#10B981" },
            stopLoss: { color: "#EF4444" }
          }}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis} 
                stroke="#666666"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[minPrice, maxPrice]} 
                stroke="#666666" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={signal.entryPrice} 
                stroke="#8B5CF6" 
                strokeDasharray="3 3"
                label={{ 
                  value: language === 'en' ? 'Entry' : 'Вход', 
                  position: 'insideBottomRight',
                  fill: '#8B5CF6',
                  fontSize: 12
                }}
              />
              <ReferenceLine 
                y={signal.targetPrice} 
                stroke="#10B981" 
                strokeDasharray="3 3"
                label={{ 
                  value: language === 'en' ? 'Target' : 'Цель', 
                  position: 'insideTopRight',
                  fill: '#10B981',
                  fontSize: 12
                }}
              />
              <ReferenceLine 
                y={signal.stopLoss} 
                stroke="#EF4444" 
                strokeDasharray="3 3"
                label={{ 
                  value: language === 'en' ? 'Stop' : 'Стоп', 
                  position: 'insideBottomRight',
                  fill: '#EF4444',
                  fontSize: 12
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#60A5FA" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 5, stroke: '#60A5FA', strokeWidth: 1, fill: '#111827' }}
              />
            </LineChart>
          </ChartContainer>
        </AspectRatio>
        
        {signal.result && signal.status === 'Closed' && (
          <div className="px-6 pb-6">
            <div className="p-3 rounded bg-secondary/30 border border-border">
              <div className="text-sm mb-1">{language === 'en' ? 'Result' : 'Результат'}</div>
              <div className={`font-bold text-lg ${signal.result > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {signal.result > 0 ? '+' : ''}{signal.result}%
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
