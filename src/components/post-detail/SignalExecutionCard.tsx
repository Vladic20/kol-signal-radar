
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

interface SignalExecutionCardProps {
  signal: {
    symbol: string;
    action: 'BUY' | 'SELL';
    target: number;
    confidence: number;
    stopLoss?: number;
  };
  signalExecution: {
    status: 'active' | 'completed' | 'closed';
    daysActive: number;
    targetReached: number;
    avgTimeToTarget: number;
  };
  formatTime: (timestamp: string) => string;
  timestamp: string;
}

const SignalExecutionCard: React.FC<SignalExecutionCardProps> = ({
  signal,
  signalExecution,
  formatTime,
  timestamp
}) => {
  return (
    <>
      {/* Trading Signal Card */}
      <div className="mb-6 p-6 bg-black/40 border border-white/10 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            📊 Trading Signal
            <Badge className={
              signalExecution.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
              signalExecution.status === 'completed' ? 'bg-green-500/20 text-green-400' :
              'bg-gray-500/20 text-gray-400'
            }>
              {signalExecution.status === 'active' ? 'В работе' :
               signalExecution.status === 'completed' ? 'Исполнен' : 'Закрыт'}
            </Badge>
          </h4>
          <div className="text-sm text-gray-400">
            {formatTime(timestamp)}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
          <div>
            <p className="text-gray-400 text-sm">Symbol</p>
            <p className="text-white font-semibold text-lg">{signal.symbol}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Action</p>
            <Badge 
              className={signal.action === 'BUY' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
            >
              {signal.action}
            </Badge>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Target</p>
            <p className="text-white font-semibold text-lg">${signal.target.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Confidence</p>
            <p className="text-white font-semibold text-lg">{signal.confidence}%</p>
          </div>
        </div>

        {signal.stopLoss && (
          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stop Loss: <span className="text-white">${signal.stopLoss.toLocaleString()}</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Execution History */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
        <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          История исполнения
        </h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">📊 Сделка открыта {signalExecution.daysActive} дня назад</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">🎯 Цена достигнута</span>
            <span className="text-green-400 font-semibold">{signalExecution.targetReached}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">⏳ Среднее время до цели</span>
            <span className="text-blue-400">{signalExecution.avgTimeToTarget} дня</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignalExecutionCard;
