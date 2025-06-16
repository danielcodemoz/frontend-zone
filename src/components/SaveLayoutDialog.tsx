
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface SaveLayoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  language: 'en' | 'pt';
}

interface SavedLayout {
  name: string;
  timestamp: number;
  mode: string;
}

export const SaveLayoutDialog: React.FC<SaveLayoutDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  language,
}) => {
  const [layoutName, setLayoutName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>(() => {
    const saved = localStorage.getItem('layout-playground-saves') || '[]';
    return JSON.parse(saved);
  });

  const t = {
    en: {
      saveLayout: 'Save Layout',
      layoutName: 'Layout Name',
      namePlaceholder: 'Enter layout name...',
      save: 'Save',
      cancel: 'Cancel',
      savedLayouts: 'Saved Layouts',
      deleteLayout: 'Delete',
      noSavedLayouts: 'No saved layouts yet',
      nameRequired: 'Please enter a layout name',
    },
    pt: {
      saveLayout: 'Salvar Layout',
      layoutName: 'Nome do Layout',
      namePlaceholder: 'Digite o nome do layout...',
      save: 'Salvar',
      cancel: 'Cancelar',
      savedLayouts: 'Layouts Salvos',
      deleteLayout: 'Deletar',
      noSavedLayouts: 'Nenhum layout salvo ainda',
      nameRequired: 'Por favor digite um nome para o layout',
    }
  };

  const translations = t[language];

  const handleSave = () => {
    if (!layoutName.trim()) {
      alert(translations.nameRequired);
      return;
    }
    onSave(layoutName.trim());
    setLayoutName('');
    onClose();
    
    // Update saved layouts list
    const saved = localStorage.getItem('layout-playground-saves') || '[]';
    const layouts = JSON.parse(saved);
    setSavedLayouts(layouts);
  };

  const handleDelete = (index: number) => {
    const saved = localStorage.getItem('layout-playground-saves') || '[]';
    const layouts = JSON.parse(saved);
    layouts.splice(index, 1);
    localStorage.setItem('layout-playground-saves', JSON.stringify(layouts));
    setSavedLayouts(layouts);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{translations.saveLayout}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="layoutName">{translations.layoutName}</Label>
            <Input
              id="layoutName"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
              placeholder={translations.namePlaceholder}
            />
          </div>

          {savedLayouts.length > 0 && (
            <div className="space-y-2">
              <Label>{translations.savedLayouts}</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {savedLayouts.map((layout, index) => (
                  <Card key={index} className="p-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{layout.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(layout.timestamp)} • {layout.mode}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {savedLayouts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              {translations.noSavedLayouts}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translations.cancel}
          </Button>
          <Button onClick={handleSave}>
            {translations.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
