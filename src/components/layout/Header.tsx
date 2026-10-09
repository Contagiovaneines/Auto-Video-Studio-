import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { soundFX } from '../../utils/audio';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onToggleMobileMenu: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onToggleMobileMenu,
  unreadCount = 4,
}) => {
  const [activeBatch, setActiveBatch] = useState('Shorts Virais Batch #04');
  const [showBatchMenu, setShowBatchMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const batches = [
    'Shorts Virais Batch #04',
    'Podcasts Master Batch #03',
    'Cortes Instagram Batch #02',
    'Reels High Engagement #01',
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#0a0e18]/85 backdrop-blur-xl border-b border-[#494454]/20 z-40 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-3">
      {/* Left: Mobile Menu + Breadcrumbs + Batch selector */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 rounded hover:bg-[#262a34] text-[#dfe2f0] transition-colors"
          title="Menu"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-[#cbc3d7] text-[12px]">
          <span className="text-[#958ea0] hover:text-[#dfe2f0] cursor-pointer transition-colors">
            Studio
          </span>
          <span className="material-symbols-outlined text-[14px] text-[#494454]">
            chevron_right
          </span>
          <span className="text-[#dfe2f0] font-medium">Workstation Core</span>
        </div>

        <div className="hidden sm:block h-4 w-px bg-[#494454]/40" />

        {/* Batch Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              soundFX.playClick();
              setShowBatchMenu(!showBatchMenu);
            }}
            className="flex items-center gap-1.5 bg-[#171b25] border border-[#494454]/30 px-2.5 py-1 rounded cursor-pointer hover:border-[#958ea0]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">
              movie
            </span>
            <span className="text-[11px] font-mono text-[#dfe2f0] max-w-[120px] sm:max-w-[170px] truncate">
              {activeBatch}
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#958ea0]">
              unfold_more
            </span>
          </button>

          {showBatchMenu && (
            <div className="absolute left-0 mt-1 w-64 bg-[#1b1f2a] border border-[#494454] rounded-lg shadow-2xl py-1 z-50">
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#958ea0] border-b border-[#494454]/30">
                Selecionar Batch Ativo
              </div>
              {batches.map((batch) => (
                <button
                  key={batch}
                  onClick={() => {
                    setActiveBatch(batch);
                    setShowBatchMenu(false);
                    soundFX.playClick();
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12px] flex items-center justify-between hover:bg-[#262a34] transition-colors ${
                    activeBatch === batch ? 'text-[#d0bcff] font-semibold bg-[#262a34]/60' : 'text-[#dfe2f0]'
                  }`}
                >
                  <span className="truncate">{batch}</span>
                  {activeBatch === batch && (
                    <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="flex-1 max-w-xl mx-2">
        <button
          onClick={() => {
            soundFX.playClick();
            onOpenSearch();
          }}
          className="w-full relative flex items-center text-left group"
        >
          <span className="material-symbols-outlined absolute left-3 text-[#958ea0] text-[18px] group-hover:text-[#d0bcff] transition-colors">
            search
          </span>
          <div className="w-full pl-9 pr-14 py-1.5 bg-[#171b25] border border-[#494454]/30 rounded text-[#dfe2f0] text-[12px] group-hover:border-[#958ea0]/50 transition-all truncate">
            <span className="text-[#958ea0]">Pesquisar projetos, clipes, templates ou atalhos...</span>
          </div>
          <kbd className="absolute right-2 font-mono text-[10px] text-[#958ea0] bg-[#1b1f2a] px-1.5 py-0.5 rounded border border-[#494454]/40 hidden sm:inline-block">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Engine Connected + Rendering Status + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* IA Engine Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00a74b]/10 border border-[#4ae176]/20">
          <span className="w-2 h-2 rounded-full bg-[#4ae176] animate-pulse" />
          <span className="text-[10px] font-mono text-[#4ae176] font-medium">
            IA Engine Conectado
          </span>
        </div>

        {/* Rendering Indicator */}
        <div
          onClick={() => soundFX.playClick()}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#6001d1]/20 border border-[#d2bbff]/20 cursor-pointer hover:bg-[#6001d1]/30 transition-colors"
          title="3 renderizações ativas na fila"
        >
          <span className="material-symbols-outlined text-[15px] text-[#d2bbff] animate-spin">
            sync
          </span>
          <span className="text-[10px] font-mono text-[#d2bbff] font-medium">
            3 renderizando
          </span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenNotifications();
            }}
            className="relative cursor-pointer p-1.5 rounded hover:bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2f0] transition-colors"
            title="Notificações"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#a078ff] text-[#340080] font-mono text-[9px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center bg-[#171b25] border border-[#494454]/30 rounded p-0.5">
          <button
            onClick={() => {
              soundFX.playClick();
              setViewMode('grid');
            }}
            className={`p-1 rounded transition-colors flex items-center justify-center ${
              viewMode === 'grid' ? 'bg-[#31353f] text-[#dfe2f0]' : 'text-[#958ea0] hover:text-[#dfe2f0]'
            }`}
            title="Grid View"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
          </button>
          <button
            onClick={() => {
              soundFX.playClick();
              setViewMode('timeline');
            }}
            className={`p-1 rounded transition-colors flex items-center justify-center ${
              viewMode === 'timeline' ? 'bg-[#31353f] text-[#dfe2f0]' : 'text-[#958ea0] hover:text-[#dfe2f0]'
            }`}
            title="Timeline View"
          >
            <span className="material-symbols-outlined text-[16px]">view_timeline</span>
          </button>
        </div>

        <div className="h-4 w-px bg-[#494454]/40" />

        {/* Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-1 cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#494454]/40 group-hover:border-[#d0bcff] transition-colors"
              src={ASSETS.userAvatar}
            />
            <span className="material-symbols-outlined text-[16px] text-[#958ea0] group-hover:text-[#dfe2f0] transition-colors">
              expand_more
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#1b1f2a] border border-[#494454] rounded-lg shadow-2xl py-1 z-50">
              <div className="px-3 py-2 border-b border-[#494454]/30">
                <p className="text-[13px] font-semibold text-[#dfe2f0]">Rafael Criativo</p>
                <p className="text-[11px] font-mono text-[#958ea0]">rafael.criativo@studio.ai</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#6001d1]/40 text-[#d2bbff] text-[9px] font-mono font-bold">
                  PLANO PRO ILIMITADO
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-[#cbc3d7] hover:bg-[#262a34] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  Configurações de GPU
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-[#cbc3d7] hover:bg-[#262a34] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">token</span>
                  Chaves de API & Webhooks
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-[#ffb4ab] hover:bg-[#262a34] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Desconectar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
