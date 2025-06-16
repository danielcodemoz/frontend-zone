
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language, Theme } from './LayoutPlayground';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Palette, BookOpen, Settings, Save, Download, RotateCcw } from 'lucide-react';
import { LearningTips } from './LearningTips';
import { PresetTemplates } from './PresetTemplates';

interface LayoutHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: any;
  mode: 'flexbox' | 'grid';
  onSaveLayout: () => void;
  onLoadLayout: () => void;
  onExportCode: () => void;
  onResetLayout: () => void;
  onApplyPreset: (preset: any) => void;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  t,
  mode,
  onSaveLayout,
  onLoadLayout,
  onExportCode,
  onResetLayout,
  onApplyPreset,
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

  const getButtonClasses = () => {
    switch (theme) {
      case 'light':
        return 'text-gray-700 hover:text-gray-900';
      case 'blue':
        return 'text-blue-100 hover:text-blue-50';
      default:
        return 'text-gray-300 hover:text-white';
    }
  };

  return (
    <header className={`${getThemeClasses()} border-b p-4 transition-all duration-300`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <p className="text-sm opacity-75">{t.subtitle}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          {/* Learning Tips */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className={getButtonClasses()}>
                <BookOpen className="w-4 h-4 mr-1" />
                {t.tips}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[600px]">
              <SheetHeader>
                <SheetTitle>{t.tips}</SheetTitle>
                <SheetDescription>
                  {t.tipsDescription}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <LearningTips language={language} mode={mode} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Presets */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className={getButtonClasses()}>
                <Settings className="w-4 h-4 mr-1" />
                {t.presets}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[600px]">
              <SheetHeader>
                <SheetTitle>{t.presets}</SheetTitle>
                <SheetDescription>
                  {t.presetsDescription}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <PresetTemplates
                  mode={mode}
                  onApplyPreset={onApplyPreset}
                  language={language}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Action Buttons */}
          <Button onClick={onSaveLayout} size="sm" variant="outline" className={getButtonClasses()}>
            <Save className="w-4 h-4 mr-1" />
            {t.save}
          </Button>
          
          <Button onClick={onExportCode} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-1" />
            {t.export}
          </Button>

          <Button onClick={onResetLayout} size="sm" variant="outline" className={getButtonClasses()}>
            <RotateCcw className="w-4 h-4 mr-1" />
            {t.reset}
          </Button>
          
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
