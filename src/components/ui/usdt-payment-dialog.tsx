
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface UsdtPaymentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const networks = [
  {
    id: "trc20",
    name: "Tron (TRC20)",
    address: "TNVrLBRBg4RVpwK5EwVKjmFEUCTrGJ5UQ1",
    processingTime: "1-5 min",
    fee: "Low"
  },
  {
    id: "bep20",
    name: "Binance Smart Chain (BEP20)",
    address: "0x8923aB5A9cDb2045419634A126a5E117Ff871B72",
    processingTime: "5-20 min",
    fee: "Medium"
  },
  {
    id: "erc20",
    name: "Ethereum (ERC20)",
    address: "0x8923aB5A9cDb2045419634A126a5E117Ff871B72",
    processingTime: "10-30 min",
    fee: "High"
  },
];

export function UsdtPaymentDialog({ isOpen, setIsOpen }: UsdtPaymentDialogProps) {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0].id);
  const [txId, setTxId] = useState('');
  const { upgradeToPremiun } = useAuth();
  const { t, language } = useLanguage();

  const handleSubmitPayment = () => {
    if (!txId.trim()) {
      toast.error(language === 'en' ? 'Please enter transaction ID' : 'Пожалуйста, введите ID транзакции');
      return;
    }
    
    // In a real app, this would verify the transaction with the blockchain
    // Here we just simulate a successful upgrade
    upgradeToPremiun();
    toast.success(language === 'en' ? 'Premium upgrade successful!' : 'Успешное обновление до Premium!');
    setIsOpen(false);
    setTxId('');
  };

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
  };

  const selectedNetworkData = networks.find(n => n.id === selectedNetwork) || networks[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-black/90 border border-neon-purple/30">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {language === 'en' ? 'Upgrade to Premium' : 'Перейти на Premium'}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Send 50 USDT to the address below and submit your transaction ID to upgrade.'
              : 'Отправьте 50 USDT на адрес ниже и отправьте ID транзакции для обновления.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">
              {language === 'en' ? 'Select Network:' : 'Выберите сеть:'}
            </h3>
            <RadioGroup 
              value={selectedNetwork} 
              onValueChange={handleNetworkChange} 
              className="space-y-3"
            >
              {networks.map((network) => (
                <Card key={network.id} className={`border ${selectedNetwork === network.id ? 'border-neon-purple/50' : 'border-white/10'}`}>
                  <CardContent className="flex items-center p-3">
                    <RadioGroupItem value={network.id} id={network.id} className="mr-3" />
                    <div className="flex flex-col">
                      <label htmlFor={network.id} className="font-medium">
                        {network.name}
                      </label>
                      <div className="text-sm text-gray-400">
                        {language === 'en' ? 'Processing time:' : 'Время обработки:'} {network.processingTime} • {language === 'en' ? 'Fee:' : 'Комиссия:'} {network.fee}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>

          <div className="p-4 bg-black/40 rounded-md border border-white/10">
            <div className="mb-2 text-sm text-gray-400">
              {language === 'en' ? 'Send 50 USDT to:' : 'Отправьте 50 USDT на адрес:'}
            </div>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono p-2 bg-black/60 rounded break-all">
                {selectedNetworkData.address}
              </code>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 border-white/20"
                onClick={() => {
                  navigator.clipboard.writeText(selectedNetworkData.address);
                  toast.info(language === 'en' ? 'Address copied!' : 'Адрес скопирован!');
                }}
              >
                {language === 'en' ? 'Copy' : 'Копировать'}
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              {language === 'en' ? 'Transaction ID:' : 'ID транзакции:'}
            </label>
            <input 
              type="text" 
              value={txId} 
              onChange={(e) => setTxId(e.target.value)} 
              className="w-full p-2 rounded bg-black/40 border border-white/10 text-white"
              placeholder={language === 'en' ? 'Enter your transaction ID' : 'Введите ID транзакции'}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button 
            onClick={handleSubmitPayment} 
            className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 flex items-center justify-center"
          >
            <Wallet className="mr-2" />
            {language === 'en' ? 'Submit Payment' : 'Подтвердить оплату'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
