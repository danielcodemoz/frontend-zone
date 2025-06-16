
import React, { useRef, useState, useEffect } from 'react';
import { FlexboxConfig, GridConfig, LayoutElement, LayoutMode } from './LayoutPlayground';

interface LayoutSandboxProps {
  mode: LayoutMode;
  flexboxConfig: FlexboxConfig;
  gridConfig: GridConfig;
  elements: LayoutElement[];
  setElements: (elements: LayoutElement[]) => void;
}

export const LayoutSandbox: React.FC<LayoutSandboxProps> = ({
  mode,
  flexboxConfig,
  gridConfig,
  elements,
  setElements,
}) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [resizingElement, setResizingElement] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      minHeight: '400px',
      backgroundColor: '#1f2937',
      border: '2px dashed #6b7280',
      borderRadius: '8px',
      padding: '20px',
      position: 'relative',
      transition: 'all 0.3s ease',
    };

    if (mode === 'flexbox') {
      return {
        ...baseStyles,
        display: 'flex',
        flexDirection: flexboxConfig.direction,
        justifyContent: flexboxConfig.justifyContent,
        alignItems: flexboxConfig.alignItems,
        flexWrap: flexboxConfig.flexWrap,
        gap: `${flexboxConfig.gap}px`,
      };
    } else {
      return {
        ...baseStyles,
        display: 'grid',
        gridTemplateColumns: gridConfig.templateColumns,
        gridTemplateRows: gridConfig.templateRows,
        gap: `${gridConfig.gap}px`,
        columnGap: `${gridConfig.columnGap}px`,
        rowGap: `${gridConfig.rowGap}px`,
        justifyItems: gridConfig.justifyItems,
        alignItems: gridConfig.alignItems,
      };
    }
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string, action: 'drag' | 'resize') => {
    e.preventDefault();
    if (action === 'drag') {
      setDraggedElement(elementId);
    } else if (action === 'resize') {
      setResizingElement(elementId);
      const element = elements.find(el => el.id === elementId);
      if (element) {
        setStartSize({ width: element.width, height: element.height });
      }
    }
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingElement) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      setElements(elements.map(el => 
        el.id === resizingElement 
          ? {
              ...el,
              width: Math.max(50, startSize.width + deltaX),
              height: Math.max(50, startSize.height + deltaY)
            }
          : el
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    setResizingElement(null);
  };

  useEffect(() => {
    if (resizingElement) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizingElement, startPos, startSize]);

  const updateElementColor = (elementId: string) => {
    const newColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, backgroundColor: newColor } : el
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Layout Sandbox</h3>
      
      <div style={getContainerStyles()}>
        {elements.map((element) => (
          <div
            key={element.id}
            className="relative group cursor-move transition-transform duration-200 hover:scale-105"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: element.backgroundColor,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              userSelect: 'none',
              border: draggedElement === element.id ? '2px solid #fbbf24' : '2px solid transparent',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id, 'drag')}
            onClick={() => updateElementColor(element.id)}
          >
            {element.label}
            
            {/* Resize Handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                borderRadius: '0 0 8px 0',
                clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e, element.id, 'resize');
              }}
            />
            
            {/* Element Info Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {element.width}×{element.height}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-sm text-gray-400 space-y-1">
        <p>💡 Click elements to change colors</p>
        <p>💡 Drag the bottom-right corner to resize</p>
        <p>💡 Elements respond to layout changes in real-time</p>
      </div>
    </div>
  );
};
