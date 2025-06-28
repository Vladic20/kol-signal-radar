
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, TrendingUp, Target, StopCircle, Lock } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
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
    console.log('Creating post:', { content, includeSignal, signalData, tags, isPremium });
    onClose();
  };

  const coins = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT', 'MATIC/USDT', 'AVAX/USDT'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Создать пост</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content */}
          <div>
            <Textarea
              placeholder="Поделитесь вашими торговыми инсайтами, анализом рынка или прогнозами..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-black/40 border-white/10 min-h-[120px] text-base resize-none"
              rows={6}
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              {content.length}/280
            </div>
          </div>

          {/* Include Signal Toggle */}
          <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-neon-purple" />
              <div>
                <span className="font-medium text-white">Торговый сигнал</span>
                <p className="text-sm text-gray-400">Добавить торговый прогноз к посту</p>
              </div>
            </div>
            <Switch checked={includeSignal} onCheckedChange={setIncludeSignal} />
          </div>

          {/* Signal Data */}
          {includeSignal && (
            <div className="bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 border border-neon-purple/20 p-4 rounded-lg space-y-4">
              <h4 className="font-medium text-white flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-neon-purple" />
                Детали торгового сигнала
              </h4>
              
              {/* Coin and Direction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Торговая пара</label>
                  <Select value={signalData.symbol} onValueChange={(value) => setSignalData({ ...signalData, symbol: value })}>
                    <SelectTrigger className="bg-black/40 border-white/10">
                      <SelectValue placeholder="Выберите монету" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-white/10">
                      {coins.map((coin) => (
                        <SelectItem key={coin} value={coin}>{coin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Направление сделки</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={signalData.direction === 'Long' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSignalData({ ...signalData, direction: 'Long' })}
                      className={signalData.direction === 'Long' ? 'bg-green-500 hover:bg-green-600' : 'border-white/20'}
                    >
                      🟢 Long
                    </Button>
                    <Button
                      type="button"
                      variant={signalData.direction === 'Short' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSignalData({ ...signalData, direction: 'Short' })}
                      className={signalData.direction === 'Short' ? 'bg-red-500 hover:bg-red-600' : 'border-white/20'}
                    >
                      🔴 Short
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Price Levels */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Цена входа (USDT)
                  </label>
                  <Input
                    placeholder="48000"
                    value={signalData.entryPrice}
                    onChange={(e) => setSignalData({ ...signalData, entryPrice: e.target.value })}
                    className="bg-black/40 border-white/10"
                    type="number"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-1 text-green-400" />
                      Take Profit (USDT)
                    </label>
                    <Input
                      placeholder="52000"
                      value={signalData.target}
                      onChange={(e) => setSignalData({ ...signalData, target: e.target.value })}
                      className="bg-black/40 border-white/10"
                      type="number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center">
                      <StopCircle className="w-4 h-4 mr-1 text-red-400" />
                      Stop Loss (USDT)
                    </label>
                    <Input
                      placeholder="44000"
                      value={signalData.stopLoss}
                      onChange={(e) => setSignalData({ ...signalData, stopLoss: e.target.value })}
                      className="bg-black/40 border-white/10"
                      type="number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Уверенность в сигнале (%)</label>
                  <Input
                    placeholder="85"
                    value={signalData.confidence}
                    onChange={(e) => setSignalData({ ...signalData, confidence: e.target.value })}
                    className="bg-black/40 border-white/10"
                    type="number"
                    max="100"
                    min="1"
                  />
                </div>
              </div>
            </div>
          )}

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
                disabled={tags.length >= 5 || !newTag.trim()}
              >
                Добавить
              </Button>
            </div>
          </div>

          {/* Premium Post Toggle */}
          <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-yellow-500" />
              <div>
                <span className="font-medium text-white">Премиум пост</span>
                <p className="text-sm text-gray-400">Доступен только подписчикам</p>
              </div>
            </div>
            <Switch checked={isPremium} onCheckedChange={setIsPremium} />
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-white/20"
            >
              Отмена
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex-1 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            >
              Опубликовать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
