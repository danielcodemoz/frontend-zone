import React, { useState, useEffect } from 'react';
import { FlexboxControls } from './FlexboxControls';
import { GridControls } from './GridControls';
import { LayoutSandbox } from './LayoutSandbox';
import { LiveCodeEditor } from './LiveCodeEditor';
import { LayoutHeader } from './LayoutHeader';
import { Footer } from './Footer';
import { SaveLayoutDialog } from './SaveLayoutDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Code } from 'lucide-react';

export type LayoutMode = 'flexbox' | 'grid';
export type Language = 'en' | 'pt';
export type Theme = 'dark' | 'light' | 'blue' | 'purple' | 'sunset' | 'ocean';

export interface FlexboxConfig {
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap: number;
}

export interface GridConfig {
  templateColumns: string;
  templateRows: string;
  gap: number;
  columnGap: number;
  rowGap: number;
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
}

export interface LayoutElement {
  id: string;
  width: number;
  height: number;
  backgroundColor: string;
  label: string;
}

const translations = {
  en: {
    title: 'Frontend Playground',
    subtitle: 'Learn CSS Flexbox & Grid visually',
    flexbox: 'Flexbox',
    grid: 'Grid',
    addElement: 'Add Element',
    removeElement: 'Remove Element',
    reset: 'Reset',
    export: 'Export Code',
    save: 'Save Layout',
    load: 'Load Layout',
    presets: 'Presets',
    codePreview: 'Code Preview',
    liveEditor: 'Live Editor',
    settings: 'Settings',
    tips: 'Learning Tips',
    themes: 'Themes',
    light: 'Light',
    dark: 'Dark',
    blue: 'Blue',
    purple: 'Purple',
    sunset: 'Sunset',
    ocean: 'Ocean',
    tipsDescription: 'Learn CSS tips and best practices',
    presetsDescription: 'Choose from pre-built layout templates',
  },
  pt: {
    title: 'Playground Frontend',
    subtitle: 'Aprenda CSS Flexbox & Grid visualmente',
    flexbox: 'Flexbox',
    grid: 'Grid',
    addElement: 'Adicionar Elemento',
    removeElement: 'Remover Elemento',
    reset: 'Resetar',
    export: 'Exportar Código',
    save: 'Salvar Layout',
    load: 'Carregar Layout',
    presets: 'Modelos',
    codePreview: 'Visualização do Código',
    liveEditor: 'Editor Ao Vivo',
    settings: 'Configurações',
    tips: 'Dicas de Aprendizado',
    themes: 'Temas',
    light: 'Claro',
    dark: 'Escuro',
    blue: 'Azul',
    purple: 'Roxo',
    sunset: 'Pôr do Sol',
    ocean: 'Oceano',
    tipsDescription: 'Aprenda dicas e melhores práticas de CSS',
    presetsDescription: 'Escolha entre modelos de layout pré-construídos',
  }
};

export const LayoutPlayground = () => {
  const [mode, setMode] = useState<LayoutMode>('flexbox');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [showCode, setShowCode] = useState(true);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const [flexboxConfig, setFlexboxConfig] = useState<FlexboxConfig>({
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: 10,
  });

  const [gridConfig, setGridConfig] = useState<GridConfig>({
    templateColumns: 'repeat(3, 1fr)',
    templateRows: 'auto',
    gap: 10,
    columnGap: 10,
    rowGap: 10,
    justifyItems: 'stretch',
    alignItems: 'stretch',
  });

  const [elements, setElements] = useState<LayoutElement[]>([
    { id: '1', width: 100, height: 100, backgroundColor: '#3b82f6', label: '1' },
    { id: '2', width: 100, height: 100, backgroundColor: '#ef4444', label: '2' },
    { id: '3', width: 100, height: 100, backgroundColor: '#10b981', label: '3' },
  ]);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900';
      case 'blue':
        return 'bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-blue-50';
      case 'purple':
        return 'bg-gradient-to-br from-purple-950 via-violet-900 to-fuchsia-950 text-purple-50';
      case 'sunset':
        return 'bg-gradient-to-br from-orange-950 via-red-900 to-pink-950 text-orange-50';
      case 'ocean':
        return 'bg-gradient-to-br from-cyan-950 via-teal-900 to-emerald-950 text-cyan-50';
      default:
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white';
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case 'light':
        return 'bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg';
      case 'blue':
        return 'bg-blue-900/90 backdrop-blur-sm border-blue-700 shadow-xl';
      case 'purple':
        return 'bg-purple-900/90 backdrop-blur-sm border-purple-700 shadow-xl';
      case 'sunset':
        return 'bg-orange-900/90 backdrop-blur-sm border-orange-700 shadow-xl';
      case 'ocean':
        return 'bg-teal-900/90 backdrop-blur-sm border-teal-700 shadow-xl';
      default:
        return 'bg-gray-800/90 backdrop-blur-sm border-gray-700 shadow-xl';
    }
  };

  const addElement = () => {
    const newElement: LayoutElement = {
      id: String(elements.length + 1),
      width: 100,
      height: 100,
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      label: String(elements.length + 1),
    };
    setElements([...elements, newElement]);
  };

  const removeElement = () => {
    if (elements.length > 1) {
      setElements(elements.slice(0, -1));
    }
  };

  const resetLayout = () => {
    setElements([
      { id: '1', width: 100, height: 100, backgroundColor: '#3b82f6', label: '1' },
      { id: '2', width: 100, height: 100, backgroundColor: '#ef4444', label: '2' },
      { id: '3', width: 100, height: 100, backgroundColor: '#10b981', label: '3' },
    ]);
    
    if (mode === 'flexbox') {
      setFlexboxConfig({
        direction: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        gap: 10,
      });
    } else {
      setGridConfig({
        templateColumns: 'repeat(3, 1fr)',
        templateRows: 'auto',
        gap: 10,
        columnGap: 10,
        rowGap: 10,
        justifyItems: 'stretch',
        alignItems: 'stretch',
      });
    }
  };

  const exportCode = () => {
    const containerStyles = mode === 'flexbox' 
      ? `display: flex;
  flex-direction: ${flexboxConfig.direction};
  justify-content: ${flexboxConfig.justifyContent};
  align-items: ${flexboxConfig.alignItems};
  flex-wrap: ${flexboxConfig.flexWrap};
  gap: ${flexboxConfig.gap}px;`
      : `display: grid;
  grid-template-columns: ${gridConfig.templateColumns};
  grid-template-rows: ${gridConfig.templateRows};
  gap: ${gridConfig.gap}px;
  justify-items: ${gridConfig.justifyItems};
  align-items: ${gridConfig.alignItems};`;

    const html = `<div class="container">
${elements.map(el => `  <div class="item item-${el.id}">${el.label}</div>`).join('\n')}
</div>`;

    const css = `.container {
  ${containerStyles}
  padding: 20px;
  min-height: 200px;
}

${elements.map(el => `.item-${el.id} {
  width: ${el.width}px;
  height: ${el.height}px;
  background-color: ${el.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}`).join('\n\n')}`;

    const fullCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layout Export</title>
  <style>
${css}
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode}-layout.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveLayout = (name: string) => {
    const layoutData = {
      name,
      mode,
      flexboxConfig,
      gridConfig,
      elements,
      timestamp: Date.now(),
    };
    
    const saved = localStorage.getItem('layout-playground-saves') || '[]';
    const layouts = JSON.parse(saved);
    layouts.push(layoutData);
    localStorage.setItem('layout-playground-saves', JSON.stringify(layouts));
  };

  const loadLayout = () => {
    const saved = localStorage.getItem('layout-playground-save');
    if (saved) {
      const layoutData = JSON.parse(saved);
      setMode(layoutData.mode);
      setFlexboxConfig(layoutData.flexboxConfig);
      setGridConfig(layoutData.gridConfig);
      setElements(layoutData.elements);
    }
  };

  const applyPreset = (preset: any) => {
    if (mode === 'flexbox') {
      setFlexboxConfig(preset.flexboxConfig);
    } else {
      setGridConfig(preset.gridConfig);
    }
    setElements(preset.elements);
  };

  const handleApplyCode = (html: string, css: string) => {
    console.log('Applied code:', { html, css });
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} transition-all duration-500`}>
      <LayoutHeader 
        language={language}
        setLanguage={setLanguage}
        t={t}
        theme={theme}
        setTheme={setTheme}
        mode={mode}
        onSaveLayout={() => setShowSaveDialog(true)}
        onLoadLayout={loadLayout}
        onExportCode={exportCode}
        onResetLayout={resetLayout}
        onApplyPreset={applyPreset}
      />
      
      <div className="h-[calc(100vh-140px)]">
        {/* Mobile Layout */}
        <div className="block lg:hidden h-full overflow-hidden">
          <div className="flex flex-col h-full gap-2 p-2">
            {/* Mobile Controls */}
            <Card className={`${getCardClasses()} border-0`}>
              <div className="p-3">
                {/* Mode Toggle */}
                <div className="flex gap-2 mb-3">
                  <Button
                    variant={mode === 'flexbox' ? 'default' : 'outline'}
                    onClick={() => setMode('flexbox')}
                    className="flex-1 text-xs"
                    size="sm"
                  >
                    {t.flexbox}
                  </Button>
                  <Button
                    variant={mode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setMode('grid')}
                    className="flex-1 text-xs"
                    size="sm"
                  >
                    {t.grid}
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <Button onClick={addElement} size="sm" variant="outline" className="text-xs">
                    {t.addElement}
                  </Button>
                  <Button onClick={removeElement} size="sm" variant="outline" className="text-xs">
                    {t.removeElement}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mobile Sandbox */}
            <Card className={`flex-1 ${getCardClasses()} border-0`}>
              <div className="p-3 h-full">
                <LayoutSandbox
                  mode={mode}
                  flexboxConfig={flexboxConfig}
                  gridConfig={gridConfig}
                  elements={elements}
                  setElements={setElements}
                  theme={theme}
                />
              </div>
            </Card>

            {/* Mobile Code Editor Toggle */}
            {!showCode && (
              <div className="fixed bottom-4 right-4 z-10">
                <Button onClick={() => setShowCode(true)} className="shadow-lg">
                  <Code className="w-4 h-4 mr-1" />
                  {t.liveEditor}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block h-full">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - Controls */}
            <ResizablePanel defaultSize={18} minSize={15} maxSize={25} className="flex flex-col">
              <Card className={`h-full ${getCardClasses()} border-0 rounded-none`}>
                {/* Mode Toggle */}
                <div className="p-3 border-b border-opacity-20">
                  <div className="flex gap-2">
                    <Button
                      variant={mode === 'flexbox' ? 'default' : 'outline'}
                      onClick={() => setMode('flexbox')}
                      className="flex-1 transition-all duration-200"
                      size="sm"
                    >
                      {t.flexbox}
                    </Button>
                    <Button
                      variant={mode === 'grid' ? 'default' : 'outline'}
                      onClick={() => setMode('grid')}
                      className="flex-1 transition-all duration-200"
                      size="sm"
                    >
                      {t.grid}
                    </Button>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-3 border-b border-opacity-20 flex-1 overflow-y-auto">
                  {mode === 'flexbox' ? (
                    <FlexboxControls 
                      config={flexboxConfig}
                      setConfig={setFlexboxConfig}
                      language={language}
                    />
                  ) : (
                    <GridControls 
                      config={gridConfig}
                      setConfig={setGridConfig}
                      language={language}
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={addElement} size="sm" variant="outline">
                      {t.addElement}
                    </Button>
                    <Button onClick={removeElement} size="sm" variant="outline">
                      {t.removeElement}
                    </Button>
                  </div>
                  
                  <Button onClick={loadLayout} size="sm" variant="outline" className="w-full">
                    {t.load}
                  </Button>
                </div>
              </Card>
            </ResizablePanel>

            <ResizableHandle />

            {/* Center Panel - Sandbox */}
            <ResizablePanel defaultSize={showCode ? 55 : 82} minSize={30}>
              <Card className={`h-full ${getCardClasses()} border-0 rounded-none`}>
                <div className="p-4 h-full">
                  <LayoutSandbox
                    mode={mode}
                    flexboxConfig={flexboxConfig}
                    gridConfig={gridConfig}
                    elements={elements}
                    setElements={setElements}
                    theme={theme}
                  />
                </div>
              </Card>
            </ResizablePanel>

            {/* Right Panel - Code Preview */}
            {showCode && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={27} minSize={20} maxSize={40}>
                  <Card className={`h-full ${getCardClasses()} border-0 rounded-none`}>
                    <div className="p-3 border-b border-opacity-20 flex justify-between items-center">
                      <h3 className="font-semibold">{t.liveEditor}</h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowCode(false)}
                        className="hover:bg-red-500/20"
                      >
                        ×
                      </Button>
                    </div>
                    <div className="h-[calc(100%-60px)]">
                      <LiveCodeEditor
                        mode={mode}
                        flexboxConfig={flexboxConfig}
                        gridConfig={gridConfig}
                        elements={elements}
                        theme={theme}
                        language={language}
                        onApplyCode={handleApplyCode}
                      />
                    </div>
                  </Card>
                </ResizablePanel>
              </>
            )}

            {/* Show Code Button when hidden */}
            {!showCode && (
              <div className="fixed bottom-20 right-4 z-10">
                <Button onClick={() => setShowCode(true)} className="shadow-lg">
                  <Code className="w-4 h-4 mr-1" />
                  {t.liveEditor}
                </Button>
              </div>
            )}
          </ResizablePanelGroup>
        </div>
      </div>

      <SaveLayoutDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={saveLayout}
        language={language}
      />

      <Footer />
    </div>
  );
};
