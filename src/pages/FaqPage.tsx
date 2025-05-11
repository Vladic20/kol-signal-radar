
import React from 'react';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { faqQuestions } from '@/data/mockData';

const FaqPage: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <Layout>
      <div className="py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
          {t('FAQ')}
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/30 rounded-lg p-6 border border-white/10">
            <Accordion type="single" collapsible className="space-y-4">
              {faqQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left hover:text-neon-purple transition-colors py-4">
                    {faq.question[language as 'en' | 'ru']}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-2 pb-4">
                    {faq.answer[language as 'en' | 'ru']}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-10 text-center py-6">
            <p className="text-gray-400 mb-2">
              {t('language') === 'en' 
                ? 'Still have questions?' 
                : 'Остались вопросы?'}
            </p>
            <a 
              href="/about#contact" 
              className="text-neon-blue hover:text-neon-blue/80 underline"
            >
              {t('language') === 'en' ? 'Contact our support team' : 'Свяжитесь с нашей службой поддержки'}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;
