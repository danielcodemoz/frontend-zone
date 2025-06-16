
import React from 'react';
import { Language, LayoutMode } from './LayoutPlayground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, Target } from 'lucide-react';

interface LearningTipsProps {
  language: Language;
  mode: LayoutMode;
}

export const LearningTips: React.FC<LearningTipsProps> = ({ language, mode }) => {
  const tips = {
    en: {
      flexbox: {
        title: 'Flexbox Tips',
        basics: 'Basics',
        advanced: 'Advanced',
        common: 'Common Patterns',
        basicsContent: [
          { title: 'Display Flex', desc: 'Use display: flex to create a flex container' },
          { title: 'Flex Direction', desc: 'Controls the main axis (row, column, row-reverse, column-reverse)' },
          { title: 'Justify Content', desc: 'Aligns items along the main axis' },
          { title: 'Align Items', desc: 'Aligns items along the cross axis' },
          { title: 'Flex Wrap', desc: 'Controls whether items wrap to new lines' },
        ],
        advancedContent: [
          { title: 'Flex Grow', desc: 'Controls how much an item should grow' },
          { title: 'Flex Shrink', desc: 'Controls how much an item should shrink' },
          { title: 'Flex Basis', desc: 'Sets the initial size before free space is distributed' },
          { title: 'Align Self', desc: 'Overrides align-items for individual items' },
          { title: 'Order', desc: 'Changes the visual order without affecting HTML structure' },
        ],
        commonContent: [
          { title: 'Centering', desc: 'justify-content: center; align-items: center;' },
          { title: 'Equal Columns', desc: 'flex: 1; on all child elements' },
          { title: 'Sticky Footer', desc: 'flex-direction: column; min-height: 100vh;' },
          { title: 'Navigation Bar', desc: 'justify-content: space-between;' },
        ],
      },
      grid: {
        title: 'Grid Tips',
        basics: 'Basics',
        advanced: 'Advanced',
        common: 'Common Patterns',
        basicsContent: [
          { title: 'Display Grid', desc: 'Use display: grid to create a grid container' },
          { title: 'Grid Template', desc: 'Define rows and columns with grid-template-rows/columns' },
          { title: 'Grid Gap', desc: 'Sets spacing between grid items' },
          { title: 'Grid Area', desc: 'Places items in specific grid areas' },
          { title: 'Auto Fit/Fill', desc: 'Creates responsive grids with repeat()' },
        ],
        advancedContent: [
          { title: 'Grid Lines', desc: 'Reference grid lines by number or name' },
          { title: 'Grid Areas', desc: 'Create named grid areas for easier layouts' },
          { title: 'Subgrid', desc: 'Inherit grid tracks from parent grid' },
          { title: 'Dense Packing', desc: 'Use grid-auto-flow: dense for compact layouts' },
          { title: 'Minmax()', desc: 'Set minimum and maximum track sizes' },
        ],
        commonContent: [
          { title: 'Card Layout', desc: 'repeat(auto-fit, minmax(300px, 1fr))' },
          { title: 'Holy Grail', desc: 'Header, sidebar, main, footer layout' },
          { title: 'Magazine Layout', desc: 'Complex multi-column designs' },
          { title: 'Responsive Grid', desc: 'Auto-fitting columns with minmax()' },
        ],
      },
    },
    pt: {
      flexbox: {
        title: 'Dicas do Flexbox',
        basics: 'Básico',
        advanced: 'Avançado',
        common: 'Padrões Comuns',
        basicsContent: [
          { title: 'Display Flex', desc: 'Use display: flex para criar um contêiner flex' },
          { title: 'Flex Direction', desc: 'Controla o eixo principal (row, column, row-reverse, column-reverse)' },
          { title: 'Justify Content', desc: 'Alinha itens ao longo do eixo principal' },
          { title: 'Align Items', desc: 'Alinha itens ao longo do eixo transversal' },
          { title: 'Flex Wrap', desc: 'Controla se os itens quebram para novas linhas' },
        ],
        advancedContent: [
          { title: 'Flex Grow', desc: 'Controla o quanto um item deve crescer' },
          { title: 'Flex Shrink', desc: 'Controla o quanto um item deve encolher' },
          { title: 'Flex Basis', desc: 'Define o tamanho inicial antes do espaço livre ser distribuído' },
          { title: 'Align Self', desc: 'Substitui align-items para itens individuais' },
          { title: 'Order', desc: 'Muda a ordem visual sem afetar a estrutura HTML' },
        ],
        commonContent: [
          { title: 'Centralização', desc: 'justify-content: center; align-items: center;' },
          { title: 'Colunas Iguais', desc: 'flex: 1; em todos os elementos filhos' },
          { title: 'Footer Fixo', desc: 'flex-direction: column; min-height: 100vh;' },
          { title: 'Barra de Navegação', desc: 'justify-content: space-between;' },
        ],
      },
      grid: {
        title: 'Dicas do Grid',
        basics: 'Básico',
        advanced: 'Avançado',
        common: 'Padrões Comuns',
        basicsContent: [
          { title: 'Display Grid', desc: 'Use display: grid para criar um contêiner grid' },
          { title: 'Grid Template', desc: 'Define linhas e colunas com grid-template-rows/columns' },
          { title: 'Grid Gap', desc: 'Define espaçamento entre itens do grid' },
          { title: 'Grid Area', desc: 'Posiciona itens em áreas específicas do grid' },
          { title: 'Auto Fit/Fill', desc: 'Cria grids responsivos com repeat()' },
        ],
        advancedContent: [
          { title: 'Linhas do Grid', desc: 'Referencie linhas do grid por número ou nome' },
          { title: 'Áreas do Grid', desc: 'Crie áreas nomeadas para layouts mais fáceis' },
          { title: 'Subgrid', desc: 'Herda trilhas do grid pai' },
          { title: 'Empacotamento Denso', desc: 'Use grid-auto-flow: dense para layouts compactos' },
          { title: 'Minmax()', desc: 'Define tamanhos mínimos e máximos de trilhas' },
        ],
        commonContent: [
          { title: 'Layout de Cards', desc: 'repeat(auto-fit, minmax(300px, 1fr))' },
          { title: 'Santo Graal', desc: 'Layout com header, sidebar, main, footer' },
          { title: 'Layout de Revista', desc: 'Designs complexos multi-colunas' },
          { title: 'Grid Responsivo', desc: 'Colunas auto-ajustáveis com minmax()' },
        ],
      },
    },
  };

  const currentTips = tips[language][mode];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{currentTips.title}</h3>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basics" className="text-xs">
            {currentTips.basics}
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">
            {currentTips.advanced}
          </TabsTrigger>
          <TabsTrigger value="common" className="text-xs">
            {currentTips.common}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-3">
          {currentTips.basicsContent.map((tip, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500" />
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="advanced" className="space-y-3">
          {currentTips.advancedContent.map((tip, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 mt-0.5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tip.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="common" className="space-y-3">
          {currentTips.commonContent.map((tip, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs">
                  Pattern
                </Badge>
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <code className="text-xs bg-muted p-1 rounded mt-1 block">
                    {tip.desc}
                  </code>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
