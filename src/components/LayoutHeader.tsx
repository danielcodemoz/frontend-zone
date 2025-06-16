
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from './LayoutPlayground';

interface LayoutHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  language,
  setLanguage,
  t,
}) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
          >
            EN
          </Button>
          <Button
            size="sm"
            variant={language === 'pt' ? 'default' : 'outline'}
            onClick={() => setLanguage('pt')}
          >
            PT
          </Button>
        </div>
      </div>
    </header>
  );
};
