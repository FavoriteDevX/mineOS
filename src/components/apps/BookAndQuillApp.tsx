import React, { useState, useEffect } from 'react';
import { SoundEngine } from '../../utils/audio';
import { ItemBookAndQuill, ItemWrittenBook } from '../MinecraftBlockIcons';

interface BookPage {
  pageNumber: number;
  content: string;
}

export const BookAndQuillApp: React.FC = () => {
  const [pages, setPages] = useState<BookPage[]>(() => {
    try {
      const saved = localStorage.getItem('mc_book_pages');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      {
        pageNumber: 1,
        content:
          'Day 1 in minecraftOS.\n\n' +
          'Found a lush valley surrounded by cherry blossom trees. The mountain looks perfect for building a grand observatory castle.\n\n' +
          'Gathered 64 oak logs, crafted a furnace, and started digging down to Y=-58 for diamonds.',
      },
      {
        pageNumber: 2,
        content:
          'Day 2.\n\n' +
          'Built an automated redstone sorting system for ores. The villagers in the nearby plains agreed to trade enchanted books for 16 emeralds.\n\n' +
          'Remember: never dig straight down!',
      },
    ];
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [bookTitle, setBookTitle] = useState('Steve’s Journal');
  const [isSigned, setIsSigned] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('mc_book_pages', JSON.stringify(pages));
  }, [pages]);

  const currentPage = pages[currentPageIndex] || { pageNumber: 1, content: '' };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSigned) return;
    const newContent = e.target.value;
    setPages((prev) =>
      prev.map((p, idx) => (idx === currentPageIndex ? { ...p, content: newContent } : p))
    );
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      SoundEngine.playPop(0.25);
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      SoundEngine.playPop(0.25);
      setCurrentPageIndex((prev) => prev + 1);
    } else if (!isSigned) {
      // Add new page
      SoundEngine.playPop(0.25);
      setPages((prev) => [...prev, { pageNumber: prev.length + 1, content: '' }]);
      setCurrentPageIndex(pages.length);
    }
  };

  const handleSave = () => {
    SoundEngine.playLevelUp(0.3);
    localStorage.setItem('mc_book_pages', JSON.stringify(pages));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleSign = () => {
    SoundEngine.playLevelUp(0.4);
    setIsSigned(true);
  };

  const wordCount = currentPage.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#3d2614] p-3 text-[#2a170a] select-none mc-font overflow-hidden">
      {/* Top Leather Binder Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#5e3a1f] border-b-2 border-[#2b190c] text-white text-sm mb-2 rounded-t">
        <div className="flex items-center gap-2">
          {isSigned ? <ItemWrittenBook size={22} /> : <ItemBookAndQuill size={22} />}
          <input
            type="text"
            value={bookTitle}
            disabled={isSigned}
            onChange={(e) => setBookTitle(e.target.value)}
            className="bg-transparent text-white font-bold text-base outline-none border-b border-transparent focus:border-[#ffff55] mc-font"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {saveToast && <span className="text-[#55ff55] font-bold">Saved!</span>}
          <button
            type="button"
            onClick={handleSave}
            className="px-2 py-0.5 mc-button text-xs font-bold"
          >
            Save Draft
          </button>
          {!isSigned ? (
            <button
              type="button"
              onClick={handleSign}
              className="px-2 py-0.5 mc-button mc-button-green text-xs font-bold"
            >
              Sign & Seal
            </button>
          ) : (
            <span className="px-2 py-0.5 bg-[#2b742b] text-white font-bold rounded flex items-center gap-1">
              <ItemWrittenBook size={14} /> Signed by Steve
            </span>
          )}
        </div>
      </div>

      {/* Main Parchment Paper Viewport */}
      <div className="flex-1 bg-[#f4ebd0] border-4 border-[#c2aa7f] shadow-inner p-4 flex flex-col rounded relative overflow-hidden">
        {/* Subtle page texture lines with authentic Minecraft font */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={currentPage.content}
            onChange={handleTextChange}
            readOnly={isSigned}
            placeholder="Type your notes, coordinate logs, and building plans here..."
            className="flex-1 w-full bg-transparent resize-none outline-none mc-font text-base leading-relaxed text-[#2a170a] selection:bg-[#c2aa7f]"
          />
        </div>

        {/* Bottom Page Navigation Controls */}
        <div className="pt-2 border-t border-[#c2aa7f] flex items-center justify-between text-xs text-[#553a20] font-bold">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            className="px-3 py-1 mc-button disabled:opacity-40"
          >
            ◀ Previous
          </button>

          <span>
            Page {currentPageIndex + 1} of {pages.length} · {wordCount} words
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            className="px-3 py-1 mc-button"
          >
            {currentPageIndex === pages.length - 1 && !isSigned ? '+ Add Page ▶' : 'Next ▶'}
          </button>
        </div>
      </div>
    </div>
  );
};
