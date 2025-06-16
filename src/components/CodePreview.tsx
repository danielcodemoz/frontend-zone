
import React from 'react';
import { FlexboxConfig, GridConfig, LayoutElement, LayoutMode, Theme } from './LayoutPlayground';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodePreviewProps {
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  theme: Theme;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  mode,
  flexboxConfig,
  gridConfig,
  elements,
  theme,
}) => {
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
}

${itemStyles}`;
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          card: 'bg-white border-gray-200',
          tabs: 'bg-gray-100',
          tabActive: 'bg-white',
          text: 'text-gray-900',
          htmlColor: 'text-blue-700',
          cssColor: 'text-purple-700',
        };
      case 'blue':
        return {
          card: 'bg-blue-900 border-blue-700',
          tabs: 'bg-blue-800',
          tabActive: 'bg-blue-700',
          text: 'text-blue-50',
          htmlColor: 'text-green-300',
          cssColor: 'text-cyan-300',
        };
      default:
        return {
          card: 'bg-gray-800 border-gray-600',
          tabs: 'bg-gray-700',
          tabActive: 'bg-gray-600',
          text: 'text-white',
          htmlColor: 'text-green-400',
          cssColor: 'text-blue-400',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="css" className="h-full flex flex-col">
        <TabsList className={`grid w-full grid-cols-2 ${themeClasses.tabs}`}>
          <TabsTrigger value="html" className={`${themeClasses.text} data-[state=active]:${themeClasses.tabActive}`}>
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className={`${themeClasses.text} data-[state=active]:${themeClasses.tabActive}`}>
            CSS
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="html" className="h-full m-0">
            <Card className={`h-full ${themeClasses.card}`}>
              <CardContent className="p-4 h-full">
                <pre className={`text-sm ${themeClasses.htmlColor} font-mono overflow-auto h-full whitespace-pre-wrap font-medium`}>
                  {generateHTML()}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="css" className="h-full m-0">
            <Card className={`h-full ${themeClasses.card}`}>
              <CardContent className="p-4 h-full">
                <pre className={`text-sm ${themeClasses.cssColor} font-mono overflow-auto h-full whitespace-pre-wrap font-medium`}>
                  {generateCSS()}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
