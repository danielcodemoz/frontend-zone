
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
        return 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-900 shadow-lg';
      case 'blue':
        return 'bg-blue-900/95 backdrop-blur-md border-blue-700 text-blue-50 shadow-xl';
      case 'purple':
        return 'bg-purple-900/95 backdrop-blur-md border-purple-700 text-purple-50 shadow-xl';
      case 'sunset':
        return 'bg-orange-900/95 backdrop-blur-md border-orange-700 text-orange-50 shadow-xl';
      case 'ocean':
        return 'bg-teal-900/95 backdrop-blur-md border-teal-700 text-teal-50 shadow-xl';
      default:
        return 'bg-gray-800/95 backdrop-blur-md border-gray-700 text-white shadow-xl';
    }
  };

  const getButtonClasses = () => {
    switch (theme) {
      case 'light':
        return 'text-gray-700 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200/80 border-gray-300';
      case 'blue':
        return 'text-blue-100 hover:text-blue-50 bg-blue-800/80 hover:bg-blue-700/80 border-blue-600';
      case 'purple':
        return 'text-purple-100 hover:text-purple-50 bg-purple-800/80 hover:bg-purple-700/80 border-purple-600';
      case 'sunset':
        return 'text-orange-100 hover:text-orange-50 bg-orange-800/80 hover:bg-orange-700/80 border-orange-600';
      case 'ocean':
        return 'text-teal-100 hover:text-teal-50 bg-teal-800/80 hover:bg-teal-700/80 border-teal-600';
      default:
        return 'text-gray-300 hover:text-white bg-gray-700/80 hover:bg-gray-600/80 border-gray-600';
    }
  };

  const getSelectClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white border-gray-300 text-gray-900';
      case 'blue':
        return 'bg-blue-800 border-blue-600 text-blue-50';
      case 'purple':
        return 'bg-purple-800 border-purple-600 text-purple-50';
      case 'sunset':
        return 'bg-orange-800 border-orange-600 text-orange-50';
      case 'ocean':
        return 'bg-teal-800 border-teal-600 text-teal-50';
      default:
        return 'bg-gray-700 border-gray-600 text-white';
    }
  };

  const buttonClasses = getButtonClasses();
  const selectClasses = getSelectClasses();

  return (
    <header className={`${getThemeClasses()} border-b p-3 lg:p-4 transition-all duration-500 sticky top-0 z-50`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-4">
        <div className="w-full lg:w-auto">
          <h1 className="text-xl lg:text-2xl font-bold">{t.title}</h1>
          <p className="text-xs lg:text-sm opacity-75">{t.subtitle}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 lg:gap-2 items-center w-full lg:w-auto justify-end">
          {/* Learning Tips */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm" variant="outline" className={`${buttonClasses} text-xs lg:text-sm px-2 lg:px-3`}>
                <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">{t.tips}</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[400px] lg:w-[600px]">
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
              <Button size="sm" variant="outline" className={`${buttonClasses} text-xs lg:text-sm px-2 lg:px-3`}>
                <Settings className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                <span className="hidden sm:inline">{t.presets}</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[400px] lg:w-[600px]">
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
          <Button onClick={onSaveLayout} size="sm" variant="outline" className={`${buttonClasses} text-xs lg:text-sm px-2 lg:px-3`}>
            <Save className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            <span className="hidden md:inline">{t.save}</span>
          </Button>
          
          <Button onClick={onExportCode} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm px-2 lg:px-3">
            <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            <span className="hidden md:inline">{t.export}</span>
          </Button>

          <Button onClick={onResetLayout} size="sm" variant="outline" className={`${buttonClasses} text-xs lg:text-sm px-2 lg:px-3`}>
            <RotateCcw className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            <span className="hidden md:inline">{t.reset}</span>
          </Button>
          
          {/* Theme Selector */}
          <div className="flex items-center gap-1 lg:gap-2">
            <Palette className="w-3 h-3 lg:w-4 lg:h-4" />
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className={`w-16 lg:w-24 h-7 lg:h-8 text-xs ${selectClasses}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectClasses}>
                <SelectItem value="dark">{t.dark}</SelectItem>
                <SelectItem value="light">{t.light}</SelectItem>
                <SelectItem value="blue">{t.blue}</SelectItem>
                <SelectItem value="purple">{t.purple}</SelectItem>
                <SelectItem value="sunset">{t.sunset}</SelectItem>
                <SelectItem value="ocean">{t.ocean}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Language Selector */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              className={`h-7 lg:h-8 px-2 lg:px-3 text-xs ${language !== 'en' ? buttonClasses : ''}`}
            >
              EN
            </Button>
            <Button
              size="sm"
              variant={language === 'pt' ? 'default' : 'outline'}
              onClick={() => setLanguage('pt')}
              className={`h-7 lg:h-8 px-2 lg:px-3 text-xs ${language !== 'pt' ? buttonClasses : ''}`}
            >
              PT
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
