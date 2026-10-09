import React from 'react';
import { ViewType } from '../../types';
import { ASSETS } from '../../data/mockData';
import { soundFX } from '../../utils/audio';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const handleNav = (view: ViewType) => {
    soundFX.playClick();
    onNavigate(view);
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = (view: ViewType) => {
    const isActive = currentView === view;
    return `flex items-center justify-between px-3 py-1.5 rounded transition-all cursor-pointer ${
      isActive
        ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-[0_0_12px_rgba(160,120,255,0.25)]'
        : 'text-[#cbc3d7] hover:bg-[#262a34] hover:text-[#dfe2f0]'
    }`;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-[#0a0e18] z-50 flex flex-col justify-between border-r border-[#494454]/30 select-none transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col min-h-0">
          {/* Logo & Brand Header */}
          <div className="h-16 px-3 flex items-center justify-between border-b border-[#494454]/20 bg-[#0a0e18]/80">
            <button
              onClick={() => handleNav('dashboard')}
              className="flex items-center gap-2 text-left group"
            >
              <img
                alt="Auto Video Studio Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src={ASSETS.logo}
              />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#dfe2f0] tracking-tight leading-none">
                  Auto Video
                </span>
                <span className="text-[12px] font-bold text-[#d0bcff] tracking-tight leading-none">
                  Studio
                </span>
              </div>
            </button>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#6001d1] text-[#c9aeff] tracking-wider uppercase font-bold">
              PRO AI
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="overflow-y-auto px-2 py-2 space-y-0.5 max-h-[calc(100vh-14rem)] text-[13px]">
            {/* Group 1: Produção & NLE */}
            <div className="px-2 pt-1 pb-1">
              <span className="text-[10px] font-mono text-[#958ea0] tracking-wider uppercase font-semibold">
                Produção & NLE
              </span>
            </div>

            <button
              className={`w-full ${navItemClass('dashboard')}`}
              onClick={() => handleNav('dashboard')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span>Dashboard</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'dashboard' ? 'bg-black/20 text-[#340080]' : 'bg-[#1b1f2a] text-[#958ea0]'}`}>
                /01
              </span>
            </button>

            <button
              className={`w-full ${navItemClass('meus-projetos')}`}
              onClick={() => handleNav('meus-projetos')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">folder_special</span>
                <span>Meus Projetos</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'meus-projetos' ? 'bg-black/20 text-[#340080]' : 'bg-[#1b1f2a] text-[#958ea0]'}`}>
                18
              </span>
            </button>

            <button
              className={`w-full ${navItemClass('biblioteca-de-videos')}`}
              onClick={() => handleNav('biblioteca-de-videos')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">video_library</span>
                <span>Biblioteca de Vídeos</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('editor-de-videos')}`}
              onClick={() => handleNav('editor-de-videos')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">movie_edit</span>
                <span>Editor de Vídeos</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'editor-de-videos' ? 'bg-black/20 text-[#340080]' : 'bg-[#d0bcff]/20 text-[#d0bcff]'}`}>
                NLE
              </span>
            </button>

            {/* Group 2: Automação & IA */}
            <div className="px-2 pt-3 pb-1">
              <span className="text-[10px] font-mono text-[#958ea0] tracking-wider uppercase font-semibold">
                Automação & IA
              </span>
            </div>

            <button
              className={`w-full ${navItemClass('cortes-com-ia')}`}
              onClick={() => handleNav('cortes-com-ia')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">auto_videocam</span>
                <span>Cortes com IA</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'cortes-com-ia' ? 'bg-black/20 text-[#340080]' : 'bg-[#00a74b]/30 text-[#4ae176]'}`}>
                AUTO
              </span>
            </button>

            <button
              className={`w-full ${navItemClass('processamento-em-lote')}`}
              onClick={() => handleNav('processamento-em-lote')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">layers</span>
                <span>Processamento em Lote</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'processamento-em-lote' ? 'bg-black/20 text-[#340080]' : 'bg-[#6001d1] text-[#c9aeff]'}`}>
                3 ATIVOS
              </span>
            </button>

            <button
              className={`w-full ${navItemClass('templates')}`}
              onClick={() => handleNav('templates')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">dashboard_customize</span>
                <span>Templates</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('legendas-automaticas')}`}
              onClick={() => handleNav('legendas-automaticas')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">subtitles</span>
                <span>Legendas Automáticas</span>
              </div>
            </button>

            {/* Group 3: Distribuição & Gestão */}
            <div className="px-2 pt-3 pb-1">
              <span className="text-[10px] font-mono text-[#958ea0] tracking-wider uppercase font-semibold">
                Distribuição & Gestão
              </span>
            </div>

            <button
              className={`w-full ${navItemClass('publicador-automatico')}`}
              onClick={() => handleNav('publicador-automatico')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Publicador Automático</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('calendario')}`}
              onClick={() => handleNav('calendario')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Calendário</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('contas-conectadas')}`}
              onClick={() => handleNav('contas-conectadas')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">hub</span>
                <span>Contas Conectadas</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${currentView === 'contas-conectadas' ? 'bg-black/20 text-[#340080]' : 'bg-[#1b1f2a] text-[#4ae176]'}`}>
                6 ON
              </span>
            </button>

            <button
              className={`w-full ${navItemClass('analytics')}`}
              onClick={() => handleNav('analytics')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">query_stats</span>
                <span>Analytics</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('historico')}`}
              onClick={() => handleNav('historico')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">history</span>
                <span>Histórico</span>
              </div>
            </button>

            <button
              className={`w-full ${navItemClass('configuracoes')}`}
              onClick={() => handleNav('configuracoes')}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span>Configurações</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Hardware & Storage Monitor */}
        <div className="p-2 border-t border-[#494454]/20 bg-[#0a0e18]/90 flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-2 py-1 rounded bg-[#171b25] border border-[#494454]/30">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ae176] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ae176]"></span>
              </span>
              <span className="text-[10px] font-mono text-[#cbc3d7]">RTX 4090 / CUDA</span>
            </div>
            <span className="text-[10px] font-mono text-[#4ae176] font-semibold">ATIVO</span>
          </div>

          <div className="flex flex-col gap-1 px-1">
            <div className="flex justify-between items-center text-[#958ea0]">
              <span className="text-[10px] font-mono">NVMe Storage</span>
              <span className="text-[10px] font-mono text-[#cbc3d7]">64.2 / 500 GB</span>
            </div>
            <div className="w-full bg-[#1b1f2a] rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#d0bcff] h-full rounded-full" style={{ width: '12.8%' }}></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
