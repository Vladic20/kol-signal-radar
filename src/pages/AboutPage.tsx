
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSent(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 500);
  };
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('aboutTitle')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About section */}
          <div className="space-y-6">
            <div className="bg-black/30 rounded-lg p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">{t('language') === 'en' ? 'Our Mission' : 'Наша мисс'}</h2>
              <p className="text-gray-300 mb-4">{t('mission')}</p>
              <p className="text-gray-300">
                {t('language') === 'en' 
                  ? 'KOL Leaderboard is designed to help crypto investors make informed decisions by providing access to signals from verified and ranked crypto key opinion leaders. We track KOL performance, engagement metrics, and reputation to ensure you get insights from the best minds in the crypto space.'
                  : 'KOL Лидерборд создан, чтобы помочь крипто-инвесторам принимать информированные решения, предоставляя доступ к сигналам от проверенных и ранжированных крипто-лидеров мнений. Мы отслеживаем эффективность KOL, показатели вовлеченности и репутацию, чтобы вы получали аналитику от лучших умов в криптопространстве.'}
              </p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-4">{t('language') === 'en' ? 'Our Team' : 'Наша команда'}</h2>
              <p className="text-gray-300">
                {t('language') === 'en'
                  ? 'We are a team of crypto enthusiasts, data analysts, and developers who believe in the power of community and shared knowledge. Our platform is built on principles of transparency, accuracy, and user-centered design.'
                  : 'Мы - команда крипто-энтузиастов, аналитиков данных и разработчиков, которые верят в силу сообщества и обмена знаниями. Наша платформа построена на принципах прозрачности, точности и дизайна, ориентированного на пользователя.'}
              </p>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-black/40">
                    <img src="https://api.dicebear.com/7.x/personas/svg?seed=alex&backgroundColor=b6e3f4" alt="Team Member" className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">Alex</p>
                    <p className="text-xs text-gray-400">Founder & CEO</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-black/40">
                    <img src="https://api.dicebear.com/7.x/personas/svg?seed=maria&backgroundColor=c0aede" alt="Team Member" className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">Maria</p>
                    <p className="text-xs text-gray-400">Data Analyst</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-black/40">
                    <img src="https://api.dicebear.com/7.x/personas/svg?seed=john&backgroundColor=ffdfbf" alt="Team Member" className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">John</p>
                    <p className="text-xs text-gray-400">Lead Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div id="contact" className="bg-black/30 rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">{t('contactUs')}</h2>
            <p className="text-gray-300 mb-6">
              {t('language') === 'en'
                ? 'Have questions, suggestions, or want to collaborate? Reach out to us using the form below.'
                : 'Есть вопросы, предложения или хотите сотрудничать? Свяжитесь с нами, используя форму ниже.'}
            </p>
            
            {isSent ? (
              <div className="p-4 bg-green-900/30 border border-green-800 rounded-lg text-center">
                <p className="text-green-300">
                  {t('language') === 'en' 
                    ? 'Thank you! Your message has been sent.' 
                    : 'Спасибо! Ваше сообщение отправлено.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('yourName')}
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/40 border-white/10"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/40 border-white/10"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    {t('message')}
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-32 resize-none bg-black/40 border-white/10"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
                >
                  {t('send')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
