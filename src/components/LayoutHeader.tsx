
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from './LayoutPlayground';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette } from 'lucide-react';

interface LayoutHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: any;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  t,
}) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white border-gray-200 text-gray-900';
      case 'blue':
        return 'bg-blue-900 border-blue-700 text-blue-50';
      default:
        return 'bg-gray-800 border-gray-700 text-white';
    }
  };

  return (
    <header className={`${getThemeClasses()} border-b p-4 transition-all duration-300`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-sm opacity-75">{t.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">{t.dark}</SelectItem>
                <SelectItem value="light">{t.light}</SelectItem>
                <SelectItem value="blue">{t.blue}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Language Selector */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className="h-8 px-3"
            >
              EN
            </Button>
            <Button
              size="sm"
              variant={language === 'pt' ? 'default' : 'outline'}
              onClick={() => setLanguage('pt')}
              className="h-8 px-3"
            >
              PT
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
