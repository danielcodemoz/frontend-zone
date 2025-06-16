
import React from 'react';
import { FlexboxConfig, GridConfig, LayoutElement, LayoutMode } from './LayoutPlayground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodePreviewProps {
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  mode,
  flexboxConfig,
  gridConfig,
  elements,
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

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="css" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="html" className="text-white data-[state=active]:bg-gray-600">
            HTML
          </TabsTrigger>
          <TabsTrigger value="css" className="text-white data-[state=active]:bg-gray-600">
            CSS
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="html" className="h-full m-0">
            <Card className="h-full bg-gray-800 border-gray-600">
              <CardContent className="p-4 h-full">
                <pre className="text-sm text-green-400 font-mono overflow-auto h-full whitespace-pre-wrap">
                  {generateHTML()}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="css" className="h-full m-0">
            <Card className="h-full bg-gray-800 border-gray-600">
              <CardContent className="p-4 h-full">
                <pre className="text-sm text-blue-400 font-mono overflow-auto h-full whitespace-pre-wrap">
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
