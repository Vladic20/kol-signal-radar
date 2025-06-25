
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Code, 
  Heart, 
  BookOpen, 
  MessageCircle 
} from 'lucide-react';
import { TradingViewCaller } from '@/data/tradingViewCallers';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContentTabsProps {
  caller: TradingViewCaller;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const ContentTabs = ({ caller, activeTab, onTabChange }: ContentTabsProps) => {
  const isMobile = useIsMobile();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={isMobile ? 'px-4' : 'px-0'}>
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-4 max-w-lg bg-black/20 border border-white/10 mb-6">
          <TabsTrigger value="ideas" className="data-[state=active]:bg-blue-500/20">
            <FileText className="w-4 h-4 mr-1" />
            Ideas ({caller.ideas})
          </TabsTrigger>
          <TabsTrigger value="scripts" className="data-[state=active]:bg-blue-500/20">
            <Code className="w-4 h-4 mr-1" />
            Scripts ({caller.scripts})
          </TabsTrigger>
          <TabsTrigger value="likes" className="data-[state=active]:bg-blue-500/20">
            <Heart className="w-4 h-4 mr-1" />
            Likes ({formatNumber(caller.likes)})
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-blue-500/20">
            <BookOpen className="w-4 h-4 mr-1" />
            Education
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ideas" className="space-y-4">
          {caller.recentIdeas.map(idea => (
            <Card key={idea.id} className="glass-effect border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{idea.title}</h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <span>{idea.symbol}</span>
                      <Badge className={`${
                        idea.direction === 'Long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {idea.direction}
                      </Badge>
                      <span>{idea.timeframe}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">+{idea.profit}%</div>
                    <div className="text-xs text-gray-400">{idea.date}</div>
                  </div>
                </div>
                
                <div className="h-32 bg-gray-800 rounded mb-3 overflow-hidden">
                  <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 100) + 20}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 50) + 5}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20">
                    View Idea
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Scripts and indicators will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="likes" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Liked ideas will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Educational content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;
