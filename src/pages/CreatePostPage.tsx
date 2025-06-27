
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, TrendingUp, X, Lock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [content, setContent] = useState('');
  const [includeSignal, setIncludeSignal] = useState(false);
  const [signalData, setSignalData] = useState({
    symbol: '',
    direction: 'Long' as 'Long' | 'Short',
    entryPrice: '',
    target: '',
    stopLoss: '',
    confidence: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // TODO: Implement post creation logic
    console.log('Creating post:', { content, includeSignal, signalData, tags, isPremium });
    navigate('/feed');
  };

  const coins = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT'];

  return (
    <div className={`min-h-screen bg-background ${isMobile ? 'pt-16 pb-24' : 'pt-20'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 p-0 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Создать пост</h1>
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-neon-purple hover:bg-neon-purple/80 px-6"
        >
          Опубликовать
        </Button>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Content */}
        <div>
          <Textarea
            placeholder="Поделитесь вашими торговыми инсайтами, анализом или мыслями..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-black/40 border-white/10 min-h-[120px] text-base resize-none"
            rows={6}
          />
          <div className="text-right text-sm text-gray-400 mt-2">
            {content.length}/280
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Теги (максимум 5)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/20 text-gray-300 text-sm py-1">
                #{tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-2 hover:bg-transparent"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Добавить тег..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              className="bg-black/40 border-white/10"
            />
            <Button 
              onClick={handleAddTag} 
              variant="outline" 
              className="border-white/20"
              disabled={tags.length >= 5}
            >
              Добавить
            </Button>
          </div>
        </div>

        {/* Include Signal Toggle */}
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-neon-purple" />
                <div>
                  <span className="font-medium text-white">Торговый сигнал</span>
                  <p className="text-sm text-gray-400">Добавить прогноз к посту</p>
                </div>
              </div>
              <Switch checked={includeSignal} onCheckedChange={setIncludeSignal} />
            </div>
          </CardContent>
        </Card>

        {/* Signal Data */}
        {includeSignal && (
          <Card className="glass-effect border-neon-purple/20">
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium text-white flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-neon-purple" />
                Детали сигнала
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Монета</label>
                  <Select value={signalData.symbol} onValueChange={(value) => setSignalData({ ...signalData, symbol: value })}>
                    <SelectTrigger className="bg-black/40 border-white/10">
                      <SelectValue placeholder="Выберите монету" />
                    </SelectTrigger>
                    <SelectContent>
                      {coins.map((coin) => (
                        <SelectItem key={coin} value={coin}>{coin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Направление</label>
                  <Select value={signalData.direction} onValueChange={(value: 'Long' | 'Short') => setSignalData({ ...signalData, direction: value })}>
                    <SelectTrigger className="bg-black/40 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Long">🟢 Long</SelectItem>
                      <SelectItem value="Short">🔴 Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Цена входа</label>
                  <Input
                    placeholder="48000"
                    value={signalData.entryPrice}
                    onChange={(e) => setSignalData({ ...signalData, entryPrice: e.target.value })}
                    className="bg-black/40 border-white/10"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Цель</label>
                    <Input
                      placeholder="52000"
                      value={signalData.target}
                      onChange={(e) => setSignalData({ ...signalData, target: e.target.value })}
                      className="bg-black/40 border-white/10"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Стоп-лосс</label>
                    <Input
                      placeholder="44000"
                      value={signalData.stopLoss}
                      onChange={(e) => setSignalData({ ...signalData, stopLoss: e.target.value })}
                      className="bg-black/40 border-white/10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Уверенность (%)</label>
                  <Input
                    placeholder="85"
                    value={signalData.confidence}
                    onChange={(e) => setSignalData({ ...signalData, confidence: e.target.value })}
                    className="bg-black/40 border-white/10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Premium Post Toggle */}
        <Card className="glass-effect border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-yellow-500" />
                <div>
                  <span className="font-medium text-white">Премиум пост</span>
                  <p className="text-sm text-gray-400">Только для подписчиков</p>
                </div>
              </div>
              <Switch checked={isPremium} onCheckedChange={setIsPremium} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePostPage;
