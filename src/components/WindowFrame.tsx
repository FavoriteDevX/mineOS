import React, { useState, useRef, useEffect } from 'react';
import { SoundEngine } from '../utils/audio';

interface WindowFrameProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialPos?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  icon,
  isOpen,
  isMinimized,
  zIndex,
  initialPos = { x: 120, y: 80 },
  initialSize = { width: 680, height: 480 },
  minWidth = 360,
  minHeight = 280,
  onClose,
  onMinimize,
  onFocus,
  children,
}) => {
  const [position, setPosition] = useState(initialPos);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevBounds, setPrevBounds] = useState({ position: initialPos, size: initialSize });

  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && !isMaximized) {
        const newX = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - dragOffset.current.x));
        const newY = Math.max(28, Math.min(window.innerHeight - 80, e.clientY - dragOffset.current.y));
        setPosition({ x: newX, y: newY });
      } else if (isResizing.current && !isMaximized) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        setSize({
          width: Math.max(minWidth, resizeStart.current.width + deltaX),
          height: Math.max(minHeight, resizeStart.current.height + deltaY),
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      isResizing.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMaximized, minWidth, minHeight]);

  if (!isOpen || isMinimized) return null;

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
    isResizing.current = true;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  const toggleMaximize = () => {
    SoundEngine.playClick(0.3);
    if (!isMaximized) {
      setPrevBounds({ position, size });
      setPosition({ x: 0, y: 32 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 32 - 64 });
      setIsMaximized(true);
    } else {
      setPosition(prevBounds.position);
      setSize(prevBounds.size);
      setIsMaximized(false);
    }
  };

  const handleClose = () => {
    SoundEngine.playChestClose(0.35);
    onClose();
  };

  const handleMinimize = () => {
    SoundEngine.playClick(0.25);
    onMinimize();
  };

  const currentX = isMaximized ? 0 : position.x;
  const currentY = isMaximized ? 32 : position.y;
  const currentW = isMaximized ? window.innerWidth : size.width;
  const currentH = isMaximized ? window.innerHeight - 96 : size.height;

  return (
    <div
      role="dialog"
      aria-label={title}
      onMouseDown={onFocus}
      style={{
        transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
        width: `${currentW}px`,
        height: `${currentH}px`,
        zIndex,
      }}
      className="absolute top-0 left-0 flex flex-col mc-window-frame select-none transition-shadow shadow-2xl"
    >
      {/* Minecraft Window Title Bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={toggleMaximize}
        className="flex items-center justify-between px-3 py-1.5 bg-[#4f4f4f] text-white border-b-2 border-[#373737] cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {icon && <span className="shrink-0 flex items-center">{icon}</span>}
          <span className="font-bold mc-font text-base tracking-wide text-[#ffffff] mc-text-shadow truncate">
            {title}
          </span>
        </div>

        {/* Window action buttons in Minecraft style */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleMinimize}
            title="Minimize"
            aria-label="Minimize Window"
            className="w-6 h-6 flex items-center justify-center mc-button text-xs font-bold text-white"
          >
            _
          </button>
          <button
            type="button"
            onClick={toggleMaximize}
            title="Maximize"
            aria-label="Maximize Window"
            className="w-6 h-6 flex items-center justify-center mc-button text-xs font-bold text-white"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            title="Close"
            aria-label="Close Window"
            className="w-6 h-6 flex items-center justify-center mc-button mc-button-danger text-xs font-bold text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto bg-[#c6c6c6] p-2 flex flex-col relative text-[#222222]">
        {children}
      </div>

      {/* Resize Grip (bottom-right) */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
        >
          <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-[#555555]" />
        </div>
      )}
    </div>
  );
};
