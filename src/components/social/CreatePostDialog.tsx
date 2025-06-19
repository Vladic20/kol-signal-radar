
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImagePlus, TrendingUp, X } from 'lucide-react';

interface CreatePostDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ isOpen, setIsOpen }) => {
  const { language } = useLanguage();
  const [content, setContent] = useState('');
  const [includeSignal, setIncludeSignal] = useState(false);
  const [signalData, setSignalData] = useState({
    symbol: '',
    action: 'BUY' as 'BUY' | 'SELL' | 'HOLD',
    target: '',
    stopLoss: '',
    confidence: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
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
    setIsOpen(false);
    // Reset form
    setContent('');
    setIncludeSignal(false);
    setSignalData({ symbol: '', action: 'BUY', target: '', stopLoss: '', confidence: '' });
    setTags([]);
    setIsPremium(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {language === 'en' ? 'Create New Post' : 'Создать новый пост'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {language === 'en' ? 'Content' : 'Контент'}
            </label>
            <Textarea
              placeholder={language === 'en' 
                ? 'Share your trading insights, analysis, or thoughts...' 
                : 'Поделитесь вашими торговыми инсайтами, анализом или мыслями...'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-black/40 border-white/10 min-h-[120px]"
              rows={5}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {language === 'en' ? 'Tags' : 'Теги'}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-gray-300">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={language === 'en' ? 'Add tag...' : 'Добавить тег...'}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="bg-black/40 border-white/10"
              />
              <Button onClick={handleAddTag} variant="outline" className="border-white/20">
                {language === 'en' ? 'Add' : 'Добавить'}
              </Button>
            </div>
          </div>

          {/* Include Signal Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-neon-purple" />
              <span className="font-medium">
                {language === 'en' ? 'Include Trading Signal' : 'Включить торговый сигнал'}
              </span>
            </div>
            <Switch checked={includeSignal} onCheckedChange={setIncludeSignal} />
          </div>

          {/* Signal Data */}
          {includeSignal && (
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-white">
                {language === 'en' ? 'Signal Details' : 'Детали сигнала'}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {language === 'en' ? 'Symbol' : 'Символ'}
                  </label>
                  <Input
                    placeholder="BTC/USDT"
                    value={signalData.symbol}
                    onChange={(e) => setSignalData({ ...signalData, symbol: e.target.value })}
                    className="bg-black/40 border-white/10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {language === 'en' ? 'Action' : 'Действие'}
                  </label>
                  <select
                    value={signalData.action}
                    onChange={(e) => setSignalData({ ...signalData, action: e.target.value as 'BUY' | 'SELL' | 'HOLD' })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white"
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                    <option value="HOLD">HOLD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {language === 'en' ? 'Target Price' : 'Целевая цена'}
                  </label>
                  <Input
                    placeholder="48000"
                    value={signalData.target}
                    onChange={(e) => setSignalData({ ...signalData, target: e.target.value })}
                    className="bg-black/40 border-white/10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    {language === 'en' ? 'Stop Loss' : 'Стоп-лосс'}
                  </label>
                  <Input
                    placeholder="42000"
                    value={signalData.stopLoss}
                    onChange={(e) => setSignalData({ ...signalData, stopLoss: e.target.value })}
                    className="bg-black/40 border-white/10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {language === 'en' ? 'Confidence (%)' : 'Уверенность (%)'}
                </label>
                <Input
                  placeholder="85"
                  value={signalData.confidence}
                  onChange={(e) => setSignalData({ ...signalData, confidence: e.target.value })}
                  className="bg-black/40 border-white/10"
                />
              </div>
            </div>
          )}

          {/* Premium Post Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">
                {language === 'en' ? 'Premium Post' : 'Премиум пост'}
              </span>
              <p className="text-sm text-gray-400">
                {language === 'en' 
                  ? 'Only premium subscribers will see the full content' 
                  : 'Только премиум подписчики увидят полный контент'}
              </p>
            </div>
            <Switch checked={isPremium} onCheckedChange={setIsPremium} />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="border-white/20">
              {language === 'en' ? 'Cancel' : 'Отмена'}
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            >
              {language === 'en' ? 'Publish Post' : 'Опубликовать'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
