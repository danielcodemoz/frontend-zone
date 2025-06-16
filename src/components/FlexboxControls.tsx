
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FlexboxConfig, Language } from './LayoutPlayground';
import { Card, CardContent } from '@/components/ui/card';

interface FlexboxControlsProps {
  config: FlexboxConfig;
  setConfig: (config: FlexboxConfig) => void;
  language: Language;
}

const translations = {
  en: {
    direction: 'Flex Direction',
    justifyContent: 'Justify Content',
    alignItems: 'Align Items',
    flexWrap: 'Flex Wrap',
    gap: 'Gap',
    row: 'Row',
    column: 'Column',
    rowReverse: 'Row Reverse',
    columnReverse: 'Column Reverse',
    flexStart: 'Flex Start',
    flexEnd: 'Flex End',
    center: 'Center',
    spaceBetween: 'Space Between',
    spaceAround: 'Space Around',
    spaceEvenly: 'Space Evenly',
    stretch: 'Stretch',
    baseline: 'Baseline',
    nowrap: 'No Wrap',
    wrap: 'Wrap',
    wrapReverse: 'Wrap Reverse',
  },
  pt: {
    direction: 'Direção do Flex',
    justifyContent: 'Justificar Conteúdo',
    alignItems: 'Alinhar Itens',
    flexWrap: 'Quebra do Flex',
    gap: 'Espaçamento',
    row: 'Linha',
    column: 'Coluna',
    rowReverse: 'Linha Reversa',
    columnReverse: 'Coluna Reversa',
    flexStart: 'Início do Flex',
    flexEnd: 'Fim do Flex',
    center: 'Centro',
    spaceBetween: 'Espaço Entre',
    spaceAround: 'Espaço Ao Redor',
    spaceEvenly: 'Espaço Uniforme',
    stretch: 'Esticar',
    baseline: 'Linha Base',
    nowrap: 'Sem Quebra',
    wrap: 'Quebrar',
    wrapReverse: 'Quebra Reversa',
  }
};

export const FlexboxControls: React.FC<FlexboxControlsProps> = ({
  config,
  setConfig,
  language,
}) => {
  const t = translations[language];

  const updateConfig = (key: keyof FlexboxConfig, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <Card className="bg-gray-800 border-gray-600">
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Flex Direction */}
          <div className="space-y-2">
            <Label className="text-white">{t.direction}</Label>
            <Select
              value={config.direction}
              onValueChange={(value) => updateConfig('direction', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="row">{t.row}</SelectItem>
                <SelectItem value="column">{t.column}</SelectItem>
                <SelectItem value="row-reverse">{t.rowReverse}</SelectItem>
                <SelectItem value="column-reverse">{t.columnReverse}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Justify Content */}
          <div className="space-y-2">
            <Label className="text-white">{t.justifyContent}</Label>
            <Select
              value={config.justifyContent}
              onValueChange={(value) => updateConfig('justifyContent', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="flex-start">{t.flexStart}</SelectItem>
                <SelectItem value="flex-end">{t.flexEnd}</SelectItem>
                <SelectItem value="center">{t.center}</SelectItem>
                <SelectItem value="space-between">{t.spaceBetween}</SelectItem>
                <SelectItem value="space-around">{t.spaceAround}</SelectItem>
                <SelectItem value="space-evenly">{t.spaceEvenly}</SelectItem>
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
                <SelectItem value="flex-start">{t.flexStart}</SelectItem>
                <SelectItem value="flex-end">{t.flexEnd}</SelectItem>
                <SelectItem value="center">{t.center}</SelectItem>
                <SelectItem value="stretch">{t.stretch}</SelectItem>
                <SelectItem value="baseline">{t.baseline}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Flex Wrap */}
          <div className="space-y-2">
            <Label className="text-white">{t.flexWrap}</Label>
            <Select
              value={config.flexWrap}
              onValueChange={(value) => updateConfig('flexWrap', value)}
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="nowrap">{t.nowrap}</SelectItem>
                <SelectItem value="wrap">{t.wrap}</SelectItem>
                <SelectItem value="wrap-reverse">{t.wrapReverse}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gap */}
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
      </CardContent>
    </Card>
  );
};
