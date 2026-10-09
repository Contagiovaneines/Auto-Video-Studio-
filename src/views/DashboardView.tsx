import React, { useState } from 'react';
import { Project, ViewType } from '../types';
import { soundFX } from '../utils/audio';

interface DashboardViewProps {
  projects: Project[];
  onNavigate: (view: ViewType) => void;
  onOpenNewProject: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  onNavigate,
  onOpenNewProject,
  onShowToast,
}) => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D'>('7D');
  const [isQueuePaused, setIsQueuePaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handlePauseQueue = () => {
    soundFX.playClick();
    setIsQueuePaused(!isQueuePaused);
    if (!isQueuePaused) {
      onShowToast('Fila Pausada', 'Processamento de tarefas GPU RTX 4090 temporariamente suspenso.', 'warning');
    } else {
      onShowToast('Fila Retomada', 'Renderizações em andamento restabelecidas.', 'success');
    }
  };

  const handleAutoCortes = () => {
    soundFX.playWhoosh();
    onShowToast('Algoritmo de IA Ativado', 'Identificando ganchos de alta retenção no batch ativo...', 'info');
    onNavigate('cortes-com-ia');
  };

  const handleImportVideos = () => {
    soundFX.playClick();
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'video/*';
    input.onchange = () => {
      soundFX.playDing();
      onShowToast('Importação Concluída', 'Arquivos brutos carregados para o pipeline de análise.', 'success');
    };
    input.click();
  };

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-6 select-none animate-in fade-in duration-200">
      {/* Top Banner / Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-[#171b25] p-4 sm:p-6 shadow-xl border border-[#494454]/20">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#a078ff]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-[#6001d1]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00a74b]/20 text-[#4ae176] text-[10px] font-mono uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                Workstation Ready
              </span>
              <span className="text-[#958ea0] font-mono text-[10px]">v4.8.2-AI Pro</span>
            </div>
            <h1 className="text-[22px] sm:text-[26px] font-bold text-[#dfe2f0] tracking-tight">
              Olá, Rafael! Bem-vindo ao Auto Video Studio
            </h1>
            <div className="text-[13px] text-[#cbc3d7] flex flex-wrap items-center gap-2">
              <span>
                Seu motor de IA já processou{' '}
                <strong className="text-[#dfe2f0] font-semibold">1.480 minutos</strong> de vídeo esta semana.
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1b1f2a] text-[#d2bbff] text-[10px] font-mono">
                <span className="material-symbols-outlined text-[13px] animate-spin">
                  autorenew
                </span>{' '}
                3 tarefas em andamento
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoCortes}
              className="group flex items-center gap-1.5 px-3 py-2 rounded bg-[#1b1f2a] hover:bg-[#262a34] text-[#dfe2f0] transition-all shadow-sm active:scale-95 text-[12px] font-mono cursor-pointer border border-[#494454]/30"
            >
              <span className="material-symbols-outlined text-[18px] text-[#4ae176] group-hover:rotate-12 transition-transform">
                bolt
              </span>
              <span>Executar Auto-Cortes</span>
            </button>

            <button
              onClick={handleImportVideos}
              className="group flex items-center gap-1.5 px-3 py-2 rounded bg-[#262a34] hover:bg-[#353944] text-[#dfe2f0] transition-all shadow-sm active:scale-95 text-[12px] font-mono cursor-pointer border border-[#494454]/40"
            >
              <span className="material-symbols-outlined text-[18px] text-[#cbc3d7] group-hover:-translate-y-0.5 transition-transform">
                cloud_upload
              </span>
              <span>Importar Vídeos</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                onOpenNewProject();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#a078ff] text-[#340080] font-mono text-[12px] hover:bg-[#d0bcff] transition-all shadow-[0_0_20px_rgba(160,120,255,0.35)] active:scale-95 font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Novo Projeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1b1f2a] p-4 shadow-md transition-all hover:bg-[#262a34] group border border-[#494454]/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-[#171b25] flex items-center justify-center text-[#d0bcff] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">smart_display</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ae176]/15 text-[#4ae176] font-semibold">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> +18.4%
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#cbc3d7] tracking-wider uppercase">
            Total de Vídeos Processados
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-[32px] text-[#dfe2f0] font-bold tracking-tight">1,248</span>
            <span className="text-[10px] font-mono text-[#958ea0]">vs. mês anterior</span>
          </div>
          <div className="w-full bg-[#171b25] rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-[#d0bcff] h-full rounded-full transition-all duration-700" style={{ width: '74%' }} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1b1f2a] p-4 shadow-md transition-all hover:bg-[#262a34] group border border-[#494454]/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-[#6001d1]/20 flex items-center justify-center text-[#d2bbff] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#6001d1]/40 text-[#c9aeff] font-semibold">
              87% viral score
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#cbc3d7] tracking-wider uppercase">
            Cortes Gerados com IA
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-[32px] text-[#dfe2f0] font-bold tracking-tight">4,912</span>
            <span className="text-[10px] font-mono text-[#4ae176] font-semibold">Aprovação Alta</span>
          </div>
          <div className="w-full bg-[#171b25] rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-[#d2bbff] h-full rounded-full transition-all duration-700" style={{ width: '87%' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1b1f2a] p-4 shadow-md transition-all hover:bg-[#262a34] group border border-[#494454]/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-[#171b25] flex items-center justify-center text-[#e9ddff] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">event_upcoming</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#31353f] text-[#dfe2f0] font-semibold">
              Shorts, Reels, TikTok
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#cbc3d7] tracking-wider uppercase">
            Publicações Agendadas
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-[32px] text-[#dfe2f0] font-bold tracking-tight">86</span>
            <span className="text-[10px] font-mono text-[#958ea0]">Próximos 7 dias</span>
          </div>
          <div className="w-full bg-[#171b25] rounded-full h-1 mt-3 overflow-hidden">
            <div className="bg-[#a078ff] h-full rounded-full transition-all duration-700" style={{ width: '62%' }} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative overflow-hidden rounded-xl bg-[#1b1f2a] p-4 shadow-md transition-all hover:bg-[#262a34] group border border-[#494454]/20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-10 h-10 rounded-lg bg-[#4ae176]/10 flex items-center justify-center text-[#4ae176] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">cell_tower</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ae176]/20 text-[#4ae176] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176]" /> 100% OK
            </span>
          </div>
          <p className="text-[11px] font-mono text-[#cbc3d7] tracking-wider uppercase">
            Redes Conectadas
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-[32px] text-[#dfe2f0] font-bold tracking-tight">4 / 4</span>
            <span className="text-[10px] font-mono text-[#4ae176] font-semibold">Canais Ativos</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <span className="px-1.5 py-0.5 rounded bg-[#171b25] text-[#dfe2f0] font-mono text-[10px] border border-[#494454]/30">YT</span>
            <span className="px-1.5 py-0.5 rounded bg-[#171b25] text-[#dfe2f0] font-mono text-[10px] border border-[#494454]/30">TT</span>
            <span className="px-1.5 py-0.5 rounded bg-[#171b25] text-[#dfe2f0] font-mono text-[10px] border border-[#494454]/30">IG</span>
            <span className="px-1.5 py-0.5 rounded bg-[#171b25] text-[#dfe2f0] font-mono text-[10px] border border-[#494454]/30">FB</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (65%) & Right (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 cols): Chart + Recent Projects */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Productivity & Generation Chart Panel */}
          <div className="rounded-xl bg-[#1b1f2a] p-4 shadow-md flex flex-col gap-3 border border-[#494454]/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">
                  ssid_chart
                </span>
                <div>
                  <h2 className="text-[16px] font-semibold text-[#dfe2f0] leading-tight">
                    Produtividade & Geração de Vídeos
                  </h2>
                  <p className="text-[12px] text-[#958ea0]">
                    Shorts Criados vs. Horas de Edição Humana Economizadas
                  </p>
                </div>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center bg-[#0a0e18] p-0.5 rounded-lg border border-[#494454]/30">
                {(['7D', '30D', '90D'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => {
                      soundFX.playClick();
                      setTimeframe(tf);
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                      timeframe === tf
                        ? 'bg-[#262a34] text-[#dfe2f0] font-bold shadow-sm'
                        : 'text-[#958ea0] hover:text-[#dfe2f0]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Badges & Chart Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#494454]/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-[#a078ff]" />
                  <span className="text-[11px] font-mono text-[#dfe2f0]">
                    Shorts Criados ({timeframe === '7D' ? 'Total: 412' : timeframe === '30D' ? 'Total: 1,820' : 'Total: 4,912'})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-xs bg-[#4ae176]" />
                  <span className="text-[11px] font-mono text-[#dfe2f0]">
                    Horas Economizadas ({timeframe === '7D' ? '84.6h' : timeframe === '30D' ? '360h' : '1.020h'})
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#958ea0] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4ae176] animate-pulse" />
                Atualizado em tempo real
              </span>
            </div>

            {/* SVG Interactive Graphic */}
            <div className="relative w-full h-64 bg-[#0a0e18] rounded-lg p-3 overflow-hidden flex flex-col justify-end border border-[#494454]/20 group">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 680 200">
                <defs>
                  <linearGradient id="violetGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a078ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a078ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line stroke="#31353f" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="680" y1="40" y2="40" />
                <line stroke="#31353f" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="680" y1="90" y2="90" />
                <line stroke="#31353f" strokeDasharray="3 3" strokeOpacity="0.3" x1="0" x2="680" y1="140" y2="140" />

                {/* Area Background Fill */}
                <path
                  d="M 40 160 L 130 115 L 220 135 L 310 75 L 400 95 L 490 35 L 580 50 L 640 25 L 640 180 L 40 180 Z"
                  fill="url(#violetGradient)"
                  opacity="0.35"
                />

                {/* Bars for Horas Economizadas */}
                <rect fill="#4ae176" fillOpacity="0.8" height="55" rx="3" width="16" x="118" y="125" />
                <rect fill="#4ae176" fillOpacity="0.8" height="35" rx="3" width="16" x="208" y="145" />
                <rect fill="#4ae176" fillOpacity="0.8" height="95" rx="3" width="16" x="298" y="85" />
                <rect fill="#4ae176" fillOpacity="0.8" height="75" rx="3" width="16" x="388" y="105" />
                <rect fill="#4ae176" fillOpacity="0.8" height="135" rx="3" width="16" x="478" y="45" />
                <rect fill="#4ae176" fillOpacity="0.8" height="120" rx="3" width="16" x="568" y="60" />
                <rect fill="#4ae176" fillOpacity="0.8" height="145" rx="3" width="16" x="628" y="35" />

                {/* Trend Line (Shorts Criados) */}
                <path
                  d="M 40 160 Q 90 130 130 115 T 220 135 T 310 75 T 400 95 T 490 35 T 580 50 T 640 25"
                  fill="none"
                  stroke="#a078ff"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />

                {/* Hotspot Nodes */}
                <circle cx="310" cy="75" fill="#dfe2f0" r="4.5" stroke="#a078ff" strokeWidth="2.5" />
                <circle cx="490" cy="35" fill="#dfe2f0" r="5" stroke="#a078ff" strokeWidth="3" />
                <circle cx="640" cy="25" fill="#6bff8f" r="5.5" stroke="#00a74b" strokeWidth="2.5" />
              </svg>

              {/* Day Labels Axis */}
              <div className="flex justify-between items-center px-4 pt-1 font-mono text-[10px] text-[#958ea0]">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span className="text-[#d0bcff] font-bold">Hoje (Dom)</span>
              </div>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#d0bcff]">
                  folder_open
                </span>
                <h2 className="text-[16px] font-semibold text-[#dfe2f0]">
                  Projetos Recentes
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262a34] text-[#cbc3d7] font-medium">
                  {projects.length} ativos
                </span>
              </div>
              <button
                onClick={() => onNavigate('meus-projetos')}
                className="text-[11px] font-mono text-[#d0bcff] hover:text-[#e9ddff] transition-colors flex items-center gap-1"
              >
                Ver todos <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>

            {/* Grid of Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedProject(proj);
                    onNavigate('editor-de-videos');
                  }}
                  className="group rounded-xl bg-[#1b1f2a] hover:bg-[#262a34] p-3 flex flex-col justify-between transition-all shadow-md border border-[#494454]/20 cursor-pointer"
                >
                  <div className="space-y-2">
                    {/* Thumbnail */}
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
                          <span className="material-symbols-outlined text-[11px]">check_circle</span> Concluído
                        </span>
                      )}

                      {proj.status === 'renderizando' && (
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#6001d1]/90 text-[#c9aeff] text-[10px] font-mono font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px] animate-spin">sync</span> Renderizando {proj.statusProgress}%
                        </span>
                      )}

                      {proj.status === 'agendado' && (
                        <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-[#262a34]/90 text-[#dfe2f0] text-[10px] font-mono font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px] text-[#d0bcff]">schedule</span> Agendado
                        </span>
                      )}

                      <span className="absolute top-2 right-2 p-1 rounded bg-[#0a0e18]/80 text-[#958ea0] hover:text-[#dfe2f0]">
                        <span className="material-symbols-outlined text-[14px]">more_vert</span>
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-[14px] font-semibold text-[#dfe2f0] line-clamp-1 group-hover:text-[#d0bcff] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-[12px] text-[#958ea0]">{proj.subtitle}</p>
                    </div>

                    {proj.status === 'renderizando' && (
                      <div className="w-full bg-[#0a0e18] rounded-full h-1 overflow-hidden mt-1">
                        <div
                          className="bg-[#d2bbff] h-full rounded-full animate-pulse"
                          style={{ width: `${proj.statusProgress || 50}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#494454]/20 flex items-center justify-between text-[#958ea0]">
                    <span className="text-[10px] font-mono text-[#cbc3d7] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#d0bcff]">
                        auto_videocam
                      </span>{' '}
                      {proj.shortsCount} shorts (9:16)
                    </span>
                    <span className="text-[10px] font-mono">{proj.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): GPU Queue & Scheduled Timeline */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Live GPU Job Queue */}
          <div className="rounded-xl bg-[#1b1f2a] p-4 shadow-md flex flex-col gap-3 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d2bbff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d2bbff]" />
                </span>
                <h2 className="text-[15px] font-semibold text-[#dfe2f0]">
                  Fila de Processamento
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6001d1]/20 text-[#c9aeff] font-semibold">
                RTX 4090 DEDICADA
              </span>
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {/* Job 1 */}
              <div className="p-2.5 rounded-lg bg-[#171b25] flex flex-col gap-1.5 hover:bg-[#262a34]/80 transition-all border border-[#494454]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`material-symbols-outlined text-[16px] text-[#d2bbff] shrink-0 ${!isQueuePaused ? 'animate-spin' : ''}`}>
                      refresh
                    </span>
                    <span className="text-[11px] font-mono text-[#dfe2f0] truncate">
                      render_ep42_clip03.mp4
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#4ae176] font-bold">
                    {isQueuePaused ? 'PAUSADO' : '92%'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#958ea0] text-[10px] font-mono">
                  <span>Whisper Transcribing & Detecção Facial</span>
                  <span className="text-[#cbc3d7]">00:14s rest.</span>
                </div>
                <div className="w-full bg-[#0a0e18] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#d2bbff] h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Job 2 */}
              <div className="p-2.5 rounded-lg bg-[#171b25] flex flex-col gap-1.5 hover:bg-[#262a34]/80 transition-all border border-[#494454]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-[#d0bcff] shrink-0">
                      memory
                    </span>
                    <span className="text-[11px] font-mono text-[#dfe2f0] truncate">
                      batch_export_reels_pack.zip
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#d0bcff] font-bold">48%</span>
                </div>
                <div className="flex items-center justify-between text-[#958ea0] text-[10px] font-mono">
                  <span>Codificando H.264 / NVENC Dual-Pass</span>
                  <span className="text-[#cbc3d7]">01:42s rest.</span>
                </div>
                <div className="w-full bg-[#0a0e18] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#a078ff] h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              {/* Job 3 (Queued) */}
              <div className="p-2.5 rounded-lg bg-[#171b25] flex flex-col gap-1.5 hover:bg-[#262a34]/80 transition-all border border-[#494454]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-[#958ea0] shrink-0">
                      hourglass_top
                    </span>
                    <span className="text-[11px] font-mono text-[#dfe2f0] truncate">
                      analise_silencios_raw.mov
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00a74b]/30 text-[#4ae176] font-bold">
                    FILA #1
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#958ea0] text-[10px] font-mono">
                  <span>Corte de pausas e gagueiras</span>
                  <span className="text-[#d0bcff] font-semibold">Prioridade Alta</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#494454]/20">
              <span className="text-[10px] font-mono text-[#958ea0]">
                Uso de VRAM: 14.8 / 24 GB
              </span>
              <button
                onClick={handlePauseQueue}
                className="text-[10px] font-mono text-[#ffb4ab] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[12px]">
                  {isQueuePaused ? 'play_circle' : 'pause_circle'}
                </span>{' '}
                {isQueuePaused ? 'Retomar Todas' : 'Pausar Todas'}
              </button>
            </div>
          </div>

          {/* Scheduled Publishing Timeline */}
          <div className="rounded-xl bg-[#1b1f2a] p-4 shadow-md flex flex-col gap-3 flex-1 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#d0bcff]">
                  schedule_send
                </span>
                <h2 className="text-[15px] font-semibold text-[#dfe2f0]">
                  Próximos Agendamentos
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#958ea0]">Automação Ativa</span>
            </div>

            <div className="relative pl-6 space-y-4 my-1">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#262a34]" />

              {/* Item 1 */}
              <div className="relative group">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#d2bbff] group-hover:scale-125 transition-transform" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#d2bbff] font-semibold">
                      Hoje • 18:30
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-cyan-300 font-bold">
                        TikTok
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-pink-400 font-bold">
                        Reels
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#dfe2f0] font-medium line-clamp-1">
                    "3 Gatilhos Mentais que Vendem Milhões"
                  </p>
                  <span className="text-[11px] text-[#958ea0]">
                    Legendas sincronizadas + Áudio Booster
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#ffb4ab] group-hover:scale-125 transition-transform" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#ffb4ab] font-semibold">
                      Hoje • 20:00
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-red-400 font-bold">
                      YT Shorts
                    </span>
                  </div>
                  <p className="text-[13px] text-[#dfe2f0] font-medium line-clamp-1">
                    "Como montar seu estúdio com R$ 500"
                  </p>
                  <span className="text-[11px] text-[#958ea0]">
                    Thumbnail A/B test ativada
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#4ae176] group-hover:scale-125 transition-transform" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#4ae176] font-semibold">
                      Amanhã • 12:00
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00a74b]/30 text-[#4ae176] font-bold">
                      Omnichannel
                    </span>
                  </div>
                  <p className="text-[13px] text-[#dfe2f0] font-medium line-clamp-1">
                    "Corte Podcast #42 - O futuro da IA"
                  </p>
                  <span className="text-[11px] text-[#958ea0]">
                    Disparo simultâneo (4 canais)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('calendario')}
              className="w-full py-2 mt-auto rounded-lg bg-[#171b25] hover:bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2f0] text-[11px] font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#494454]/20"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>{' '}
              Ver Calendário Completo
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Live Activity Feed / Logs Bar */}
      <div className="rounded-xl bg-[#0a0e18] p-3 sm:p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-3 border border-[#494454]/20">
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="material-symbols-outlined text-[18px] text-[#4ae176]">
              history_toggle_off
            </span>
            <span className="text-[11px] font-mono font-semibold text-[#dfe2f0] uppercase tracking-wider">
              Feed de Logs:
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#cbc3d7] text-[12px] shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center text-[10px] font-bold font-mono">
                YT
              </div>
              <span className="truncate">Short publicado com sucesso (#42-A)</span>
              <span className="text-[10px] font-mono text-[#958ea0]">14m atrás</span>
            </div>

            <div className="h-3 w-px bg-[#262a34]" />

            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold font-mono">
                TT
              </div>
              <span className="truncate">Legendas geradas (Whisper v3 turbo)</span>
              <span className="text-[10px] font-mono text-[#958ea0]">32m atrás</span>
            </div>

            <div className="h-3 w-px bg-[#262a34]" />

            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-bold font-mono">
                IA
              </div>
              <span className="truncate">Detecção de silêncio eliminou 4.2 min</span>
              <span className="text-[10px] font-mono text-[#958ea0]">1h atrás</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-[#1b1f2a] text-[#958ea0] text-[10px] font-mono tracking-wider flex items-center gap-1.5 border border-[#494454]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a078ff] animate-ping" />
            Simulação Interativa / Modo Demonstração Ativo
          </span>
        </div>
      </div>
    </div>
  );
};
