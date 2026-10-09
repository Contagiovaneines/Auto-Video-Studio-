import React, { useState, useEffect } from 'react';
import { ViralClip, ViewType } from '../types';
import { ASSETS } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface EditorNleViewProps {
  activeClip?: ViralClip | null;
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const EditorNleView: React.FC<EditorNleViewProps> = ({
  activeClip,
  onNavigate,
  onShowToast,
}) => {
  // Transport & Playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadPos, setPlayheadPos] = useState(48); // %
  const [timecode, setTimecode] = useState('00:00:14:22');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [isSnapActive, setIsSnapActive] = useState(true);
  const [isSafeZoneActive, setIsSafeZoneActive] = useState(true);
  const [isLoopActive, setIsLoopActive] = useState(true);
  const [volume, setVolume] = useState(85);

  // Tools & Selection
  const [activeTool, setActiveTool] = useState<'select' | 'blade'>('select');
  const [selectedTrackClip, setSelectedTrackClip] = useState<string>('hook');

  // Inspector & Captions styling
  const [captionPreset, setCaptionPreset] = useState<'hormozi' | 'clean' | 'karaoke' | 'cyber'>('hormozi');
  const [fontFamily, setFontFamily] = useState('Montserrat Black');
  const [fontSize, setFontSize] = useState(84);
  const [isUppercase, setIsUppercase] = useState(true);
  const [hasShadow, setHasShadow] = useState(true);
  const [captionColor, setCaptionColor] = useState('#FFFFFF');
  const [audioDucking, setAudioDucking] = useState(true);
  const [activeAssetTab, setActiveAssetTab] = useState<'captions' | 'media' | 'audio' | 'fx'>('captions');

  // Transform coordinates
  const [posX, setPosX] = useState(540);
  const [posY, setPosY] = useState(1380);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Playhead animation loop
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const interval = setInterval(() => {
        setPlayheadPos((prev) => {
          if (prev >= 95) {
            return isLoopActive ? 15 : 95;
          }
          return prev + 0.5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isLoopActive]);

  const togglePlay = () => {
    soundFX.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleApplyPreset = (style: 'hormozi' | 'clean' | 'karaoke' | 'cyber') => {
    soundFX.playDing();
    setCaptionPreset(style);
    onShowToast('Preset Aplicado', `Estilo de legenda virada para ${style.toUpperCase()}.`, 'success');
  };

  const handleExportQuick = () => {
    soundFX.playDing();
    onShowToast('Renderizando com GPU', 'Exportação H.264 / NVENC acelerada por RTX 4090 iniciada.', 'success');
  };

  const handleExportBatch = () => {
    soundFX.playWhoosh();
    onShowToast('Fila em Lote', '4 variações de gancho enviadas para renderização paralela.', 'success');
  };

  const handleInsertBRoll = () => {
    soundFX.playPop();
    onShowToast('B-Roll Inserido', 'Gráfico 3D adicionado à trilha V2 sincronizado ao gancho.', 'success');
  };

  return (
    <div className="flex flex-col w-full text-[#dfe2f0] select-none animate-in fade-in duration-200">
      {/* TOPO: Barra de Ferramentas NLE e Controles de Transporte Rápidos */}
      <header className="bg-[#0a0e18] px-3 sm:px-4 py-2 rounded-lg shadow-md mb-3 flex flex-wrap items-center justify-between gap-3 border border-[#494454]/25">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Nome do Projeto e Status */}
          <div className="flex items-center gap-1.5 bg-[#171b25] px-2.5 py-1 rounded-lg border border-[#494454]/20">
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
              movie_edit
            </span>
            <span className="text-[13px] font-semibold text-[#dfe2f0] tracking-tight">
              {activeClip ? `${activeClip.title.slice(0, 28)}...` : 'Podcast_Corte_Viral_04.avs'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] ml-1" />
            <span className="text-[10px] font-mono text-[#958ea0] tracking-wider">
              AUTO-SALVO (NUVEM)
            </span>
          </div>

          {/* Aspect Ratio Tabs */}
          <div className="flex items-center bg-[#171b25] p-0.5 rounded-lg border border-[#494454]/20">
            <button
              onClick={() => {
                soundFX.playClick();
                setAspectRatio('9:16');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                aspectRatio === '9:16'
                  ? 'bg-[#a078ff] text-[#340080] shadow-sm'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">
                stay_current_portrait
              </span>
              9:16 (Shorts/Reels)
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setAspectRatio('16:9');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                aspectRatio === '16:9'
                  ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">
                stay_current_landscape
              </span>
              16:9 (YouTube)
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setAspectRatio('1:1');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                aspectRatio === '1:1'
                  ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-sm'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">crop_square</span>
              1:1 (Feed)
            </button>
          </div>

          {/* Canvas Engine Specs */}
          <div className="hidden xl:flex items-center gap-3 bg-[#171b25] px-2.5 py-1 rounded-lg text-[#958ea0] text-[10px] font-mono border border-[#494454]/20">
            <span className="text-[#dfe2f0] font-medium">1080×1920</span>
            <span className="text-[#4ae176]">60 FPS</span>
            <span className="text-[#494454]">|</span>
            <span className="flex items-center gap-1 text-[#cbc3d7]">
              <span className="material-symbols-outlined text-[14px]">zoom_in</span>FIT 45%
            </span>
            <span className="text-[#494454]">|</span>
            <button
              onClick={() => {
                soundFX.playClick();
                setIsSnapActive(!isSnapActive);
              }}
              className={`flex items-center gap-1 cursor-pointer ${
                isSnapActive ? 'text-[#4ae176]' : 'text-[#958ea0]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">grid_4x4</span>
              {isSnapActive ? 'SNAP ATIVO' : 'SNAP OFF'}
            </button>
          </div>
        </div>

        {/* Primary Edit Actions & Export */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center bg-[#171b25] p-0.5 rounded-lg border border-[#494454]/20">
            <button
              onClick={() => {
                soundFX.playClick();
                onShowToast('Desfazer', 'Ação desfeita.', 'info');
              }}
              className="p-1.5 rounded hover:bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2f0] transition-colors cursor-pointer"
              title="Desfazer (Ctrl+Z)"
            >
              <span className="material-symbols-outlined text-[16px]">undo</span>
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                onShowToast('Refazer', 'Ação refeita.', 'info');
              }}
              className="p-1.5 rounded hover:bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2f0] transition-colors cursor-pointer"
              title="Refazer (Ctrl+Y)"
            >
              <span className="material-symbols-outlined text-[16px]">redo</span>
            </button>

            <div className="w-px h-4 bg-[#494454]/40 mx-1" />

            <button
              onClick={() => {
                soundFX.playClick();
                setActiveTool('select');
              }}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                activeTool === 'select'
                  ? 'bg-[#262a34] text-[#d0bcff]'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
              title="Seleção (V)"
            >
              <span className="material-symbols-outlined text-[16px]">near_me</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick();
                setActiveTool('blade');
                onShowToast('Lâmina Ativada', 'Clique na timeline para fatiar clipes.', 'info');
              }}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                activeTool === 'blade'
                  ? 'bg-[#262a34] text-[#d0bcff]'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
              title="Lâmina / Cortar (C)"
            >
              <span className="material-symbols-outlined text-[16px]">content_cut</span>
            </button>
          </div>

          <button
            onClick={handleExportQuick}
            className="px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#353944] text-[#dfe2f0] text-[12px] font-mono transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-[#494454]/30"
          >
            <span className="material-symbols-outlined text-[16px] text-[#4ae176]">bolt</span>
            <span>Exportar Rápido</span>
          </button>

          <button
            onClick={handleExportBatch}
            className="px-3.5 py-1.5 rounded-lg bg-[#a078ff] text-[#340080] text-[12px] font-mono font-bold hover:brightness-110 active:brightness-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">layers</span>
            <span>Exportar em Lote (4)</span>
          </button>
        </div>
      </header>

      {/* WORKSTATION TRI-PANEL: Mídia & Assets | Viewport NLE | Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3 h-auto lg:h-[580px]">
        {/* 1. PAINEL ESQUERDO: Navegador de Recursos & Assets (col 3) */}
        <section className="lg:col-span-3 bg-[#0a0e18] rounded-xl shadow-md flex flex-col overflow-hidden border border-[#494454]/25">
          {/* Navegação das Abas de Recursos */}
          <div className="bg-[#171b25] p-1 flex items-center gap-1 overflow-x-auto text-[#958ea0] text-[10px] font-mono border-b border-[#494454]/20">
            <button
              onClick={() => setActiveAssetTab('captions')}
              className={`px-2.5 py-1.5 rounded font-semibold flex items-center gap-1 shrink-0 cursor-pointer ${
                activeAssetTab === 'captions'
                  ? 'bg-[#31353f] text-[#d0bcff]'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">subtitles</span>
              Legendas IA
            </button>

            <button
              onClick={() => setActiveAssetTab('media')}
              className={`px-2.5 py-1.5 rounded flex items-center gap-1 shrink-0 cursor-pointer ${
                activeAssetTab === 'media'
                  ? 'bg-[#31353f] text-[#d0bcff] font-semibold'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">perm_media</span>
              Mídia
            </button>

            <button
              onClick={() => setActiveAssetTab('audio')}
              className={`px-2.5 py-1.5 rounded flex items-center gap-1 shrink-0 cursor-pointer ${
                activeAssetTab === 'audio'
                  ? 'bg-[#31353f] text-[#d0bcff] font-semibold'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
              Áudio & SFX
            </button>

            <button
              onClick={() => setActiveAssetTab('fx')}
              className={`px-2.5 py-1.5 rounded flex items-center gap-1 shrink-0 cursor-pointer ${
                activeAssetTab === 'fx'
                  ? 'bg-[#31353f] text-[#d0bcff] font-semibold'
                  : 'text-[#958ea0] hover:text-[#dfe2f0]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
              FX & Stickers
            </button>
          </div>

          {/* Conteúdo da Aba Ativa */}
          <div className="p-3 flex-1 overflow-y-auto space-y-3.5">
            {/* Whisper Engine Banner */}
            <div className="p-2.5 rounded-lg bg-[#171b25] flex items-center justify-between border border-[#494454]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">
                  psychology
                </span>
                <div>
                  <p className="text-[12px] text-[#dfe2f0] font-semibold leading-tight">
                    Whisper V3 Large
                  </p>
                  <p className="text-[10px] font-mono text-[#4ae176]">
                    Transcrição Sincronizada (PT-BR)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-[#00a74b]/20 text-[#4ae176] px-1.5 py-0.5 rounded font-bold">
                100% OK
              </span>
            </div>

            {/* Presets Estilo Alex Hormozi / Viral Shorts */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[#958ea0] uppercase tracking-wider font-semibold">
                  Templates Virais (Estilos)
                </span>
                <span className="text-[10px] font-mono text-[#d0bcff] cursor-pointer hover:underline">
                  Ver Todos
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Preset 1: Hormozi Pop */}
                <div
                  onClick={() => handleApplyPreset('hormozi')}
                  className={`cursor-pointer group p-2 rounded-lg transition-all flex flex-col justify-between border ${
                    captionPreset === 'hormozi'
                      ? 'bg-[#262a34] border-[#a078ff]'
                      : 'bg-[#171b25] border-[#494454]/20 hover:bg-[#262a34]'
                  }`}
                >
                  <div className="h-12 bg-[#0a0e18] rounded flex items-center justify-center overflow-hidden relative">
                    <span className="text-[16px] font-black text-yellow-400 tracking-wider group-hover:scale-105 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      HORMOZI
                    </span>
                    <span className="absolute top-1 right-1 text-[9px] font-mono bg-[#a078ff] text-[#340080] px-1 rounded font-bold">
                      HOT
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#dfe2f0] font-medium">Bounce Bold</span>
                    <span className="text-[10px] font-mono text-[#4ae176]">Amarelo/Verde</span>
                  </div>
                </div>

                {/* Preset 2: Minimalist Clean */}
                <div
                  onClick={() => handleApplyPreset('clean')}
                  className={`cursor-pointer group p-2 rounded-lg transition-all flex flex-col justify-between border ${
                    captionPreset === 'clean'
                      ? 'bg-[#262a34] border-[#a078ff]'
                      : 'bg-[#171b25] border-[#494454]/20 hover:bg-[#262a34]'
                  }`}
                >
                  <div className="h-12 bg-[#0a0e18] rounded flex items-center justify-center overflow-hidden">
                    <span className="text-[15px] font-bold text-[#dfe2f0] group-hover:scale-105 transition-transform">
                      Clean Cut
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#dfe2f0] font-medium">Neo Brutal</span>
                    <span className="text-[10px] font-mono text-[#958ea0]">Branco/Preto</span>
                  </div>
                </div>

                {/* Preset 3: Karaokê Glow */}
                <div
                  onClick={() => handleApplyPreset('karaoke')}
                  className={`cursor-pointer group p-2 rounded-lg transition-all flex flex-col justify-between border ${
                    captionPreset === 'karaoke'
                      ? 'bg-[#262a34] border-[#a078ff]'
                      : 'bg-[#171b25] border-[#494454]/20 hover:bg-[#262a34]'
                  }`}
                >
                  <div className="h-12 bg-[#0a0e18] rounded flex items-center justify-center overflow-hidden">
                    <span className="text-[15px] font-bold text-[#d0bcff] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(160,120,255,0.4)]">
                      KARAOKÊ
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#dfe2f0] font-medium">Glow Wave</span>
                    <span className="text-[10px] font-mono text-[#d0bcff]">Violet Pulse</span>
                  </div>
                </div>

                {/* Preset 4: Cyber Impact */}
                <div
                  onClick={() => handleApplyPreset('cyber')}
                  className={`cursor-pointer group p-2 rounded-lg transition-all flex flex-col justify-between border ${
                    captionPreset === 'cyber'
                      ? 'bg-[#262a34] border-[#a078ff]'
                      : 'bg-[#171b25] border-[#494454]/20 hover:bg-[#262a34]'
                  }`}
                >
                  <div className="h-12 bg-[#0a0e18] rounded flex items-center justify-center overflow-hidden">
                    <span className="text-[15px] font-black text-[#4ae176] tracking-tighter group-hover:scale-105 transition-transform font-mono">
                      RADICAL
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#dfe2f0] font-medium">Fast Glitch</span>
                    <span className="text-[10px] font-mono text-[#4ae176]">Verde Neon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mídia e Efeitos Sonoros de Transição */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[#958ea0] uppercase tracking-wider font-semibold">
                  SFX de Impacto (Arrastar p/ Timeline)
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">3 Dispersos</span>
              </div>

              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-[#171b25] hover:bg-[#262a34] flex items-center justify-between cursor-grab transition-colors border border-[#494454]/20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => soundFX.playWhoosh()}
                      className="w-6 h-6 rounded bg-[#262a34] hover:bg-[#a078ff] hover:text-[#340080] flex items-center justify-center text-[#dfe2f0] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    </button>
                    <div>
                      <p className="text-[11px] font-medium text-[#dfe2f0]">Whoosh_Fast_Air.wav</p>
                      <p className="text-[9px] font-mono text-[#958ea0]">0.42s • -3.2 dB</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-[#cbc3d7]">
                    SFX
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-[#171b25] hover:bg-[#262a34] flex items-center justify-between cursor-grab transition-colors border border-[#494454]/20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => soundFX.playPop()}
                      className="w-6 h-6 rounded bg-[#262a34] hover:bg-[#a078ff] hover:text-[#340080] flex items-center justify-center text-[#dfe2f0] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    </button>
                    <div>
                      <p className="text-[11px] font-medium text-[#dfe2f0]">Pop_Subtle_Bass.wav</p>
                      <p className="text-[9px] font-mono text-[#958ea0]">0.18s • -1.1 dB</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-[#cbc3d7]">
                    SFX
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-[#171b25] hover:bg-[#262a34] flex items-center justify-between cursor-grab transition-colors border border-[#494454]/20">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => soundFX.playDing()}
                      className="w-6 h-6 rounded bg-[#262a34] hover:bg-[#a078ff] hover:text-[#340080] flex items-center justify-center text-[#dfe2f0] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    </button>
                    <div>
                      <p className="text-[11px] font-medium text-[#dfe2f0]">Ding_Cash_Bell.wav</p>
                      <p className="text-[9px] font-mono text-[#958ea0]">0.85s • 0.0 dB</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#262a34] text-[#cbc3d7]">
                    SFX
                  </span>
                </div>
              </div>
            </div>

            {/* B-Roll Sugerido pela IA */}
            <div className="p-2.5 rounded-lg bg-[#171b25] border border-[#494454]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#d2bbff] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  B-Roll Sugerido (IA)
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">Em 00:14s</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-12 rounded bg-[#0a0e18] overflow-hidden shrink-0 relative">
                  <img
                    className="w-full h-full object-cover"
                    src={ASSETS.brollStock}
                    alt="B-Roll AI"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-[#dfe2f0] truncate">
                    Grafico_Crescimento_3D.mp4
                  </p>
                  <p className="text-[9px] font-mono text-[#958ea0]">
                    Correspondência: 98% ao tópico
                  </p>
                </div>
                <button
                  onClick={handleInsertBRoll}
                  className="p-1 rounded bg-[#6001d1] text-[#c9aeff] hover:brightness-110 cursor-pointer"
                  title="Inserir B-Roll"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PAINEL CENTRAL: Player & Monitor NLE (col 6) */}
        <section className="lg:col-span-6 bg-[#0a0e18] rounded-xl shadow-md flex flex-col justify-between overflow-hidden relative border border-[#494454]/25">
          {/* Viewport Header */}
          <div className="bg-[#171b25] px-3 py-1.5 flex items-center justify-between text-[#958ea0] text-[10px] font-mono border-b border-[#494454]/20">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[#dfe2f0] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#4ae176]" />
                PROGRAM VIEWPORT
              </span>
              <span className="bg-[#1b1f2a] px-1.5 py-0.5 rounded text-[#958ea0]">
                {aspectRatio === '9:16' ? '9:16 VERTICAL CANV' : aspectRatio === '16:9' ? '16:9 HORIZONTAL' : '1:1 SQUARE'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsSafeZoneActive(!isSafeZoneActive);
                }}
                className={`flex items-center gap-1 cursor-pointer transition-colors ${
                  isSafeZoneActive ? 'text-[#d2bbff]' : 'text-[#958ea0]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">crop_free</span>
                Safe Zones Ativas
              </button>
              <span className="text-[#494454]">|</span>
              <span className="text-[#cbc3d7]">REC 709 • HLG</span>
            </div>
          </div>

          {/* Central Canvas Program Viewport */}
          <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden bg-[#0f131d]">
            {/* Viewport Dynamic Frame based on Aspect Ratio */}
            <div
              className={`relative bg-black rounded-lg shadow-2xl overflow-hidden flex items-center justify-center select-none group transition-all duration-300 ${
                aspectRatio === '9:16'
                  ? 'aspect-[9/16] h-[96%] max-h-[460px]'
                  : aspectRatio === '16:9'
                  ? 'aspect-[16/9] w-[90%] max-w-[500px]'
                  : 'aspect-square h-[90%] max-h-[400px]'
              }`}
            >
              <img
                className="w-full h-full object-cover pointer-events-none"
                src={ASSETS.editorViewport}
                alt="Viewport monitor"
              />

              {/* SAFE ZONES OVERLAY (TikTok/Reels UI) */}
              {isSafeZoneActive && (
                <div className="absolute inset-0 pointer-events-none border border-[#4ae176]/25 flex flex-col justify-between p-3 animate-in fade-in duration-150">
                  {/* Top Safe Area */}
                  <div className="w-full pt-1 pb-1 border-b border-dashed border-[#4ae176]/30 flex justify-between items-start">
                    <span className="text-[9px] font-mono text-[#4ae176]/80 uppercase tracking-wider">
                      Top Safe Line (Header UI)
                    </span>
                    <span className="material-symbols-outlined text-[#4ae176]/40 text-[14px]">
                      vertical_align_top
                    </span>
                  </div>

                  {/* Right Social Action Rail */}
                  <div className="absolute right-2 bottom-16 space-y-3 flex flex-col items-center opacity-40">
                    <div className="w-6 h-6 rounded-full bg-[#1b1f2a] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">favorite</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#1b1f2a] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">chat_bubble</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#1b1f2a] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">bookmark</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#1b1f2a] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white">share</span>
                    </div>
                  </div>

                  {/* Bottom Safe Area */}
                  <div className="w-full pt-1 pb-1 border-t border-dashed border-[#4ae176]/30 flex justify-between items-end">
                    <span className="text-[9px] font-mono text-[#4ae176]/80 uppercase tracking-wider">
                      Bottom Safe Line (Caption / Sound UI)
                    </span>
                    <span className="text-[9px] font-mono text-[#958ea0]">1080×1920</span>
                  </div>
                </div>
              )}

              {/* DYNAMIC KINETIC CAPTION OVERLAY */}
              <div
                className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center w-[85%] cursor-move px-2 py-1 rounded hover:outline hover:outline-1 hover:outline-[#a078ff] transition-all"
                style={{
                  transform: `translate(-50%, ${rotation}deg) scale(${scale / 100})`,
                }}
              >
                <div className="inline-block px-2.5 py-1 rounded bg-black/50 backdrop-blur-sm">
                  <p
                    className="font-black uppercase leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                    style={{
                      fontFamily,
                      fontSize: `${Math.round(fontSize * 0.22)}px`,
                      color: captionColor,
                    }}
                  >
                    <span>QUANDO VOCÊ DESCOBRE,</span>
                    <br />
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded mt-0.5 ${
                        captionPreset === 'hormozi'
                          ? 'text-yellow-400 bg-yellow-400/20 shadow-[0_0_16px_rgba(250,204,21,0.6)] animate-pulse'
                          : captionPreset === 'karaoke'
                          ? 'text-[#d0bcff] bg-[#a078ff]/30 shadow-[0_0_16px_rgba(160,120,255,0.7)] animate-pulse'
                          : captionPreset === 'cyber'
                          ? 'text-[#4ae176] bg-[#00a74b]/30 font-mono'
                          : 'text-white bg-white/20'
                      }`}
                    >
                      ISSO MUDA TUDO!
                    </span>
                  </p>
                </div>
              </div>

              {/* Micro Watermark */}
              <div className="absolute top-2.5 left-2.5 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-mono text-[#958ea0] uppercase">
                AutoVideo 4K Live
              </div>
            </div>
          </div>

          {/* Player Transport Controls & Audio VU Meter */}
          <div className="bg-[#171b25] px-3 py-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#494454]/20">
            {/* Timecode */}
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[12px] text-[#d0bcff] font-bold bg-[#0a0e18] px-2 py-1 rounded border border-[#494454]/30">
                {timecode}
              </span>
              <span className="text-[#958ea0] text-[10px]">/ 00:00:58:00</span>
            </div>

            {/* Transport Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setTimecode('00:00:13:22');
                }}
                className="p-1.5 rounded hover:bg-[#262a34] text-[#958ea0] hover:text-[#dfe2f0] cursor-pointer"
                title="Voltar 1 Segundo"
              >
                <span className="material-symbols-outlined text-[18px]">replay_10</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setTimecode('00:00:14:20');
                }}
                className="p-1.5 rounded hover:bg-[#262a34] text-[#958ea0] hover:text-[#dfe2f0] cursor-pointer"
                title="Frame Anterior"
              >
                <span className="material-symbols-outlined text-[18px]">skip_previous</span>
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-[#a078ff] text-[#340080] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setTimecode('00:00:14:24');
                }}
                className="p-1.5 rounded hover:bg-[#262a34] text-[#958ea0] hover:text-[#dfe2f0] cursor-pointer"
                title="Próximo Frame"
              >
                <span className="material-symbols-outlined text-[18px]">skip_next</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setTimecode('00:00:15:22');
                }}
                className="p-1.5 rounded hover:bg-[#262a34] text-[#958ea0] hover:text-[#dfe2f0] cursor-pointer"
                title="Avançar 1 Segundo"
              >
                <span className="material-symbols-outlined text-[18px]">forward_10</span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsLoopActive(!isLoopActive);
                }}
                className={`p-1.5 rounded hover:bg-[#262a34] cursor-pointer ${
                  isLoopActive ? 'text-[#4ae176]' : 'text-[#958ea0]'
                }`}
                title="Loop Timeline"
              >
                <span className="material-symbols-outlined text-[18px]">repeat</span>
              </button>
            </div>

            {/* Audio Stereo VU Meters & Volume */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#958ea0] text-[16px]">
                  volume_up
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 accent-[#a078ff] h-1 bg-[#1b1f2a] rounded cursor-pointer"
                />
              </div>

              {/* Stereo VU Bars */}
              <div className="flex flex-col gap-0.5 w-16">
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-mono text-[#958ea0]">L</span>
                  <div className="w-full h-1.5 bg-[#0a0e18] rounded-full overflow-hidden flex">
                    <div className="bg-[#4ae176] h-full" style={{ width: isPlaying ? '75%' : '65%' }} />
                    <div className="bg-yellow-400 h-full" style={{ width: isPlaying ? '15%' : '10%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] font-mono text-[#958ea0]">R</span>
                  <div className="w-full h-1.5 bg-[#0a0e18] rounded-full overflow-hidden flex">
                    <div className="bg-[#4ae176] h-full" style={{ width: isPlaying ? '70%' : '60%' }} />
                    <div className="bg-yellow-400 h-full" style={{ width: isPlaying ? '12%' : '8%' }} />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4ae176] font-semibold">-12dB</span>
            </div>
          </div>
        </section>

        {/* 3. PAINEL DIREITO: Inspetor de Propriedades (col 3) */}
        <section className="lg:col-span-3 bg-[#0a0e18] rounded-xl shadow-md flex flex-col overflow-hidden border border-[#494454]/25">
          <div className="bg-[#171b25] px-3 py-2 flex items-center justify-between border-b border-[#494454]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">tune</span>
              <span className="text-[13px] font-semibold text-[#dfe2f0]">Inspetor</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d0bcff]/20 text-[#d0bcff] uppercase font-bold">
              Legenda Dinâmica
            </span>
          </div>

          <div className="p-3 flex-1 overflow-y-auto space-y-3.5 text-[#dfe2f0]">
            {/* Bloco 1: Transformação Espacial */}
            <div className="bg-[#171b25] p-2.5 rounded-lg border border-[#494454]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#958ea0] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">transform</span>
                  Transformação
                </span>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setPosX(540);
                    setPosY(1380);
                    setScale(100);
                    setRotation(0);
                  }}
                  className="text-[#958ea0] hover:text-[#dfe2f0] text-[10px] font-mono cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <label className="block text-[9px] text-[#958ea0] mb-0.5">Posição X</label>
                  <div className="bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center border border-[#494454]/20">
                    <span>{posX}</span>
                    <span className="text-[#958ea0] text-[9px]">px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-[#958ea0] mb-0.5">Posição Y</label>
                  <div className="bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center border border-[#494454]/20">
                    <span>{posY}</span>
                    <span className="text-[#958ea0] text-[9px]">px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-[#958ea0] mb-0.5">Escala</label>
                  <div className="bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center border border-[#494454]/20">
                    <span>{scale}%</span>
                    <span className="material-symbols-outlined text-[12px] text-[#958ea0]">
                      unfold_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-[#958ea0] mb-0.5">Rotação</label>
                  <div className="bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center border border-[#494454]/20">
                    <span>{rotation}.0°</span>
                    <span className="material-symbols-outlined text-[12px] text-[#958ea0]">
                      refresh
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco 2: Tipografia & Estilo Visual */}
            <div className="bg-[#171b25] p-2.5 rounded-lg border border-[#494454]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#958ea0] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">format_size</span>
                  Tipografia & Estilo
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[9px] text-[#958ea0] mb-0.5">Família Tipográfica</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full bg-[#0a0e18] px-2 py-1.5 rounded text-[12px] font-semibold text-[#dfe2f0] border border-[#494454]/20 cursor-pointer focus:outline-none"
                  >
                    <option value="Montserrat Black">Montserrat Black</option>
                    <option value="Geist">Geist Bold</option>
                    <option value="JetBrains Mono">JetBrains Mono Bold</option>
                    <option value="Impact">Impact / Heavy</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] text-[#958ea0] mb-0.5">Tamanho Fonte</label>
                    <div className="bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center font-mono text-[11px] border border-[#494454]/20">
                      <span>{fontSize} pt</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] text-[#958ea0] mb-0.5">Caixa de Texto</label>
                    <button
                      type="button"
                      onClick={() => setIsUppercase(!isUppercase)}
                      className="w-full bg-[#0a0e18] px-2 py-1 rounded flex justify-between items-center text-[10px] font-semibold border border-[#494454]/20 cursor-pointer"
                    >
                      <span>CAIXA ALTA</span>
                      <span className="material-symbols-outlined text-[12px] text-[#4ae176]">
                        {isUppercase ? 'check' : 'remove'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    <span className="text-[10px] font-mono text-[#958ea0]">#FFFFFF</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[#958ea0]">
                    <span>Contorno: 8px</span>
                    <span className="w-3.5 h-3.5 rounded bg-black border border-[#494454]" />
                  </div>

                  <label className="flex items-center gap-1 text-[10px] text-[#958ea0] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasShadow}
                      onChange={(e) => setHasShadow(e.target.checked)}
                      className="accent-[#a078ff] rounded"
                    />
                    <span>Sombra</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bloco 3: Animação IA & Auto-Highlight */}
            <div className="bg-[#171b25] p-2.5 rounded-lg border border-[#494454]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#d0bcff] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">animation</span>
                  Animação Generativa
                </span>
                <span className="text-[9px] font-mono bg-[#a078ff] text-[#340080] px-1 rounded font-bold">
                  IA ON
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between bg-[#0a0e18] px-2 py-1.5 rounded border border-[#494454]/20">
                  <span className="text-[#dfe2f0]">Tipo de Animação</span>
                  <span className="text-[10px] font-mono text-[#d2bbff] font-semibold">
                    Bounce Pop (0.15s)
                  </span>
                </div>

                <div className="flex items-center justify-between bg-[#0a0e18] px-2 py-1.5 rounded border border-[#494454]/20">
                  <span className="text-[#dfe2f0]">Auto-Highlight Ativo</span>
                  <span className="text-[10px] font-mono text-[#4ae176] font-semibold">
                    Amarelo / Verde
                  </span>
                </div>
              </div>
            </div>

            {/* Bloco 4: Áudio Ducking Inteligente */}
            <div className="bg-[#171b25] p-2.5 rounded-lg border border-[#494454]/20">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-[#4ae176] font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">new_window</span>
                  Áudio Ducking
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={audioDucking}
                    onChange={(e) => setAudioDucking(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-[#262a34] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00a74b]" />
                </label>
              </div>

              <p className="text-[11px] text-[#958ea0] leading-tight">
                Atenuar automaticamente música de fundo em{' '}
                <span className="text-[#4ae176] font-mono font-semibold">-18 dB</span> durante falas detectadas.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 4. PAINEL INFERIOR: Timeline Multifaixa Profissional NLE */}
      <footer className="bg-[#0a0e18] rounded-xl shadow-xl p-3 flex flex-col gap-2 border border-[#494454]/25">
        {/* Timeline Header */}
        <div className="flex items-center justify-between px-1 pb-1 text-[#958ea0] text-[10px] font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold text-[#dfe2f0] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#d0bcff] text-[16px]">
                view_timeline
              </span>
              TIMELINE MASTER
            </span>

            <div className="flex items-center bg-[#171b25] p-0.5 rounded-lg border border-[#494454]/20">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onShowToast('Dividir Clipe', 'Clipe fatiado na posição do playhead.', 'info');
                }}
                className="px-2 py-0.5 rounded hover:bg-[#262a34] text-[#dfe2f0] hover:text-[#d0bcff] flex items-center gap-1 cursor-pointer"
                title="Dividir Clip no Playhead (C)"
              >
                <span className="material-symbols-outlined text-[14px]">content_cut</span>
                Cortar
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onShowToast('Gap Delete', 'Espaços vazios removidos da timeline.', 'info');
                }}
                className="px-2 py-0.5 rounded hover:bg-[#262a34] text-[#dfe2f0] hover:text-[#ffb4ab] flex items-center gap-1 cursor-pointer"
                title="Excluir Espaço Vazio"
              >
                <span className="material-symbols-outlined text-[14px]">space_bar</span>
                Gap Delete
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onShowToast('Trancar Faixas', 'Todas as 4 faixas trancadas.', 'info');
                }}
                className="px-2 py-0.5 rounded hover:bg-[#262a34] text-[#dfe2f0] flex items-center gap-1 cursor-pointer"
                title="Trancar Todas as Faixas"
              >
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Trancar
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#4ae176] bg-[#00a74b]/10 px-2 py-0.5 rounded border border-[#4ae176]/20">
              Modo Interativo: Clique nos clipes para inspecionar
            </span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">zoom_out</span>
              <input
                type="range"
                min="1"
                max="5"
                defaultValue="2"
                className="w-20 accent-[#a078ff] h-1 bg-[#262a34] rounded cursor-pointer"
              />
              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
            </div>
          </div>
        </div>

        {/* Canvas da Timeline: Trilhas e Marcadores */}
        <div className="bg-[#0f131d] rounded-lg p-2 relative overflow-x-auto overflow-y-hidden border border-[#494454]/20">
          {/* Time Ruler */}
          <div className="relative h-6 bg-[#171b25] rounded-t flex items-center text-[#958ea0] text-[9px] font-mono px-28 select-none border-b border-[#494454]/20">
            <span className="absolute left-28">00:00</span>
            <span className="absolute left-[20%]">00:05</span>
            <span className="absolute left-[36%] text-[#d0bcff] font-bold">00:10</span>
            <span className="absolute left-[52%]">00:15</span>
            <span className="absolute left-[68%]">00:20</span>
            <span className="absolute left-[84%]">00:25</span>
            <span className="absolute right-4">00:30</span>
          </div>

          {/* DYNAMIC PLAYHEAD */}
          <div
            className="absolute top-1.5 bottom-1.5 w-0.5 bg-[#ffb4ab] z-30 pointer-events-none flex flex-col items-center transition-all duration-75"
            style={{ left: `${playheadPos}%` }}
          >
            <div className="w-3.5 h-3.5 bg-[#ffb4ab] rotate-45 -mt-1.5 shadow-[0_0_8px_rgba(255,180,171,0.8)]" />
            <span className="text-[9px] bg-[#ffb4ab] text-[#690005] font-mono font-bold px-1 rounded -mt-0.5 tracking-tighter">
              {timecode}
            </span>
          </div>

          {/* TRACKS CONTAINER */}
          <div className="space-y-1 mt-1 min-w-[760px]">
            {/* TRILHA V2: B-Roll & Elementos Gráficos */}
            <div className="h-10 bg-[#0a0e18]/80 rounded-lg flex items-center relative border border-[#494454]/15">
              <div className="w-24 shrink-0 px-2 flex items-center justify-between text-[#958ea0] text-[10px] font-mono bg-[#171b25] h-full rounded-l-lg z-10 border-r border-[#494454]/20">
                <span className="font-bold text-[#dfe2f0]">V2 B-ROLL</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] hover:text-[#dfe2f0] cursor-pointer">
                    visibility
                  </span>
                  <span className="material-symbols-outlined text-[13px] hover:text-[#dfe2f0] cursor-pointer">
                    lock_open
                  </span>
                </div>
              </div>

              <div className="flex-1 h-full relative pl-2">
                <div
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedTrackClip('broll');
                  }}
                  className={`absolute left-[38%] w-[24%] h-8 top-1 rounded bg-[#6001d1]/80 text-[#c9aeff] px-2 flex items-center justify-between cursor-pointer hover:brightness-110 shadow-sm transition-all border ${
                    selectedTrackClip === 'broll' ? 'border-[#d0bcff] ring-1 ring-[#d0bcff]' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                    <span className="text-[10px] font-mono font-semibold truncate">
                      3D_Growth_Chart.mp4
                    </span>
                  </div>
                  <span className="text-[9px] font-mono opacity-80">00:04.2s</span>
                </div>
              </div>
            </div>

            {/* TRILHA V1: Vídeo Principal */}
            <div className="h-14 bg-[#0a0e18]/80 rounded-lg flex items-center relative border border-[#494454]/15">
              <div className="w-24 shrink-0 px-2 flex items-center justify-between text-[#958ea0] text-[10px] font-mono bg-[#171b25] h-full rounded-l-lg z-10 border-r border-[#494454]/20">
                <span className="font-bold text-[#d0bcff]">V1 VÍDEO</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#d0bcff]">visibility</span>
                  <span className="material-symbols-outlined text-[13px] hover:text-[#dfe2f0] cursor-pointer">
                    lock_open
                  </span>
                </div>
              </div>

              <div className="flex-1 h-full relative pl-2 flex items-center gap-1">
                {/* Intro Clip */}
                <div
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedTrackClip('intro');
                  }}
                  className={`relative h-12 w-[34%] rounded bg-[#262a34] overflow-hidden cursor-pointer hover:brightness-110 shadow-sm flex flex-col justify-between p-1 border ${
                    selectedTrackClip === 'intro' ? 'border-[#a078ff] ring-1 ring-[#a078ff]' : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono text-white font-medium truncate">
                      PODCAST_CAM_A_TAK01
                    </span>
                    <span className="text-[9px] font-mono text-[#958ea0]">1080p</span>
                  </div>
                  <div className="w-full h-4 opacity-50 flex items-center gap-0.5">
                    <div className="w-1 h-3 bg-[#a078ff] rounded-full" />
                    <div className="w-1 h-4 bg-[#a078ff] rounded-full" />
                    <div className="w-1 h-2 bg-[#a078ff] rounded-full" />
                    <div className="w-1 h-3 bg-[#a078ff] rounded-full" />
                    <div className="w-1 h-4 bg-[#a078ff] rounded-full" />
                  </div>
                </div>

                {/* Viral Hook Clip (Active) */}
                <div
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedTrackClip('hook');
                  }}
                  className={`relative h-12 w-[42%] rounded bg-[#31353f] shadow-md flex flex-col justify-between p-1 cursor-pointer border ${
                    selectedTrackClip === 'hook'
                      ? 'border-[#a078ff] ring-2 ring-[#a078ff]'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono text-[#d0bcff] font-bold truncate">
                      CLIPE_VIRAL_HOOK_04
                    </span>
                    <span className="text-[9px] font-mono bg-[#a078ff] text-[#340080] px-1 rounded font-bold">
                      ATIVO
                    </span>
                  </div>
                  <div className="w-full h-4 opacity-75 flex items-center gap-0.5">
                    <div className="w-1 h-4 bg-[#4ae176] rounded-full" />
                    <div className="w-1 h-2 bg-[#4ae176] rounded-full" />
                    <div className="w-1 h-4 bg-[#4ae176] rounded-full" />
                    <div className="w-1 h-3 bg-[#4ae176] rounded-full" />
                    <div className="w-1 h-4 bg-[#4ae176] rounded-full" />
                    <div className="w-1 h-4 bg-[#4ae176] rounded-full" />
                  </div>
                </div>

                {/* Outro Clip */}
                <div
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedTrackClip('outro');
                  }}
                  className={`relative h-12 w-[22%] rounded bg-[#262a34] overflow-hidden cursor-pointer hover:brightness-110 shadow-sm flex flex-col justify-between p-1 border ${
                    selectedTrackClip === 'outro' ? 'border-[#a078ff] ring-1 ring-[#a078ff]' : 'border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono text-white font-medium truncate">
                    OUTRO_CTA.mov
                  </span>
                  <div className="w-full h-3 opacity-30 bg-[#a078ff]/40 rounded" />
                </div>
              </div>
            </div>

            {/* TRILHA T1: Legendas Whisper IA */}
            <div className="h-9 bg-[#0a0e18]/80 rounded-lg flex items-center relative border border-[#494454]/15">
              <div className="w-24 shrink-0 px-2 flex items-center justify-between text-[#958ea0] text-[10px] font-mono bg-[#171b25] h-full rounded-l-lg z-10 border-r border-[#494454]/20">
                <span className="font-bold text-[#d0bcff]">T1 LEGENDAS</span>
                <span className="material-symbols-outlined text-[13px] text-[#d0bcff]">
                  auto_awesome
                </span>
              </div>

              <div className="flex-1 h-full relative pl-2 flex items-center gap-1">
                <div className="h-7 w-[18%] rounded bg-[#a078ff]/20 text-[#d0bcff] px-2 flex items-center justify-between text-[10px] font-mono border border-[#a078ff]/20 truncate">
                  <span className="truncate">"Quando você descobre..."</span>
                </div>

                <div
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedTrackClip('caption');
                  }}
                  className={`h-7 w-[26%] rounded bg-[#a078ff] text-[#340080] px-2 flex items-center justify-between text-[10px] font-mono shadow-md cursor-pointer font-bold ${
                    selectedTrackClip === 'caption' ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <span className="truncate">"ISSO MUDA TUDO!"</span>
                  <span className="material-symbols-outlined text-[12px]">flash_on</span>
                </div>

                <div className="h-7 w-[22%] rounded bg-[#a078ff]/20 text-[#d0bcff] px-2 flex items-center justify-between text-[10px] font-mono border border-[#a078ff]/20 truncate">
                  <span className="truncate">"você não volta atrás..."</span>
                </div>
              </div>
            </div>

            {/* TRILHA A1: Trilha Sonora com Ducking */}
            <div className="h-10 bg-[#0a0e18]/80 rounded-lg flex items-center relative border border-[#494454]/15">
              <div className="w-24 shrink-0 px-2 flex items-center justify-between text-[#958ea0] text-[10px] font-mono bg-[#171b25] h-full rounded-l-lg z-10 border-r border-[#494454]/20">
                <span className="font-bold text-[#4ae176]">A1 MÚSICA</span>
                <span className="material-symbols-outlined text-[13px]">volume_up</span>
              </div>

              <div className="flex-1 h-full relative pl-2">
                <div className="h-8 w-[98%] top-1 rounded bg-[#00a74b]/30 text-[#4ae176] px-2 flex items-center justify-between relative overflow-hidden border border-[#00a74b]/30">
                  <div className="flex items-center gap-1 z-10">
                    <span className="material-symbols-outlined text-[13px]">music_note</span>
                    <span className="text-[10px] font-mono font-semibold">
                      Phonk_Energy_Viral_808.wav
                    </span>
                  </div>

                  {/* Ducking SVG Visual Curve */}
                  <div className="absolute inset-x-0 bottom-0 top-0 flex items-end opacity-40">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 40">
                      <path
                        d="M0,10 L150,10 L170,35 L320,35 L340,10 L500,10 L500,40 L0,40 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="text-[9px] font-mono text-[#4ae176] z-10 bg-[#0a0e18]/80 px-1 rounded">
                    -18dB Ducking
                  </span>
                </div>
              </div>
            </div>

            {/* TRILHA A2: SFX */}
            <div className="h-9 bg-[#0a0e18]/80 rounded-lg flex items-center relative border border-[#494454]/15">
              <div className="w-24 shrink-0 px-2 flex items-center justify-between text-[#958ea0] text-[10px] font-mono bg-[#171b25] h-full rounded-l-lg z-10 border-r border-[#494454]/20">
                <span className="font-bold text-[#dfe2f0]">A2 SFX</span>
                <span className="material-symbols-outlined text-[13px]">volume_up</span>
              </div>

              <div className="flex-1 h-full relative pl-2">
                <div className="absolute left-[37%] h-6 top-1.5 w-16 rounded bg-[#262a34] px-1 flex items-center gap-1 text-[9px] font-mono text-[#dfe2f0] border border-[#494454]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2bbff]" />
                  <span className="truncate">Whoosh</span>
                </div>
                <div className="absolute left-[47%] h-6 top-1.5 w-14 rounded bg-[#262a34] px-1 flex items-center gap-1 text-[9px] font-mono text-[#dfe2f0] border border-[#494454]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="truncate">Ding.wav</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
