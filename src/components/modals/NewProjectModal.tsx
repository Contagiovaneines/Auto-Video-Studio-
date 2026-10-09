import React, { useState } from 'react';
import { Project } from '../../types';
import { ASSETS } from '../../data/mockData';
import { soundFX } from '../../utils/audio';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('Cortes Virais Inteligentes');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [aiAutoHook, setAiAutoHook] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundFX.playDing();
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      thumbnail: ASSETS.podcastMasterStage,
      resolution: '1080x1920',
      fps: 60,
      status: 'renderizando',
      statusProgress: 15,
      shortsCount: 8,
      timeAgo: 'Agora',
      aspectRatio,
    };

    onCreateProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#1b1f2a] border border-[#494454] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#494454]/40 flex items-center justify-between bg-[#171b25]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#d0bcff]">
              add_circle
            </span>
            <h3 className="text-[15px] font-semibold text-[#dfe2f0]">
              Criar Novo Projeto de Cortes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#958ea0] hover:text-[#dfe2f0] p-1 rounded"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#958ea0] mb-1">
              Nome do Projeto / Episódio
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Podcast Insights #43 - IA e Produtividade"
              className="w-full px-3 py-2 bg-[#171b25] border border-[#494454]/40 rounded-lg text-[13px] text-[#dfe2f0] focus:outline-none focus:border-[#a078ff] focus:ring-1 focus:ring-[#a078ff]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#958ea0] mb-1">
              Descrição / Foco do Conteúdo
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Ganchos para retenção acima de 80%"
              className="w-full px-3 py-2 bg-[#171b25] border border-[#494454]/40 rounded-lg text-[13px] text-[#dfe2f0] focus:outline-none focus:border-[#a078ff]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#958ea0] mb-1">
              Formato de Saída Primário
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-2 rounded-lg border text-center transition-all ${
                  aspectRatio === '9:16'
                    ? 'border-[#a078ff] bg-[#a078ff]/15 text-[#d0bcff]'
                    : 'border-[#494454]/40 bg-[#171b25] text-[#958ea0]'
                }`}
              >
                <div className="text-[12px] font-semibold">9:16</div>
                <div className="text-[10px] font-mono">Shorts / Reels</div>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-2 rounded-lg border text-center transition-all ${
                  aspectRatio === '16:9'
                    ? 'border-[#a078ff] bg-[#a078ff]/15 text-[#d0bcff]'
                    : 'border-[#494454]/40 bg-[#171b25] text-[#958ea0]'
                }`}
              >
                <div className="text-[12px] font-semibold">16:9</div>
                <div className="text-[10px] font-mono">YouTube Longo</div>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('1:1')}
                className={`p-2 rounded-lg border text-center transition-all ${
                  aspectRatio === '1:1'
                    ? 'border-[#a078ff] bg-[#a078ff]/15 text-[#d0bcff]'
                    : 'border-[#494454]/40 bg-[#171b25] text-[#958ea0]'
                }`}
              >
                <div className="text-[12px] font-semibold">1:1</div>
                <div className="text-[10px] font-mono">Feed Quadrado</div>
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#171b25] rounded-lg border border-[#494454]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#4ae176]">
                auto_awesome
              </span>
              <div>
                <p className="text-[12px] font-semibold text-[#dfe2f0]">
                  Detecção Automática de Ganchos (IA)
                </p>
                <p className="text-[10px] text-[#958ea0]">
                  Analisa tom de voz, pausas e picos emocionais
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={aiAutoHook}
              onChange={(e) => setAiAutoHook(e.target.checked)}
              className="accent-[#a078ff] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#262a34] text-[#dfe2f0] text-[12px] hover:bg-[#31353f] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#a078ff] text-[#340080] font-semibold text-[12px] hover:bg-[#d0bcff] transition-all flex items-center gap-1.5 shadow-lg shadow-[#a078ff]/20"
            >
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Criar & Iniciar Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
