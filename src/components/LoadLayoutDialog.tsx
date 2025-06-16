
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Download } from 'lucide-react';
import { LayoutMode, FlexboxConfig, GridConfig, LayoutElement } from './LayoutPlayground';

interface SavedLayout {
  name: string;
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  timestamp: number;
}

interface LoadLayoutDialogProps {
  children: React.ReactNode;
  onLoadLayout: (layout: SavedLayout) => void;
  language: 'en' | 'pt';
}

const translations = {
  en: {
    loadLayout: 'Load Layout',
    savedLayouts: 'Saved Layouts',
    noSaved: 'No saved layouts found',
    load: 'Load',
    delete: 'Delete',
    confirm: 'Are you sure you want to delete this layout?',
  },
  pt: {
    loadLayout: 'Carregar Layout',
    savedLayouts: 'Layouts Salvos',
    noSaved: 'Nenhum layout salvo encontrado',
    load: 'Carregar',
    delete: 'Excluir',
    confirm: 'Tem certeza que deseja excluir este layout?',
  }
};

export const LoadLayoutDialog: React.FC<LoadLayoutDialogProps> = ({
  children,
  onLoadLayout,
  language,
}) => {
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);
  const [open, setOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    if (open) {
      loadSavedLayouts();
    }
  }, [open]);

  const loadSavedLayouts = () => {
    const saved = localStorage.getItem('layout-playground-saves') || '[]';
    const layouts = JSON.parse(saved);
    setSavedLayouts(layouts);
  };

  const handleLoad = (layout: SavedLayout) => {
    onLoadLayout(layout);
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    if (confirm(t.confirm)) {
      const updated = savedLayouts.filter((_, i) => i !== index);
      setSavedLayouts(updated);
      localStorage.setItem('layout-playground-saves', JSON.stringify(updated));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t.loadLayout}</DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto">
          {savedLayouts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t.noSaved}</p>
          ) : (
            <div className="space-y-3">
              {savedLayouts.map((layout, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{layout.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {layout.mode} • {formatDate(layout.timestamp)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {layout.elements.length} elements
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleLoad(layout)}
                          className="h-8"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {t.load}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(index)}
                          className="h-8"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
