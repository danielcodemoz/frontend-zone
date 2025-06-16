
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutMode, FlexboxConfig, GridConfig, LayoutElement } from './LayoutPlayground';

interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  category: 'layout' | 'navigation' | 'content' | 'advanced';
}

interface PresetTemplatesProps {
  mode: LayoutMode;
  onApplyPreset: (preset: PresetTemplate) => void;
  language: 'en' | 'pt';
}

const presets: PresetTemplate[] = [
  // Flexbox Presets
  {
    id: 'flex-center',
    name: 'Centered Content',
    description: 'Perfect center alignment',
    category: 'layout',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: 20,
    },
    gridConfig: {
      templateColumns: 'repeat(3, 1fr)',
      templateRows: 'auto',
      gap: 10,
      columnGap: 10,
      rowGap: 10,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 120, height: 120, backgroundColor: '#3b82f6', label: 'Center' },
    ]
  },
  {
    id: 'flex-navbar',
    name: 'Navigation Bar',
    description: 'Horizontal navigation layout',
    category: 'navigation',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: 15,
    },
    gridConfig: {
      templateColumns: 'repeat(3, 1fr)',
      templateRows: 'auto',
      gap: 10,
      columnGap: 10,
      rowGap: 10,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 80, height: 50, backgroundColor: '#10b981', label: 'Logo' },
      { id: '2', width: 60, height: 50, backgroundColor: '#f59e0b', label: 'Menu' },
      { id: '3', width: 60, height: 50, backgroundColor: '#ef4444', label: 'User' },
    ]
  },
  {
    id: 'flex-cards',
    name: 'Card Layout',
    description: 'Responsive card grid',
    category: 'content',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'wrap',
      gap: 20,
    },
    gridConfig: {
      templateColumns: 'repeat(3, 1fr)',
      templateRows: 'auto',
      gap: 10,
      columnGap: 10,
      rowGap: 10,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 200, height: 150, backgroundColor: '#8b5cf6', label: 'Card 1' },
      { id: '2', width: 200, height: 150, backgroundColor: '#06b6d4', label: 'Card 2' },
      { id: '3', width: 200, height: 150, backgroundColor: '#84cc16', label: 'Card 3' },
      { id: '4', width: 200, height: 150, backgroundColor: '#f97316', label: 'Card 4' },
    ]
  },
  {
    id: 'flex-sidebar',
    name: 'Sidebar Layout',
    description: 'Classic sidebar design',
    category: 'layout',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 0,
    },
    gridConfig: {
      templateColumns: 'repeat(3, 1fr)',
      templateRows: 'auto',
      gap: 10,
      columnGap: 10,
      rowGap: 10,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 200, height: 300, backgroundColor: '#374151', label: 'Sidebar' },
      { id: '2', width: 400, height: 300, backgroundColor: '#f3f4f6', label: 'Content' },
    ]
  },
  
  // Grid Presets
  {
    id: 'grid-holy-grail',
    name: 'Holy Grail Layout',
    description: 'Classic web layout pattern',
    category: 'layout',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 10,
    },
    gridConfig: {
      templateColumns: '200px 1fr 150px',
      templateRows: '80px 1fr 60px',
      gap: 10,
      columnGap: 10,
      rowGap: 10,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 100, height: 80, backgroundColor: '#1f2937', label: 'Header' },
      { id: '2', width: 200, height: 200, backgroundColor: '#374151', label: 'Sidebar' },
      { id: '3', width: 300, height: 200, backgroundColor: '#f9fafb', label: 'Main' },
      { id: '4', width: 150, height: 200, backgroundColor: '#6b7280', label: 'Aside' },
      { id: '5', width: 100, height: 60, backgroundColor: '#9ca3af', label: 'Footer' },
    ]
  },
  {
    id: 'grid-magazine',
    name: 'Magazine Layout',
    description: 'Complex magazine-style grid',
    category: 'content',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 10,
    },
    gridConfig: {
      templateColumns: 'repeat(4, 1fr)',
      templateRows: 'repeat(3, 150px)',
      gap: 15,
      columnGap: 15,
      rowGap: 15,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 100, height: 150, backgroundColor: '#dc2626', label: 'Hero' },
      { id: '2', width: 100, height: 150, backgroundColor: '#2563eb', label: 'Story 1' },
      { id: '3', width: 100, height: 150, backgroundColor: '#059669', label: 'Story 2' },
      { id: '4', width: 100, height: 150, backgroundColor: '#7c3aed', label: 'Ad' },
      { id: '5', width: 100, height: 150, backgroundColor: '#ea580c', label: 'News' },
      { id: '6', width: 100, height: 150, backgroundColor: '#0891b2', label: 'Sports' },
    ]
  },
  {
    id: 'grid-dashboard',
    name: 'Dashboard Grid',
    description: 'Analytics dashboard layout',
    category: 'advanced',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 10,
    },
    gridConfig: {
      templateColumns: 'repeat(6, 1fr)',
      templateRows: 'repeat(4, 100px)',
      gap: 12,
      columnGap: 12,
      rowGap: 12,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 100, height: 100, backgroundColor: '#3b82f6', label: 'KPI 1' },
      { id: '2', width: 100, height: 100, backgroundColor: '#10b981', label: 'KPI 2' },
      { id: '3', width: 100, height: 100, backgroundColor: '#f59e0b', label: 'KPI 3' },
      { id: '4', width: 100, height: 100, backgroundColor: '#ef4444', label: 'Chart' },
      { id: '5', width: 100, height: 100, backgroundColor: '#8b5cf6', label: 'Table' },
      { id: '6', width: 100, height: 100, backgroundColor: '#06b6d4', label: 'Stats' },
    ]
  },
];

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({
  mode,
  onApplyPreset,
  language,
}) => {
  const t = {
    en: {
      applyPreset: 'Apply Preset',
      categories: {
        layout: 'Layout',
        navigation: 'Navigation',
        content: 'Content',
        advanced: 'Advanced',
      }
    },
    pt: {
      applyPreset: 'Aplicar Modelo',
      categories: {
        layout: 'Layout',
        navigation: 'Navegação',
        content: 'Conteúdo',
        advanced: 'Avançado',
      }
    }
  };

  const translations = t[language];
  
  const filteredPresets = mode === 'flexbox' 
    ? presets.filter(preset => ['flex-center', 'flex-navbar', 'flex-cards', 'flex-sidebar'].includes(preset.id))
    : presets.filter(preset => ['grid-holy-grail', 'grid-magazine', 'grid-dashboard'].includes(preset.id));

  const groupedPresets = filteredPresets.reduce((groups, preset) => {
    const category = preset.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(preset);
    return groups;
  }, {} as Record<string, PresetTemplate[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedPresets).map(([category, categoryPresets]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {translations.categories[category as keyof typeof translations.categories]}
            <Badge variant="secondary">{categoryPresets.length}</Badge>
          </h3>
          <div className="grid gap-4">
            {categoryPresets.map((preset) => (
              <Card key={preset.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{preset.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {preset.description}
                      </p>
                    </div>
                    <Badge variant="outline">{mode}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      {preset.elements.length} elements
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onApplyPreset(preset)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {translations.applyPreset}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
