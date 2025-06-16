
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
          card: 'bg-white/90 backdrop-blur-sm border-gray-200',
          tabs: 'bg-gray-100/80',
          tabActive: 'bg-white',
          text: 'text-gray-900',
          htmlColor: 'text-blue-700',
          cssColor: 'text-purple-700',
          keyword: 'text-blue-600',
          string: 'text-green-600',
          property: 'text-red-600',
        };
      case 'blue':
        return {
          card: 'bg-blue-900/90 backdrop-blur-sm border-blue-700',
          tabs: 'bg-blue-800/80',
          tabActive: 'bg-blue-700',
          text: 'text-blue-50',
          htmlColor: 'text-green-300',
          cssColor: 'text-cyan-300',
          keyword: 'text-yellow-300',
          string: 'text-green-300',
          property: 'text-orange-300',
        };
      case 'purple':
        return {
          card: 'bg-purple-900/90 backdrop-blur-sm border-purple-700',
          tabs: 'bg-purple-800/80',
          tabActive: 'bg-purple-700',
          text: 'text-purple-50',
          htmlColor: 'text-green-300',
          cssColor: 'text-cyan-300',
          keyword: 'text-yellow-300',
          string: 'text-green-300',
          property: 'text-orange-300',
        };
      case 'sunset':
        return {
          card: 'bg-orange-900/90 backdrop-blur-sm border-orange-700',
          tabs: 'bg-orange-800/80',
          tabActive: 'bg-orange-700',
          text: 'text-orange-50',
          htmlColor: 'text-green-300',
          cssColor: 'text-cyan-300',
          keyword: 'text-yellow-300',
          string: 'text-green-300',
          property: 'text-pink-300',
        };
      case 'ocean':
        return {
          card: 'bg-teal-900/90 backdrop-blur-sm border-teal-700',
          tabs: 'bg-teal-800/80',
          tabActive: 'bg-teal-700',
          text: 'text-teal-50',
          htmlColor: 'text-green-300',
          cssColor: 'text-cyan-300',
          keyword: 'text-yellow-300',
          string: 'text-green-300',
          property: 'text-orange-300',
        };
      default:
        return {
          card: 'bg-gray-800/90 backdrop-blur-sm border-gray-600',
          tabs: 'bg-gray-700/80',
          tabActive: 'bg-gray-600',
          text: 'text-white',
          htmlColor: 'text-green-400',
          cssColor: 'text-blue-400',
          keyword: 'text-yellow-400',
          string: 'text-green-400',
          property: 'text-cyan-400',
        };
    }
  };

  const themeClasses = getThemeClasses();

  const highlightCSS = (css: string) => {
    return css
      .replace(/([a-zA-Z-]+)(?=\s*:)/g, `<span class="${themeClasses.property}">$1</span>`)
      .replace(/(display|flex|grid|row|column|center|start|end|stretch|space-between|space-around|space-evenly)/g, `<span class="${themeClasses.keyword}">$1</span>`)
      .replace(/(\d+px|\d+fr|auto|repeat)/g, `<span class="${themeClasses.string}">$1</span>`);
  };

  const highlightHTML = (html: string) => {
    return html
      .replace(/(&lt;\/?)([a-zA-Z]+)/g, `$1<span class="${themeClasses.keyword}">$2</span>`)
      .replace(/class="([^"]+)"/g, `class="<span class="${themeClasses.string}">$1</span>"`)
      .replace(/(&gt;)([^&<]+)(&lt;)/g, `$1<span class="${themeClasses.text}">$2</span>$3`);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="css" className="h-full flex flex-col">
        <TabsList className={`grid w-full grid-cols-2 ${themeClasses.tabs}`}>
          <TabsTrigger value="html" className={`${themeClasses.text} data-[state=active]:${themeClasses.tabActive} text-xs lg:text-sm`}>
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className={`${themeClasses.text} data-[state=active]:${themeClasses.tabActive} text-xs lg:text-sm`}>
            CSS
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="html" className="h-full m-0">
            <Card className={`h-full ${themeClasses.card}`}>
              <CardContent className="p-3 lg:p-4 h-full">
                <pre 
                  className={`text-xs lg:text-sm ${themeClasses.htmlColor} font-mono overflow-auto h-full whitespace-pre-wrap font-medium leading-relaxed`}
                  dangerouslySetInnerHTML={{ __html: highlightHTML(generateHTML().replace(/</g, '&lt;').replace(/>/g, '&gt;')) }}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="css" className="h-full m-0">
            <Card className={`h-full ${themeClasses.card}`}>
              <CardContent className="p-3 lg:p-4 h-full">
                <pre 
                  className={`text-xs lg:text-sm ${themeClasses.cssColor} font-mono overflow-auto h-full whitespace-pre-wrap font-medium leading-relaxed`}
                  dangerouslySetInnerHTML={{ __html: highlightCSS(generateCSS()) }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
