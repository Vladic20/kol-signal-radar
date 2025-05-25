
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface SponsoredPostProps {
  title: string;
  description: string;
  sponsor: string;
  cta: string;
  image?: string;
}

export function SponsoredPost({ 
  title, 
  description, 
  sponsor, 
  cta,
  image = "/placeholder.svg"
}: SponsoredPostProps) {
  return (
    <Card className="bg-gradient-to-br from-black/40 to-black/60 border-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
            Спонсируемый пост
          </Badge>
          <span className="text-xs text-gray-400">от {sponsor}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-neon-blue" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div className="pt-2">
          <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center justify-center">
            {cta}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
