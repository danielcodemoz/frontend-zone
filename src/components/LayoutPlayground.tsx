
import React, { useState, useEffect } from 'react';
import { FlexboxControls } from './FlexboxControls';
import { GridControls } from './GridControls';
import { LayoutSandbox } from './LayoutSandbox';
import { CodePreview } from './CodePreview';
import { LayoutHeader } from './LayoutHeader';
import { PresetTemplates } from './PresetTemplates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export type LayoutMode = 'flexbox' | 'grid';
export type Language = 'en' | 'pt';

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
    title: 'Frontend Layout Playground',
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
  },
  pt: {
    title: 'Playground de Layout Frontend',
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
  }
};

export const LayoutPlayground = () => {
  const [mode, setMode] = useState<LayoutMode>('flexbox');
  const [language, setLanguage] = useState<Language>('en');
  const [showPresets, setShowPresets] = useState(false);
  const [showCode, setShowCode] = useState(true);

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

  const saveLayout = () => {
    const layoutData = {
      mode,
      flexboxConfig,
      gridConfig,
      elements,
      timestamp: Date.now(),
    };
    localStorage.setItem('layout-playground-save', JSON.stringify(layoutData));
    console.log('Layout saved!');
  };

  const loadLayout = () => {
    const saved = localStorage.getItem('layout-playground-save');
    if (saved) {
      const layoutData = JSON.parse(saved);
      setMode(layoutData.mode);
      setFlexboxConfig(layoutData.flexboxConfig);
      setGridConfig(layoutData.gridConfig);
      setElements(layoutData.elements);
      console.log('Layout loaded!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <LayoutHeader 
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Controls & Sandbox */}
        <div className="flex-1 flex flex-col">
          {/* Mode Toggle */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex gap-2">
              <Button
                variant={mode === 'flexbox' ? 'default' : 'outline'}
                onClick={() => setMode('flexbox')}
                className="transition-all duration-200"
              >
                {t.flexbox}
              </Button>
              <Button
                variant={mode === 'grid' ? 'default' : 'outline'}
                onClick={() => setMode('grid')}
                className="transition-all duration-200"
              >
                {t.grid}
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-b border-gray-700">
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
          <div className="p-4 border-b border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Button onClick={addElement} size="sm" variant="outline">
                {t.addElement}
              </Button>
              <Button onClick={removeElement} size="sm" variant="outline">
                {t.removeElement}
              </Button>
              <Button onClick={resetLayout} size="sm" variant="outline">
                {t.reset}
              </Button>
              <Button onClick={exportCode} size="sm" className="bg-blue-600 hover:bg-blue-700">
                {t.export}
              </Button>
              <Button onClick={saveLayout} size="sm" variant="outline">
                {t.save}
              </Button>
              <Button onClick={loadLayout} size="sm" variant="outline">
                {t.load}
              </Button>
              <Button onClick={() => setShowPresets(!showPresets)} size="sm" variant="outline">
                {t.presets}
              </Button>
            </div>
          </div>

          {/* Presets */}
          {showPresets && (
            <div className="p-4 border-b border-gray-700">
              <PresetTemplates
                mode={mode}
                onApplyPreset={(preset) => {
                  if (mode === 'flexbox') {
                    setFlexboxConfig(preset.flexboxConfig);
                  } else {
                    setGridConfig(preset.gridConfig);
                  }
                  setElements(preset.elements);
                  setShowPresets(false);
                }}
                language={language}
              />
            </div>
          )}

          {/* Sandbox */}
          <div className="flex-1 p-4">
            <LayoutSandbox
              mode={mode}
              flexboxConfig={flexboxConfig}
              gridConfig={gridConfig}
              elements={elements}
              setElements={setElements}
            />
          </div>
        </div>

        {/* Right Panel - Code Preview */}
        {showCode && (
          <>
            <Separator orientation="vertical" />
            <div className="w-96 border-l border-gray-700">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold">{t.codePreview}</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowCode(false)}
                >
                  ×
                </Button>
              </div>
              <CodePreview
                mode={mode}
                flexboxConfig={flexboxConfig}
                gridConfig={gridConfig}
                elements={elements}
              />
            </div>
          </>
        )}

        {/* Show Code Button when hidden */}
        {!showCode && (
          <div className="fixed bottom-4 right-4">
            <Button onClick={() => setShowCode(true)}>
              {t.codePreview}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
