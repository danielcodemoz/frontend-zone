
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { GridConfig, Language } from './LayoutPlayground';
import { Card, CardContent } from '@/components/ui/card';

interface GridControlsProps {
  config: GridConfig;
  setConfig: (config: GridConfig) => void;
  language: Language;
}

const translations = {
  en: {
    templateColumns: 'Grid Template Columns',
    templateRows: 'Grid Template Rows',
    gap: 'Gap',
    columnGap: 'Column Gap',
    rowGap: 'Row Gap',
    justifyItems: 'Justify Items',
    alignItems: 'Align Items',
    start: 'Start',
    end: 'End',
    center: 'Center',
    stretch: 'Stretch',
  },
  pt: {
    templateColumns: 'Colunas do Grid',
    templateRows: 'Linhas do Grid',
    gap: 'Espaçamento',
    columnGap: 'Espaçamento da Coluna',
    rowGap: 'Espaçamento da Linha',
    justifyItems: 'Justificar Itens',
    alignItems: 'Alinhar Itens',
    start: 'Início',
    end: 'Fim',
    center: 'Centro',
    stretch: 'Esticar',
  }
};

export const GridControls: React.FC<GridControlsProps> = ({
  config,
  setConfig,
  language,
}) => {
  const t = translations[language];

  const updateConfig = (key: keyof GridConfig, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <Card className="bg-gray-800 border-gray-600">
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Template Columns */}
          <div className="space-y-2">
            <Label className="text-white">{t.templateColumns}</Label>
            <Input
              value={config.templateColumns}
              onChange={(e) => updateConfig('templateColumns', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="repeat(3, 1fr)"
            />
          </div>

          {/* Template Rows */}
          <div className="space-y-2">
            <Label className="text-white">{t.templateRows}</Label>
            <Input
              value={config.templateRows}
              onChange={(e) => updateConfig('templateRows', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="auto"
            />
          </div>

          {/* Justify Items */}
          <div className="space-y-2">
            <Label className="text-white">{t.justifyItems}</Label>
            <Select
              value={config.justifyItems}
              onValueChange={(value) => updateConfig('justifyItems', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="start">{t.start}</SelectItem>
                <SelectItem value="end">{t.end}</SelectItem>
                <SelectItem value="center">{t.center}</SelectItem>
                <SelectItem value="stretch">{t.stretch}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Align Items */}
          <div className="space-y-2">
            <Label className="text-white">{t.alignItems}</Label>
            <Select
              value={config.alignItems}
              onValueChange={(value) => updateConfig('alignItems', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="start">{t.start}</SelectItem>
                <SelectItem value="end">{t.end}</SelectItem>
                <SelectItem value="center">{t.center}</SelectItem>
                <SelectItem value="stretch">{t.stretch}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gap Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">{t.gap}: {config.gap}px</Label>
            <Slider
              value={[config.gap]}
              onValueChange={(value) => updateConfig('gap', value[0])}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">{t.columnGap}: {config.columnGap}px</Label>
              <Slider
                value={[config.columnGap]}
                onValueChange={(value) => updateConfig('columnGap', value[0])}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">{t.rowGap}: {config.rowGap}px</Label>
              <Slider
                value={[config.rowGap]}
                onValueChange={(value) => updateConfig('rowGap', value[0])}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
