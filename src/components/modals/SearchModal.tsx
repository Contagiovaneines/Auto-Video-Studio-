import React, { useState, useEffect } from 'react';
import { ViewType } from '../../types';
import { soundFX } from '../../utils/audio';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  view: ViewType;
  badge?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const items: SearchItem[] = [
    { id: '1', title: 'Dashboard Geral', category: 'Navegação', icon: 'dashboard', view: 'dashboard' },
    { id: '2', title: 'Editor de Vídeos NLE', category: 'Produção', icon: 'movie_edit', view: 'editor-de-videos', badge: 'NLE' },
    { id: '3', title: 'Cortes com IA (Extrator Viral)', category: 'Automação', icon: 'auto_videocam', view: 'cortes-com-ia', badge: 'AUTO' },
    { id: '4', title: 'Publicador Automático & Simulador Feed', category: 'Distribuição', icon: 'send', view: 'publicador-automatico' },
    { id: '5', title: 'Meus Projetos', category: 'Produção', icon: 'folder_special', view: 'meus-projetos' },
    { id: '6', title: 'Processamento em Lote (Fila RTX 4090)', category: 'Automação', icon: 'layers', view: 'processamento-em-lote', badge: '3 ATIVOS' },
    { id: '7', title: 'Templates de Legendas Virais', category: 'Automação', icon: 'dashboard_customize', view: 'templates' },
    { id: '8', title: 'Legendas Automáticas Whisper V3', category: 'Automação', icon: 'subtitles', view: 'legendas-automaticas' },
    { id: '9', title: 'Calendário de Postagens', category: 'Distribuição', icon: 'calendar_month', view: 'calendario' },
    { id: '10', title: 'Contas Conectadas (TikTok, Reels, Shorts)', category: 'Distribuição', icon: 'hub', view: 'contas-conectadas' },
    { id: '11', title: 'Analytics & Curva de Retenção', category: 'Distribuição', icon: 'query_stats', view: 'analytics' },
    { id: '12', title: 'Configurações de GPU & Pipeline', category: 'Sistema', icon: 'settings', view: 'configuracoes' },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#1b1f2a] border border-[#494454] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#494454]/40 flex items-center gap-2.5 bg-[#171b25]">
          <span className="material-symbols-outlined text-[20px] text-[#d0bcff]">
            search
          </span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite para buscar ferramentas, projetos ou recursos..."
            className="flex-1 bg-transparent text-[13px] text-[#dfe2f0] placeholder-[#958ea0] focus:outline-none font-sans"
          />
          <kbd className="font-mono text-[10px] text-[#958ea0] bg-[#0a0e18] px-2 py-0.5 rounded border border-[#494454]/40">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-[#958ea0] text-[12px]">
              Nenhum resultado encontrado para "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playClick();
                  onNavigate(item.view);
                  onClose();
                }}
                className="w-full p-2.5 rounded-lg flex items-center justify-between text-left hover:bg-[#262a34] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#171b25] text-[#d0bcff] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-[13px] font-medium text-[#dfe2f0] group-hover:text-[#d0bcff] transition-colors">
                      {item.title}
                    </h5>
                    <span className="text-[10px] font-mono text-[#958ea0]">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#6001d1]/30 text-[#d2bbff]">
                      {item.badge}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[16px] text-[#958ea0] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-2.5 bg-[#0a0e18] border-t border-[#494454]/30 flex items-center justify-between text-[11px] font-mono text-[#958ea0]">
          <span>Navegue com setas ou mouse</span>
          <span className="text-[#4ae176]">Auto Video Studio v4.8</span>
        </div>
      </div>
    </div>
  );
};
