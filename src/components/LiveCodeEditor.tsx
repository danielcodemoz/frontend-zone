
import React, { useState, useEffect } from 'react';
import { FlexboxConfig, GridConfig, LayoutElement, LayoutMode, Theme } from './LayoutPlayground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface LiveCodeEditorProps {
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  theme: Theme;
  language: 'en' | 'pt';
  onApplyCode: (html: string, css: string) => void;
}

export const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  mode,
  flexboxConfig,
  gridConfig,
  elements,
  theme,
  language,
  onApplyCode,
}) => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');

  const t = {
    en: {
      liveEditor: 'Live Code Editor',
      html: 'HTML',
      css: 'CSS',
      preview: 'Preview',
      apply: 'Apply Changes',
      reset: 'Reset to Current',
      htmlPlaceholder: 'Edit HTML structure here...',
      cssPlaceholder: 'Edit CSS styles here...',
    },
    pt: {
      liveEditor: 'Editor de Código Ao Vivo',
      html: 'HTML',
      css: 'CSS',
      preview: 'Visualização',
      apply: 'Aplicar Mudanças',
      reset: 'Resetar para Atual',
      htmlPlaceholder: 'Edite a estrutura HTML aqui...',
      cssPlaceholder: 'Edite os estilos CSS aqui...',
    }
  };

  const translations = t[language];

  const generateHTML = () => {
    return `<div class="container">
${elements.map(el => `  <div class="item item-${el.id}">${el.label}</div>`).join('\n')}
</div>`;
  };

  const generateCSS = () => {
    const containerStyles = mode === 'flexbox' 
      ? `  display: flex;
  flex-direction: ${flexboxConfig.direction};
  justify-content: ${flexboxConfig.justifyContent};
  align-items: ${flexboxConfig.alignItems};
  flex-wrap: ${flexboxConfig.flexWrap};
  gap: ${flexboxConfig.gap}px;`
      : `  display: grid;
  grid-template-columns: ${gridConfig.templateColumns};
  grid-template-rows: ${gridConfig.templateRows};
  gap: ${gridConfig.gap}px;
  justify-items: ${gridConfig.justifyItems};
  align-items: ${gridConfig.alignItems};`;

    const itemStyles = elements.map(el => 
      `.item-${el.id} {
  width: ${el.width}px;
  height: ${el.height}px;
  background-color: ${el.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}`).join('\n\n');

    return `.container {
${containerStyles}
  padding: 20px;
  min-height: 200px;
  border: 2px dashed #666;
  border-radius: 8px;
}

${itemStyles}`;
  };

  useEffect(() => {
    setHtmlCode(generateHTML());
    setCssCode(generateCSS());
  }, [mode, flexboxConfig, gridConfig, elements]);

  useEffect(() => {
    const fullHtml = `
      <style>${cssCode}</style>
      ${htmlCode}
    `;
    setPreviewHtml(fullHtml);
  }, [htmlCode, cssCode]);

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          card: 'bg-white border-gray-200',
          tabs: 'bg-gray-100',
          text: 'text-gray-900',
          codeText: 'text-gray-800',
        };
      case 'blue':
        return {
          card: 'bg-blue-900 border-blue-700',
          tabs: 'bg-blue-800',
          text: 'text-blue-50',
          codeText: 'text-blue-100',
        };
      default:
        return {
          card: 'bg-gray-800 border-gray-600',
          tabs: 'bg-gray-700',
          text: 'text-white',
          codeText: 'text-gray-200',
        };
    }
  };

  const themeClasses = getThemeClasses();

  const handleApply = () => {
    onApplyCode(htmlCode, cssCode);
  };

  const handleReset = () => {
    setHtmlCode(generateHTML());
    setCssCode(generateCSS());
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="css" className="h-full flex flex-col">
        <div className="flex justify-between items-center p-3">
          <TabsList className={`grid w-full max-w-md grid-cols-3 ${themeClasses.tabs}`}>
            <TabsTrigger value="html" className={themeClasses.text}>
              {translations.html}
            </TabsTrigger>
            <TabsTrigger value="css" className={themeClasses.text}>
              {translations.css}
            </TabsTrigger>
            <TabsTrigger value="preview" className={themeClasses.text}>
              {translations.preview}
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="w-4 h-4 mr-1" />
              {translations.reset}
            </Button>
            <Button onClick={handleApply} size="sm">
              <Play className="w-4 h-4 mr-1" />
              {translations.apply}
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="html" className="h-full m-0 p-3">
            <Textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder={translations.htmlPlaceholder}
              className={`h-full font-mono text-sm resize-none ${themeClasses.codeText}`}
              style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            />
          </TabsContent>
          
          <TabsContent value="css" className="h-full m-0 p-3">
            <Textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              placeholder={translations.cssPlaceholder}
              className={`h-full font-mono text-sm resize-none ${themeClasses.codeText}`}
              style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            />
          </TabsContent>
          
          <TabsContent value="preview" className="h-full m-0 p-3">
            <div className={`h-full rounded border overflow-auto ${themeClasses.card}`}>
              <div
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                className="h-full"
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
