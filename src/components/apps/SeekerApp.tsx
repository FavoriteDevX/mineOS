import React, { useState } from 'react';
import { VirtualFile } from '../../utils/minecraftLogic';
import { SoundEngine } from '../../utils/audio';
import {
  BlockChest,
  BlockGrass,
  ResourceRedstone,
  ItemLavaBucket,
  ItemPaper,
  ItemBookAndQuill,
  ItemEnderPearl,
} from '../MinecraftBlockIcons';

interface SeekerAppProps {
  files: VirtualFile[];
  onUpdateFiles: (files: VirtualFile[]) => void;
  onOpenFileInNotes?: (file: VirtualFile) => void;
}

export const SeekerApp: React.FC<SeekerAppProps> = ({
  files,
  onUpdateFiles,
  onOpenFileInNotes,
}) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('desktop');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const folders = [
    { id: 'desktop', name: 'Desktop', icon: <BlockGrass size={18} /> },
    { id: 'worlds', name: 'Saved Worlds', icon: <BlockChest size={18} /> },
    { id: 'recipes', name: 'Redstone Blueprints', icon: <ResourceRedstone size={18} /> },
    { id: 'trash', name: 'Lava Trash', icon: <ItemLavaBucket size={18} /> },
  ];

  const currentFiles = files.filter((f) => f.parentId === selectedFolderId);
  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleSelectFolder = (folderId: string) => {
    SoundEngine.playClick(0.2);
    setSelectedFolderId(folderId);
    setSelectedFileId(null);
    setPreviewContent(null);
  };

  const handleSelectFile = (file: VirtualFile) => {
    SoundEngine.playPop(0.25);
    setSelectedFileId(file.id);
    setPreviewContent(file.content || null);
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    const newFile: VirtualFile = {
      id: `file-${Date.now()}`,
      name: newFileName.endsWith('.txt') ? newFileName : `${newFileName}.txt`,
      type: 'file',
      parentId: selectedFolderId === 'trash' ? 'desktop' : selectedFolderId,
      size: '0.4 KB',
      updatedAt: 'Just now',
      content: `# ${newFileName}\nCreated inside minecraftOS Seeker.`,
    };
    onUpdateFiles([...files, newFile]);
    setNewFileName('');
    setIsCreatingFile(false);
    SoundEngine.playLevelUp(0.3);
  };

  const handleDeleteFile = (fileId: string) => {
    SoundEngine.playEat(0.3); // Sizzle sound
    if (selectedFolderId === 'trash') {
      // Permanently incinerate
      onUpdateFiles(files.filter((f) => f.id !== fileId));
      setSelectedFileId(null);
      setPreviewContent(null);
    } else {
      // Move to trash
      onUpdateFiles(
        files.map((f) => (f.id === fileId ? { ...f, parentId: 'trash' } : f))
      );
      setSelectedFileId(null);
      setPreviewContent(null);
    }
  };

  const handleRestoreFile = (fileId: string) => {
    SoundEngine.playPop(0.3);
    onUpdateFiles(
      files.map((f) => (f.id === fileId ? { ...f, parentId: 'desktop' } : f))
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden mc-font">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-[#a0a0a0] border-b-2 border-[#555555] text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCreatingFile(!isCreatingFile)}
            className="px-2 py-1 mc-button text-xs font-bold"
          >
            + New Scroll
          </button>
          <span className="text-[#333333] font-bold">
            Location: /{folders.find((f) => f.id === selectedFolderId)?.name}
          </span>
        </div>

        <span className="text-xs text-[#444444] font-bold">
          {currentFiles.length} item{currentFiles.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* New file input form */}
      {isCreatingFile && (
        <div className="p-2 bg-[#8b8b8b] border-b-2 border-[#555555] flex items-center gap-2">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Document_Name.txt"
            className="px-2 py-1 mc-input text-sm flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
          />
          <button
            type="button"
            onClick={handleCreateFile}
            className="px-3 py-1 mc-button mc-button-green text-xs font-bold"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setIsCreatingFile(false)}
            className="px-2 py-1 mc-button text-xs font-bold"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Main Split Body: Sidebar and File List */}
      <div className="flex-1 flex overflow-hidden">
        {/* macOS Left Sidebar Parody */}
        <div className="w-44 bg-[#8b8b8b] border-r-2 border-[#555555] p-2 flex flex-col gap-1 shrink-0">
          <span className="text-[11px] font-bold text-[#333333] uppercase tracking-wider mb-1">
            Favorites
          </span>
          {folders.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleSelectFolder(f.id)}
              className={`flex items-center gap-2 px-2 py-1 text-sm text-left font-bold transition-all ${
                selectedFolderId === f.id
                  ? 'bg-[#373737] text-[#ffffff] mc-text-shadow'
                  : 'hover:bg-[#a0a0a0] text-[#111111]'
              }`}
            >
              <span>{f.icon}</span>
              <span className="truncate">{f.name}</span>
            </button>
          ))}
        </div>

        {/* Right Content Area: Files list */}
        <div className="flex-1 flex flex-col bg-[#c6c6c6] overflow-auto">
          {currentFiles.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#555555]">
              <div className="mb-2">
                <BlockChest size={40} />
              </div>
              <p className="font-bold text-base text-[#222222]">This chest is completely empty.</p>
              <p className="text-xs text-[#555555]">Click '+ New Scroll' above to craft files here.</p>
            </div>
          ) : (
            <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-max">
              {currentFiles.map((file) => {
                const isSelected = selectedFileId === file.id;
                return (
                  <button
                    key={file.id}
                    type="button"
                    onClick={() => handleSelectFile(file)}
                    className={`flex flex-col items-center p-2 text-center rounded border transition-colors ${
                      isSelected
                        ? 'bg-[#386cb0] text-white border-[#ffffff] mc-text-shadow'
                        : 'hover:bg-[#b0b0b0] border-transparent text-[#222222]'
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-center w-8 h-8">
                      {file.name.endsWith('.dat') ? (
                        <ItemEnderPearl size={28} />
                      ) : (
                        <ItemPaper size={28} />
                      )}
                    </div>
                    <span className="text-xs font-bold break-all leading-tight max-w-full">
                      {file.name}
                    </span>
                    <span className="text-[10px] opacity-80 mt-1">
                      {file.size || '1 KB'} · {file.updatedAt}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom File Preview Bar if a file is selected */}
          {selectedFile && (
            <div className="p-2 bg-[#8b8b8b] border-t-2 border-[#555555] flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#111111]">
                  <ItemPaper size={16} />
                  <span>Selected: {selectedFile.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {onOpenFileInNotes && selectedFile.name.endsWith('.txt') && (
                    <button
                      type="button"
                      onClick={() => onOpenFileInNotes(selectedFile)}
                      className="flex items-center gap-1 px-2 py-0.5 mc-button text-xs font-bold"
                    >
                      <ItemBookAndQuill size={14} />
                      <span>Open in CraftNotes</span>
                    </button>
                  )}
                  {selectedFolderId === 'trash' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleRestoreFile(selectedFile.id)}
                        className="px-2 py-0.5 mc-button mc-button-green text-xs font-bold"
                      >
                        Restore
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFile(selectedFile.id)}
                        className="flex items-center gap-1 px-2 py-0.5 mc-button mc-button-danger text-xs font-bold"
                      >
                        <ItemLavaBucket size={14} />
                        <span>Incinerate</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(selectedFile.id)}
                      className="flex items-center gap-1 px-2 py-0.5 mc-button mc-button-danger text-xs font-bold"
                    >
                      <ItemLavaBucket size={14} />
                      <span>Dump in Lava</span>
                    </button>
                  )}
                </div>
              </div>

              {previewContent && (
                <div className="p-2 bg-[#1e1e1e] text-[#55ff55] font-mono text-[11px] max-h-24 overflow-y-auto whitespace-pre-wrap border border-[#333333]">
                  {previewContent}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
