import React, { useState } from 'react';
import { Project, ViewType } from '../types';
import { soundFX } from '../utils/audio';

interface MeusProjetosViewProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const MeusProjetosView: React.FC<MeusProjetosViewProps> = ({
  projects,
  onOpenNewProject,
  onNavigate,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'todos' | 'concluido' | 'renderizando' | 'agendado'>('todos');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    if (filter !== 'todos' && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              folder_special
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Meus Projetos</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a34] text-[#d0bcff]">
              {projects.length} totais
            </span>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Gerencie suas gravações mestre, batches de cortes e timelines ativas.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            onOpenNewProject();
          }}
          className="px-3.5 py-2 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:bg-[#d0bcff] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Novo Projeto</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0e18] p-3 rounded-xl border border-[#494454]/20">
        <div className="flex items-center gap-1 bg-[#171b25] p-0.5 rounded-lg border border-[#494454]/20">
          {(['todos', 'concluido', 'renderizando', 'agendado'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                soundFX.playClick();
                setFilter(st);
              }}
              className={`px-3 py-1.5 rounded text-[11px] font-mono transition-all capitalize cursor-pointer ${
                filter === st
                  ? 'bg-[#31353f] text-[#d0bcff] font-semibold'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-2.5 text-[16px] text-[#958ea0]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por nome..."
            className="pl-8 pr-3 py-1.5 bg-[#171b25] border border-[#494454]/30 rounded-lg text-[12px] text-[#dfe2f0] focus:outline-none focus:border-[#a078ff]"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              soundFX.playClick();
              onNavigate('editor-de-videos');
            }}
            className="group rounded-xl bg-[#1b1f2a] hover:bg-[#262a34] p-3.5 flex flex-col justify-between transition-all shadow-md border border-[#494454]/20 cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0a0e18]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={proj.thumbnail}
                  alt={proj.title}
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#0a0e18]/90 text-[10px] font-mono text-[#dfe2f0]">
                  {proj.resolution} {proj.fps}fps
                </span>

                {proj.status === 'concluido' && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#00a74b]/80 text-[#dfe2f0] text-[10px] font-mono font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[11px]">check_circle</span>{' '}
                    Concluído
                  </span>
                )}

                {proj.status === 'renderizando' && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#6001d1]/90 text-[#c9aeff] text-[10px] font-mono font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] animate-spin">sync</span>{' '}
                    Renderizando {proj.statusProgress}%
                  </span>
                )}

                {proj.status === 'agendado' && (
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#262a34]/90 text-[#dfe2f0] text-[10px] font-mono font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-[#d0bcff]">
                      schedule
                    </span>{' '}
                    Agendado
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-[#dfe2f0] line-clamp-1 group-hover:text-[#d0bcff] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-[12px] text-[#958ea0] mt-0.5">{proj.subtitle}</p>
              </div>

              {proj.status === 'renderizando' && (
                <div className="w-full bg-[#0a0e18] rounded-full h-1.5 overflow-hidden mt-1">
                  <div
                    className="bg-[#d2bbff] h-full rounded-full animate-pulse"
                    style={{ width: `${proj.statusProgress || 60}%` }}
                  />
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-[#494454]/20 flex items-center justify-between text-[#958ea0] text-[10px] font-mono">
              <span className="flex items-center gap-1 text-[#cbc3d7]">
                <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">
                  movie
                </span>{' '}
                {proj.shortsCount} cortes gerados
              </span>
              <span>{proj.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
