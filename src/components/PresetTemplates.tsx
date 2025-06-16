
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FlexboxConfig, GridConfig, LayoutElement, LayoutMode, Language } from './LayoutPlayground';

interface PresetTemplate {
  id: string;
  name: { en: string; pt: string };
  description: { en: string; pt: string };
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
}

interface PresetTemplatesProps {
  mode: LayoutMode;
  onApplyPreset: (preset: PresetTemplate) => void;
  language: Language;
}

const presetTemplates: PresetTemplate[] = [
  {
    id: 'flex-center',
    name: { en: 'Centered Layout', pt: 'Layout Centralizado' },
    description: { en: 'Perfect center alignment', pt: 'Alinhamento central perfeito' },
    mode: 'flexbox',
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
      { id: '1', width: 120, height: 120, backgroundColor: '#3b82f6', label: '1' },
      { id: '2', width: 120, height: 120, backgroundColor: '#ef4444', label: '2' },
      { id: '3', width: 120, height: 120, backgroundColor: '#10b981', label: '3' },
    ],
  },
  {
    id: 'flex-navbar',
    name: { en: 'Navigation Bar', pt: 'Barra de Navegação' },
    description: { en: 'Typical navbar layout', pt: 'Layout típico de navbar' },
    mode: 'flexbox',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: 10,
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
      { id: '1', width: 80, height: 50, backgroundColor: '#8b5cf6', label: 'Logo' },
      { id: '2', width: 200, height: 50, backgroundColor: '#06b6d4', label: 'Menu' },
      { id: '3', width: 80, height: 50, backgroundColor: '#f59e0b', label: 'User' },
    ],
  },
  {
    id: 'grid-gallery',
    name: { en: 'Photo Gallery', pt: 'Galeria de Fotos' },
    description: { en: 'Responsive image grid', pt: 'Grid responsivo de imagens' },
    mode: 'grid',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 10,
    },
    gridConfig: {
      templateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      templateRows: 'repeat(2, 150px)',
      gap: 15,
      columnGap: 15,
      rowGap: 15,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 150, height: 150, backgroundColor: '#ec4899', label: '1' },
      { id: '2', width: 150, height: 150, backgroundColor: '#8b5cf6', label: '2' },
      { id: '3', width: 150, height: 150, backgroundColor: '#06b6d4', label: '3' },
      { id: '4', width: 150, height: 150, backgroundColor: '#10b981', label: '4' },
      { id: '5', width: 150, height: 150, backgroundColor: '#f59e0b', label: '5' },
      { id: '6', width: 150, height: 150, backgroundColor: '#ef4444', label: '6' },
    ],
  },
  {
    id: 'grid-dashboard',
    name: { en: 'Dashboard Layout', pt: 'Layout de Dashboard' },
    description: { en: 'Classic dashboard grid', pt: 'Grid clássico de dashboard' },
    mode: 'grid',
    flexboxConfig: {
      direction: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: 10,
    },
    gridConfig: {
      templateColumns: '1fr 2fr 1fr',
      templateRows: '60px 1fr 60px',
      gap: 20,
      columnGap: 20,
      rowGap: 20,
      justifyItems: 'stretch',
      alignItems: 'stretch',
    },
    elements: [
      { id: '1', width: 200, height: 60, backgroundColor: '#6366f1', label: 'Header' },
      { id: '2', width: 200, height: 200, backgroundColor: '#8b5cf6', label: 'Sidebar' },
      { id: '3', width: 400, height: 200, backgroundColor: '#06b6d4', label: 'Main' },
      { id: '4', width: 200, height: 200, backgroundColor: '#10b981', label: 'Aside' },
      { id: '5', width: 200, height: 60, backgroundColor: '#f59e0b', label: 'Footer' },
    ],
  },
];

export const PresetTemplates: React.FC<PresetTemplatesProps> = ({
  mode,
  onApplyPreset,
  language,
}) => {
  const filteredPresets = presetTemplates.filter(preset => preset.mode === mode);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">
        {language === 'en' ? 'Preset Templates' : 'Modelos Predefinidos'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPresets.map((preset) => (
          <Card key={preset.id} className="bg-gray-800 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">
                {preset.name[language]}
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs">
                {preset.description[language]}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                size="sm"
                onClick={() => onApplyPreset(preset)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {language === 'en' ? 'Apply' : 'Aplicar'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
