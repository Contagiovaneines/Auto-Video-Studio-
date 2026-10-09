import React, { useState } from 'react';
import { ViralClip, ViewType } from '../types';
import { ASSETS, INITIAL_VIRAL_CLIPS, OTHER_CLIPS_QUEUE } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface CortesIaViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectClipForEditor: (clip: ViralClip) => void;
  onSelectClipForPublisher: (clip: ViralClip) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const CortesIaView: React.FC<CortesIaViewProps> = ({
  onNavigate,
  onSelectClipForEditor,
  onSelectClipForPublisher,
  onShowToast,
}) => {
  const [clips] = useState<ViralClip[]>(INITIAL_VIRAL_CLIPS);
  const [selectedClips, setSelectedClips] = useState<string[]>(['clip-1', 'clip-2', 'clip-3', 'clip-4']);
  const [durationPreset, setDurationPreset] = useState<'15-30s' | '30-60s' | '60-90s'>('30-60s');
  const [clipLimit, setClipLimit] = useState(10);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'reflexao' | 'dica' | 'historia'>('todos');
  const [sortBy, setSortBy] = useState<'score' | 'retention' | 'duration'>('score');
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [reanalyzeProgress, setReanalyzeProgress] = useState(100);

  // Neural modules checkboxes
  const [removePauses, setRemovePauses] = useState(true);
  const [smartReframe, setSmartReframe] = useState(true);
  const [kineticCaptions, setKineticCaptions] = useState(true);
  const [viralTitles, setViralTitles] = useState(true);

  const toggleSelectClip = (id: string) => {
    soundFX.playClick();
    if (selectedClips.includes(id)) {
      setSelectedClips(selectedClips.filter((c) => c !== id));
    } else {
      setSelectedClips([...selectedClips, id]);
    }
  };

  const handleReanalyze = () => {
    soundFX.playWhoosh();
    setIsReanalyzing(true);
    setReanalyzeProgress(15);
    onShowToast('IA Processando', 'Reanalisando picos de retenção neural e ganchos...', 'info');

    const interval = setInterval(() => {
      setReanalyzeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReanalyzing(false);
          soundFX.playDing();
          onShowToast('Análise Concluída', '14 novos cortes ranqueados com Virality Score.', 'success');
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleEditStudio = (clip: ViralClip) => {
    soundFX.playClick();
    onSelectClipForEditor(clip);
    onNavigate('editor-de-videos');
  };

  const handleQueuePublish = (clip: ViralClip) => {
    soundFX.playDing();
    onSelectClipForPublisher(clip);
    onShowToast('Corte Adicionado', `"${clip.title}" enviado para o Publicador Automático.`, 'success');
    onNavigate('publicador-automatico');
  };

  const handleDownloadMp4 = (clip: ViralClip) => {
    soundFX.playClick();
    onShowToast('Download Iniciado', `Renderizando download direto em 1080x1920 60fps...`, 'info');
  };

  const handleShare = (clip: ViralClip) => {
    soundFX.playClick();
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Link Copiado', 'Link do corte compartilhado para a área de transferência.', 'info');
  };

  const filteredClips = clips.filter((c) => {
    if (activeCategory === 'todos') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="flex flex-col w-full text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 w-full items-start">
        {/* LEFT CONFIGURATION PIPELINE DOCK (380px) */}
        <aside className="w-full xl:w-[380px] shrink-0 flex flex-col gap-4">
          {/* Video Source Inspector Card */}
          <div className="bg-[#0a0e18] p-4 rounded-xl shadow-xl flex flex-col gap-3 relative overflow-hidden border border-[#494454]/25">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d0bcff] font-semibold">
                  Fonte Principal
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#1b1f2a] text-[#cbc3d7] text-[10px] font-mono">
                  NATIVE PRO
                </span>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onShowToast('Trocar Vídeo', 'Selecione outro arquivo na biblioteca de gravações.', 'info');
                }}
                className="px-2 py-1 rounded bg-[#262a34] hover:bg-[#353944] text-[#dfe2f0] text-[10px] font-mono transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                Trocar Vídeo
              </button>
            </div>

            {/* Stage Preview Box */}
            <div className="relative w-full h-32 rounded-lg bg-[#171b25] overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${ASSETS.podcastMasterStage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-[#0a0e18]/40 to-transparent" />

              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#0a0e18]/90 backdrop-blur-sm text-[#dfe2f0] text-[10px] font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176]" />
                4K UHD • 60 FPS
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                <div>
                  <p className="text-[13px] font-medium text-[#dfe2f0] truncate max-w-[220px]">
                    Master_Podcast_Ep_88_IA.mp4
                  </p>
                  <p className="text-[10px] font-mono text-[#958ea0]">
                    01:24:18 • 4.2 GB • H.265 Master
                  </p>
                </div>
                <button
                  onClick={() => soundFX.playPop()}
                  className="w-7 h-7 rounded-full bg-[#d0bcff]/90 text-[#3c0091] flex items-center justify-center hover:scale-105 transition-transform shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                </button>
              </div>
            </div>

            {/* Waveform Retention Insight */}
            <div className="bg-[#171b25] p-2.5 rounded-lg flex flex-col gap-1 border border-[#494454]/20">
              <div className="flex justify-between items-center text-[#958ea0] text-[10px] font-mono">
                <span>Mapeamento de Áudio & Retenção</span>
                <span className="text-[#4ae176]">14 Clusters Virais</span>
              </div>
              <div className="h-6 w-full flex items-center">
                <svg className="w-full h-5 text-[#d0bcff]/40" fill="none" preserveAspectRatio="none" viewBox="0 0 300 24">
                  <path
                    d="M0,12 L8,4 L16,18 L24,6 L32,20 L40,10 L48,12 L56,2 L64,22 L72,9 L80,14 L88,1 L96,21 L104,8 L112,16 L120,5 L128,23 L136,7 L144,15 L152,3 L160,20 L168,11 L176,14 L184,4 L192,21 L200,8 L208,18 L216,2 L224,20 L232,9 L240,15 L248,3 L256,22 L264,10 L272,13 L280,6 L288,19 L296,8 L300,12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  />
                  <path d="M60,2 L64,22 L72,9 L80,14 L88,1 L96,21" stroke="#4ae176" strokeLinecap="round" strokeWidth="2.2" />
                  <path d="M124,23 L136,7 L144,15 L152,3 L160,20" stroke="#d0bcff" strokeLinecap="round" strokeWidth="2.2" />
                  <path d="M216,2 L224,20 L232,9 L240,15 L248,3" stroke="#a078ff" strokeLinecap="round" strokeWidth="2.2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Extraction Parameter Panel */}
          <div className="bg-[#0a0e18] p-4 rounded-xl shadow-xl flex flex-col gap-3.5 border border-[#494454]/25">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#dfe2f0] tracking-tight">
                Parâmetros de Extração
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#a078ff]/20 text-[#d0bcff] uppercase tracking-wider font-semibold">
                Engine v4.2
              </span>
            </div>

            {/* Desired Duration Selectors */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0]">
                Duração Desejada dos Cortes
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#171b25] p-1 rounded-lg border border-[#494454]/20">
                {(['15-30s', '30-60s', '60-90s'] as const).map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setDurationPreset(dur);
                    }}
                    className={`py-1.5 px-2 rounded text-[10px] font-mono transition-all text-center cursor-pointer ${
                      durationPreset === dur
                        ? 'bg-[#31353f] text-[#d0bcff] font-semibold shadow-sm'
                        : 'text-[#958ea0] hover:text-[#dfe2f0]'
                    }`}
                  >
                    {dur === '30-60s' ? '30-60s ★' : dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Transcription */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0]">
                  Limite de Cortes
                </label>
                <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#171b25] rounded-lg text-[#dfe2f0] text-[12px] font-mono border border-[#494454]/20">
                  <span className="text-[#d0bcff] font-bold">{clipLimit}</span>
                  <div className="flex flex-col -space-y-1 text-[#958ea0]">
                    <span
                      onClick={() => setClipLimit(Math.min(20, clipLimit + 1))}
                      className="material-symbols-outlined text-[13px] hover:text-[#dfe2f0] cursor-pointer"
                    >
                      arrow_drop_up
                    </span>
                    <span
                      onClick={() => setClipLimit(Math.max(1, clipLimit - 1))}
                      className="material-symbols-outlined text-[13px] hover:text-[#dfe2f0] cursor-pointer"
                    >
                      arrow_drop_down
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0]">
                  Transcrição
                </label>
                <div className="flex items-center px-2 py-1.5 bg-[#171b25] rounded-lg text-[#dfe2f0] text-[10px] font-mono truncate gap-1 border border-[#494454]/20">
                  <span className="material-symbols-outlined text-[14px] text-[#4ae176]">mic</span>
                  <span className="truncate">PT-BR Whisper v3</span>
                </div>
              </div>
            </div>

            {/* Content Style Preset */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0]">
                Estilo de Conteúdo & Ritmo
              </label>
              <div className="flex items-center justify-between px-2.5 py-2 bg-[#171b25] rounded-lg text-[#dfe2f0] cursor-pointer hover:bg-[#262a34] transition-colors border border-[#494454]/20">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">bolt</span>
                  <span className="text-[12px] font-medium truncate">
                    Dinâmico / Alto Engajamento
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#958ea0]">
                  expand_more
                </span>
              </div>
              <span className="text-[10px] text-[#958ea0] px-1">
                Foco em ganchos frontais imediatos e retenção inicial &gt;75%.
              </span>
            </div>

            {/* Neural Modules Matrix */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0]">
                Módulos Neurais Ativos
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg bg-[#171b25]/70 hover:bg-[#171b25] cursor-pointer transition-colors border border-[#494454]/15">
                <input
                  type="checkbox"
                  checked={removePauses}
                  onChange={(e) => setRemovePauses(e.target.checked)}
                  className="mt-0.5 accent-[#a078ff] h-3.5 w-3.5 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#dfe2f0]">
                    Remover pausas longas e respirações
                  </span>
                  <span className="text-[10px] text-[#958ea0]">
                    Corta silêncios estáticos acima de 0.4s
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg bg-[#171b25]/70 hover:bg-[#171b25] cursor-pointer transition-colors border border-[#494454]/15">
                <input
                  type="checkbox"
                  checked={smartReframe}
                  onChange={(e) => setSmartReframe(e.target.checked)}
                  className="mt-0.5 accent-[#a078ff] h-3.5 w-3.5 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#dfe2f0]">
                    Reenquadramento Inteligente 9:16
                  </span>
                  <span className="text-[10px] text-[#958ea0]">
                    Auto-tracking focal com centralização facial
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg bg-[#171b25]/70 hover:bg-[#171b25] cursor-pointer transition-colors border border-[#494454]/15">
                <input
                  type="checkbox"
                  checked={kineticCaptions}
                  onChange={(e) => setKineticCaptions(e.target.checked)}
                  className="mt-0.5 accent-[#a078ff] h-3.5 w-3.5 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#dfe2f0]">
                    Legendas Cinéticas Dinâmicas
                  </span>
                  <span className="text-[10px] text-[#958ea0]">
                    Auto-highlighting e emojis em timing perfeito
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2 p-2 rounded-lg bg-[#171b25]/70 hover:bg-[#171b25] cursor-pointer transition-colors border border-[#494454]/15">
                <input
                  type="checkbox"
                  checked={viralTitles}
                  onChange={(e) => setViralTitles(e.target.checked)}
                  className="mt-0.5 accent-[#a078ff] h-3.5 w-3.5 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[#dfe2f0]">
                    Títulos Virais & Virality Score
                  </span>
                  <span className="text-[10px] text-[#958ea0]">
                    Projeção preditiva de engajamento multi-plataforma
                  </span>
                </div>
              </label>
            </div>

            {/* Trigger Button & Status */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleReanalyze}
                disabled={isReanalyzing}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#a078ff] via-[#a078ff] to-[#6001d1] text-[#340080] font-bold text-[13px] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#a078ff]/20 cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[18px] ${isReanalyzing ? 'animate-spin' : ''}`}>
                  {isReanalyzing ? 'sync' : 'auto_awesome'}
                </span>
                <span>{isReanalyzing ? 'Analisando...' : 'Reanalisar com IA'}</span>
                <span className="ml-auto px-1.5 py-0.5 rounded bg-[#0a0e18]/40 text-[10px] font-mono uppercase text-[#340080]">
                  ~1m 20s
                </span>
              </button>

              <div className="bg-[#171b25] p-2 rounded-lg flex flex-col gap-1.5 border border-[#494454]/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[#4ae176]">
                    <span className="w-2 h-2 rounded-full bg-[#4ae176]" />
                    <span className="text-[10px] font-mono font-semibold">
                      {reanalyzeProgress}% Concluído
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#958ea0]">
                    14 CORTES GERADOS
                  </span>
                </div>
                <div className="w-full bg-[#0a0e18] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#4ae176] h-full rounded-full transition-all duration-300"
                    style={{ width: `${reanalyzeProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#cbc3d7] truncate">
                  Análise de Sentimento & Picos de Retenção Finalizada
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT/MAIN SHORT CLIPS SHOWCASE GRID */}
        <section className="flex-1 min-w-0 flex flex-col gap-4 w-full">
          {/* Header Bar: Filters & Sorting */}
          <div className="bg-[#0a0e18] p-4 rounded-xl shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-3 border border-[#494454]/25">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-bold text-[#dfe2f0] tracking-tight">
                  Cortes Extraídos com IA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#d0bcff]/20 text-[#d0bcff] text-[10px] font-mono font-bold">
                  14 DISPONÍVEIS
                </span>
              </div>
              <p className="text-[12px] text-[#958ea0]">
                Classificados por pico de atenção neural e potencial algorítmico do TikTok, Reels e Shorts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter Pills */}
              <div className="flex items-center bg-[#171b25] p-0.5 rounded-lg border border-[#494454]/20">
                <button
                  onClick={() => setActiveCategory('todos')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activeCategory === 'todos'
                      ? 'bg-[#31353f] text-[#dfe2f0] font-semibold'
                      : 'text-[#958ea0] hover:text-[#dfe2f0]'
                  }`}
                >
                  Todos (14)
                </button>
                <button
                  onClick={() => setActiveCategory('reflexao')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activeCategory === 'reflexao'
                      ? 'bg-[#31353f] text-[#dfe2f0] font-semibold'
                      : 'text-[#958ea0] hover:text-[#dfe2f0]'
                  }`}
                >
                  Reflexões (4)
                </button>
                <button
                  onClick={() => setActiveCategory('dica')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activeCategory === 'dica'
                      ? 'bg-[#31353f] text-[#dfe2f0] font-semibold'
                      : 'text-[#958ea0] hover:text-[#dfe2f0]'
                  }`}
                >
                  Dicas Práticas (6)
                </button>
                <button
                  onClick={() => setActiveCategory('historia')}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                    activeCategory === 'historia'
                      ? 'bg-[#31353f] text-[#dfe2f0] font-semibold'
                      : 'text-[#958ea0] hover:text-[#dfe2f0]'
                  }`}
                >
                  Histórias (4)
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#171b25] text-[#dfe2f0] text-[10px] font-mono border border-[#494454]/20">
                <span className="text-[#958ea0]">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#d0bcff] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="score" className="bg-[#1b1f2a] text-[#dfe2f0]">
                    Maior Virality Score
                  </option>
                  <option value="retention" className="bg-[#1b1f2a] text-[#dfe2f0]">
                    Maior Retenção
                  </option>
                  <option value="duration" className="bg-[#1b1f2a] text-[#dfe2f0]">
                    Menor Duração
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* 4 Highlighted 9:16 Vertical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {filteredClips.map((clip) => {
              const isSelected = selectedClips.includes(clip.id);

              return (
                <article
                  key={clip.id}
                  className={`bg-[#0a0e18] rounded-xl p-3 shadow-xl flex flex-col gap-2.5 group transition-all duration-200 hover:-translate-y-1 border ${
                    isSelected ? 'border-[#a078ff]/80 ring-1 ring-[#a078ff]/40' : 'border-[#494454]/25'
                  }`}
                >
                  {/* 9:16 Viewport Thumbnail Container */}
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden bg-[#171b25]">
                    <img
                      className="w-full h-full object-cover"
                      src={clip.thumbnail}
                      alt={clip.title}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-black/60 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-[#0a0e18]/85 backdrop-blur-md text-[#4ae176] text-[10px] font-mono font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#4ae176]">
                          local_fire_department
                        </span>
                        {clip.score}/100 VIRAL
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#0a0e18]/85 backdrop-blur-md text-[#dfe2f0] text-[10px] font-mono">
                        {clip.duration}
                      </span>
                    </div>

                    {/* Live Subtitle Overlay */}
                    <div className="absolute bottom-12 inset-x-2 text-center pointer-events-none">
                      <span className="inline-block px-2 py-1 bg-[#0a0e18]/90 rounded text-[#e9ddff] text-[12px] font-bold tracking-tight shadow-md">
                        {clip.subtitleFull}
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => handleEditStudio(clip)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#a078ff]/80 hover:bg-[#a078ff] text-[#340080] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl scale-95 hover:scale-105 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                    </button>

                    {/* Bottom Audio & Retention info */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#cbc3d7] bg-[#0a0e18]/75 backdrop-blur-sm px-2 py-1 rounded">
                      <span className="text-[#958ea0]">{clip.timeframe}</span>
                      <div className="flex items-center gap-1 text-[#4ae176]">
                        <span className="material-symbols-outlined text-[12px]">graphic_eq</span>
                        <span>{clip.retentionEstimate}% retenção est.</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="flex flex-col gap-1.5 px-0.5">
                    <h3 className="text-[14px] font-semibold text-[#dfe2f0] leading-snug line-clamp-2">
                      {clip.title}
                    </h3>

                    {/* AI Rationale */}
                    <div className="p-2 rounded bg-[#171b25] text-[#cbc3d7] text-[11px] leading-normal border border-[#494454]/15">
                      <div className="flex items-center gap-1 text-[#d0bcff] text-[10px] font-mono font-semibold mb-0.5">
                        <span className="material-symbols-outlined text-[13px]">psychology</span>
                        Justificativa da IA
                      </div>
                      {clip.aiRationale}
                    </div>

                    {/* Action Command Buttons */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleEditStudio(clip)}
                        className="py-1.5 px-2 rounded bg-[#262a34] hover:bg-[#353944] text-[#dfe2f0] text-[10px] font-mono transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">movie_edit</span>
                        Editar Studio
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQueuePublish(clip)}
                        className="py-1.5 px-2 rounded bg-[#a078ff] text-[#340080] hover:brightness-110 text-[10px] font-mono font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">playlist_add</span>
                        Fila Publicação
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-0.5 px-1 text-[#958ea0]">
                      <button
                        type="button"
                        onClick={() => handleDownloadMp4(clip)}
                        className="hover:text-[#d0bcff] transition-colors flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">download</span>
                        Baixar MP4
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(clip)}
                        className="hover:text-[#dfe2f0] transition-colors flex items-center gap-1 text-[10px] font-mono cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">share</span>
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Additional Clips Slider Strip */}
          <div className="bg-[#0a0e18] p-4 rounded-xl shadow-lg flex flex-col gap-2 border border-[#494454]/25">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-[#dfe2f0]">
                  Outros Cortes na Fila de Aprovação
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">10 restantes</span>
              </div>
              <button
                onClick={() => onShowToast('Visualização Completa', 'Carregando lista completa dos 14 clipes gerados.', 'info')}
                className="text-[#d0bcff] hover:underline text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                Ver todos os 14 cortes
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 pt-1">
              {OTHER_CLIPS_QUEUE.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => soundFX.playClick()}
                  className="bg-[#171b25] p-2 rounded-lg flex flex-col gap-1 cursor-pointer hover:bg-[#262a34] transition-colors border border-[#494454]/20"
                >
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className={item.score >= 80 ? 'text-[#4ae176] font-bold' : 'text-[#d0bcff] font-bold'}>
                      {item.score}/100
                    </span>
                    <span className="text-[#958ea0]">{item.duration}</span>
                  </div>
                  <p className="text-[11px] text-[#dfe2f0] font-medium truncate">
                    {item.title}
                  </p>
                  <span className="text-[9px] font-mono text-[#958ea0]">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FLOATING WORKSTATION DOCK BAR */}
      <div className="sticky bottom-4 z-30 mt-6 w-full">
        <div className="bg-[#0a0e18]/90 backdrop-blur-xl p-3 px-4 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#494454]/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a078ff] animate-ping" />
              <span className="text-[13px] font-semibold text-[#dfe2f0]">
                <span>{selectedClips.length}</span> cortes selecionados
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[#958ea0] text-[10px] font-mono">
              <span>Preset de saída:</span>
              <span className="text-[#dfe2f0] font-medium px-1.5 py-0.5 rounded bg-[#1b1f2a] border border-[#494454]/20">
                1080x1920 (9:16) • Auto-Subtitles • High Bitrate
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                soundFX.playClick();
                onNavigate('publicador-automatico');
              }}
              className="px-3 py-2 rounded-lg bg-[#262a34] hover:bg-[#353944] text-[#dfe2f0] text-[12px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer border border-[#494454]/30"
            >
              <span className="material-symbols-outlined text-[16px] text-[#958ea0]">
                calendar_today
              </span>
              <span>Agendar no Publicador</span>
            </button>

            <button
              onClick={() => {
                soundFX.playDing();
                onShowToast('Exportação Iniciada', `Exportando ${selectedClips.length} cortes selecionados para ZIP de alta resolução.`, 'success');
              }}
              className="px-4 py-2 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-lg shadow-[#a078ff]/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                download_for_offline
              </span>
              <span>Exportar Todos Selecionados ({selectedClips.length})</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="text-[10px] font-mono text-[#958ea0] tracking-wider">
            ⚡ Demonstração funcional de IA com scores preditivos calculados com base no histórico de retenção orgânica.
          </span>
        </div>
      </div>
    </div>
  );
};
