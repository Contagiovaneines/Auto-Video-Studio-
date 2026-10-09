import React, { useState } from 'react';
import { ViewType, ViralClip } from '../types';
import { ASSETS } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface PublicadorViewProps {
  initialClip?: ViralClip | null;
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const PublicadorView: React.FC<PublicadorViewProps> = ({
  initialClip,
  onNavigate,
  onShowToast,
}) => {
  // Feed Simulator active platform
  const [platform, setPlatform] = useState<'tiktok' | 'instagram' | 'youtube'>('tiktok');

  // Distribution channels selection
  const [channels, setChannels] = useState({
    youtube: true,
    tiktok: true,
    instagram: true,
    facebook: false,
  });

  // Caption & Hashtags
  const [caption, setCaption] = useState(
    initialClip
      ? `${initialClip.title}! 🚀 Já cometeu esse? Comente abaixo 👇 #marketingdigital #dicasia #viralshorts`
      : 'O erro fatal que 99% cometem ao começar no digital! 🚀 Já cometeu esse? Comente abaixo 👇'
  );

  // Selected frame / thumbnail
  const [selectedFrame, setSelectedFrame] = useState<number>(1);
  const frames = [
    { id: 1, img: ASSETS.frame01, time: '00:03s' },
    { id: 2, img: ASSETS.frame02, time: '00:15s' },
    { id: 3, img: ASSETS.frame03, time: '00:27s' },
  ];

  // Schedule mode
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('schedule');
  const [publishDate, setPublishDate] = useState('28 de Outubro de 2025');
  const [publishTime, setPublishTime] = useState('18:30');
  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');

  // Interactive Mobile Simulator state
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(12400);
  const [isFollowing, setIsFollowing] = useState(false);

  const selectedChannelsCount = Object.values(channels).filter(Boolean).length;

  const handleToggleLike = () => {
    soundFX.playPop();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleToggleSave = () => {
    soundFX.playClick();
    setIsSaved(!isSaved);
  };

  const handleToggleFollow = () => {
    soundFX.playClick();
    setIsFollowing(!isFollowing);
  };

  const appendTag = (tag: string) => {
    soundFX.playClick();
    if (!caption.includes(tag)) {
      setCaption((prev) => `${prev.trim()} ${tag}`);
    }
  };

  const insertAllTags = () => {
    soundFX.playDing();
    const tags = ['#marketingdigital', '#dicasia', '#produtividade', '#cortespodcast', '#viralshorts'];
    let updated = caption;
    tags.forEach((t) => {
      if (!updated.includes(t)) {
        updated += ` ${t}`;
      }
    });
    setCaption(updated.trim());
    onShowToast('Tags Inseridas', '5 hashtags virais de alto alcance adicionadas à legenda.', 'success');
  };

  const handleConfirmPublish = () => {
    soundFX.playDing();
    if (publishMode === 'now') {
      onShowToast(
        'Publicação Instantânea',
        `Disparo enviado para ${selectedChannelsCount} redes sociais!`,
        'success'
      );
    } else {
      onShowToast(
        'Agendamento Confirmado',
        `Post agendado com sucesso para ${publishDate} às ${publishTime} (${selectedChannelsCount} redes).`,
        'success'
      );
    }
  };

  const handleSaveDraft = () => {
    soundFX.playClick();
    onShowToast('Rascunho Salvo', 'Configurações de disparo e legendas preservadas.', 'info');
  };

  // Formatted caption with highlighted tags
  const renderFormattedCaption = () => {
    const parts = caption.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-[#d0bcff] font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col w-full text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full items-start">
        {/* COLUNA DA ESQUERDA: Formulário & Configuração de Disparo (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col gap-4">
          {/* Topo: Contextual Tracker & Título Técnico */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl shadow-sm border border-[#494454]/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#a078ff]/20 flex items-center justify-center shrink-0 text-[#d0bcff]">
                <span className="material-symbols-outlined text-[24px]">send</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#d0bcff] font-semibold tracking-wider">
                    Multi-Stream Engine
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176]" />
                  <span className="text-[10px] font-mono text-[#958ea0]">Pipeline V4.2</span>
                </div>
                <h1 className="text-[20px] font-bold text-[#dfe2f0] tracking-tight truncate">
                  Publicador Automático & Agendador
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 bg-[#1b1f2a] px-3 py-1.5 rounded-lg border border-[#494454]/20">
              <span className="material-symbols-outlined text-[#4ae176] text-[16px]">
                verified_user
              </span>
              <span className="text-[10px] font-mono text-[#cbc3d7]">
                {selectedChannelsCount}/4 Redes Prontas
              </span>
            </div>
          </div>

          {/* Seletor de Vídeo Ativo */}
          <div className="bg-[#171b25] p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#494454]/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-16 h-20 rounded-lg bg-[#1b1f2a] overflow-hidden shrink-0 shadow-inner group border border-[#494454]/20">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.publisherVideoActive}
                  alt="Vídeo Ativo"
                />
                <div className="absolute inset-0 bg-[#0a0e18]/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">
                    play_circle
                  </span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#a078ff]/20 text-[#d0bcff] uppercase font-bold">
                    Vídeo Ativo
                  </span>
                  <span className="text-[10px] font-mono text-[#4ae176]">H.264 / AAC</span>
                </div>
                <span className="text-[14px] font-semibold text-[#dfe2f0] truncate mt-0.5">
                  corte_ia_01_gatilhos_mentais.mp4
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-[#958ea0] text-[10px] font-mono">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">timer</span>
                    00:46s
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">aspect_ratio</span>
                    1080x1920 (9:16)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">save</span>
                    24.1 MB
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('cortes-com-ia')}
              className="px-3 py-2 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] text-[#dfe2f0] text-[12px] font-medium transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer border border-[#494454]/30"
            >
              <span className="material-symbols-outlined text-[16px] text-[#958ea0]">
                swap_horizontal_circle
              </span>
              <span>Alterar Vídeo</span>
            </button>
          </div>

          {/* Seleção e Status das Redes Sociais */}
          <div className="bg-[#171b25] p-4 rounded-xl shadow-sm flex flex-col gap-3 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#958ea0] tracking-wider font-semibold">
                  Canais de Distribuição
                </span>
                <span className="text-[10px] font-mono text-[#d0bcff]">
                  (Sincronização Simultânea)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#4ae176]">OAuth 2.0 Token Ativo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* YouTube Shorts */}
              <label className="group relative flex items-center justify-between p-2.5 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] cursor-pointer transition-all border border-[#494454]/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={channels.youtube}
                    onChange={(e) => setChannels({ ...channels, youtube: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#a078ff] cursor-pointer shrink-0"
                  />
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">smart_display</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-[#dfe2f0] truncate">
                      YouTube Shorts
                    </span>
                    <span className="text-[10px] font-mono text-[#958ea0] truncate">
                      @TechStudioBR • 142k
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ae176]/10 text-[#4ae176] font-medium shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                  Conectado
                </span>
              </label>

              {/* TikTok */}
              <label className="group relative flex items-center justify-between p-2.5 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] cursor-pointer transition-all border border-[#494454]/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={channels.tiktok}
                    onChange={(e) => setChannels({ ...channels, tiktok: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#a078ff] cursor-pointer shrink-0"
                  />
                  <div className="w-8 h-8 rounded-lg bg-[#31353f] text-[#d2bbff] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">music_note</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-[#dfe2f0] truncate">
                      TikTok
                    </span>
                    <span className="text-[10px] font-mono text-[#958ea0] truncate">
                      @autovideo_oficial • 89k
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ae176]/10 text-[#4ae176] font-medium shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                  Conectado
                </span>
              </label>

              {/* Instagram Reels */}
              <label className="group relative flex items-center justify-between p-2.5 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] cursor-pointer transition-all border border-[#494454]/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={channels.instagram}
                    onChange={(e) => setChannels({ ...channels, instagram: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#a078ff] cursor-pointer shrink-0"
                  />
                  <div className="w-8 h-8 rounded-lg bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">camera_alt</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-[#dfe2f0] truncate">
                      Instagram Reels
                    </span>
                    <span className="text-[10px] font-mono text-[#958ea0] truncate">
                      @rafael.criativo • 45k
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ae176]/10 text-[#4ae176] font-medium shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                  Conectado
                </span>
              </label>

              {/* Facebook Reels */}
              <div className="group relative flex items-center justify-between p-2.5 rounded-lg bg-[#1b1f2a]/60 opacity-80 border border-[#494454]/20">
                <div className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={channels.facebook}
                    onChange={(e) => setChannels({ ...channels, facebook: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#a078ff] cursor-pointer shrink-0"
                  />
                  <div className="w-8 h-8 rounded-lg bg-[#262a34] text-[#958ea0] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">public</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-medium text-[#cbc3d7] truncate">
                      Facebook Reels
                    </span>
                    <span className="text-[10px] font-mono text-[#958ea0] truncate">
                      Página Tech Master
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setChannels({ ...channels, facebook: true });
                    onShowToast('Facebook Conectado', 'Página vinculada com sucesso.', 'success');
                  }}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#6001d1]/40 text-[#c9aeff] font-semibold hover:bg-[#6001d1] transition-colors shrink-0 cursor-pointer"
                >
                  {channels.facebook ? 'Conectado' : '+ Conectar'}
                </button>
              </div>
            </div>
          </div>

          {/* Metadados do Post */}
          <div className="bg-[#171b25] p-4 rounded-xl shadow-sm flex flex-col gap-3 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <label
                className="text-[10px] font-mono uppercase text-[#958ea0] tracking-wider font-semibold"
                htmlFor="post-caption"
              >
                Legenda & Otimização Viral
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#d0bcff] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  Gerado por IA
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">
                  {caption.length} / 2200
                </span>
              </div>
            </div>

            <div className="relative w-full">
              <textarea
                id="post-caption"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 bg-[#1b1f2a] rounded-lg text-[#dfe2f0] text-[13px] placeholder-[#958ea0] focus:outline-none focus:bg-[#262a34] transition-colors resize-none leading-relaxed border border-[#494454]/30"
              />
            </div>

            {/* Sugestões de Hashtags por IA */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#958ea0] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#d2bbff]">
                    trending_up
                  </span>
                  Tags sugeridas por tendência em tempo real:
                </span>
                <button
                  type="button"
                  onClick={insertAllTags}
                  className="text-[10px] font-mono text-[#d0bcff] hover:underline cursor-pointer"
                >
                  + Inserir Todas
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  '#marketingdigital',
                  '#dicasia',
                  '#produtividade',
                  '#cortespodcast',
                  '#viralshorts',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => appendTag(tag)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#1b1f2a] hover:bg-[#a078ff]/20 hover:text-[#d0bcff] text-[#cbc3d7] transition-colors flex items-center gap-1 cursor-pointer border border-[#494454]/20"
                  >
                    <span className="text-[#958ea0]">+</span> {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Thumbnail */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#494454]/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#958ea0] tracking-wider font-semibold">
                  Capa & Frame de Abertura
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">
                  Frame Selecionado:{' '}
                  {frames.find((f) => f.id === selectedFrame)?.time || '00:08s'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {frames.map((frame) => {
                  const isSelected = selectedFrame === frame.id;
                  return (
                    <div
                      key={frame.id}
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedFrame(frame.id);
                      }}
                      className={`relative aspect-[9/16] rounded-lg overflow-hidden bg-[#1b1f2a] cursor-pointer group shadow-sm transition-all border ${
                        isSelected
                          ? 'ring-2 ring-[#a078ff] border-[#a078ff]'
                          : 'opacity-70 hover:opacity-100 border-[#494454]/20'
                      }`}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={frame.img}
                        alt={`Frame ${frame.time}`}
                      />
                      <div className="absolute bottom-1 left-1 bg-[#0a0e18]/80 px-1 rounded text-[9px] font-mono text-[#dfe2f0]">
                        {frame.time}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#a078ff] flex items-center justify-center text-[#340080]">
                          <span className="material-symbols-outlined text-[12px] font-bold">
                            check
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Upload Custom */}
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onShowToast('Upload de Capa', 'Carregando arquivo de imagem personalizado (JPG/PNG).', 'info');
                  }}
                  className="aspect-[9/16] rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] transition-colors flex flex-col items-center justify-center p-2 text-center text-[#958ea0] hover:text-[#dfe2f0] group border border-dashed border-[#494454]/40 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#31353f] group-hover:bg-[#a078ff]/20 group-hover:text-[#d0bcff] flex items-center justify-center transition-colors mb-1">
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                  </div>
                  <span className="text-[10px] font-mono leading-tight font-medium">
                    Upload Capa Personalizada
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Configurações de Agendamento */}
          <div className="bg-[#171b25] p-4 rounded-xl shadow-sm flex flex-col gap-3.5 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#958ea0] tracking-wider font-semibold">
                Cronograma de Disparo
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00a74b]/20 text-[#4ae176]">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                <span className="text-[10px] font-mono font-semibold">Smart Queue Ativa</span>
              </div>
            </div>

            {/* Modos de Envio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-all border ${
                  publishMode === 'now'
                    ? 'ring-1 ring-[#a078ff]/40 bg-[#a078ff]/10 border-[#a078ff]'
                    : 'bg-[#1b1f2a] hover:bg-[#262a34] border-[#494454]/20'
                }`}
              >
                <input
                  type="radio"
                  name="publish_mode"
                  value="now"
                  checked={publishMode === 'now'}
                  onChange={() => {
                    soundFX.playClick();
                    setPublishMode('now');
                  }}
                  className="w-4 h-4 text-[#a078ff] accent-[#a078ff] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#dfe2f0]">
                    Publicar Imediatamente
                  </span>
                  <span className="text-[10px] font-mono text-[#958ea0]">
                    Transmissão instantânea para os nós de API
                  </span>
                </div>
              </label>

              <label
                className={`flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer transition-all border ${
                  publishMode === 'schedule'
                    ? 'ring-1 ring-[#a078ff]/40 bg-[#a078ff]/10 border-[#a078ff]'
                    : 'bg-[#1b1f2a] hover:bg-[#262a34] border-[#494454]/20'
                }`}
              >
                <input
                  type="radio"
                  name="publish_mode"
                  value="schedule"
                  checked={publishMode === 'schedule'}
                  onChange={() => {
                    soundFX.playClick();
                    setPublishMode('schedule');
                  }}
                  className="w-4 h-4 text-[#a078ff] accent-[#a078ff] cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#d0bcff]">
                    Agendar para Data Futura
                  </span>
                  <span className="text-[10px] font-mono text-[#cbc3d7]">
                    Calibrado pelo algoritmo de pico
                  </span>
                </div>
              </label>
            </div>

            {/* Campos de Data, Hora e Fuso */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-[#958ea0] font-medium">
                  Data do Lançamento
                </label>
                <div className="flex items-center bg-[#1b1f2a] px-2.5 py-2 rounded-lg text-[#dfe2f0] text-[13px] gap-2 border border-[#494454]/20">
                  <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">
                    calendar_today
                  </span>
                  <input
                    type="text"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="bg-transparent w-full focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-[#958ea0] font-medium">
                  Horário Programado
                </label>
                <div className="flex items-center bg-[#1b1f2a] px-2.5 py-2 rounded-lg text-[#dfe2f0] text-[13px] gap-2 border border-[#494454]/20">
                  <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">
                    schedule
                  </span>
                  <input
                    type="text"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                    className="bg-transparent w-full focus:outline-none font-mono font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono text-[#958ea0] font-medium">
                  Privacidade
                </label>
                <div className="flex items-center bg-[#1b1f2a] px-2.5 py-2 rounded-lg text-[#dfe2f0] text-[13px] gap-2 border border-[#494454]/20">
                  <span className="material-symbols-outlined text-[18px] text-[#4ae176]">
                    lock_open
                  </span>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                    className="bg-transparent w-full focus:outline-none text-[#dfe2f0] cursor-pointer font-medium"
                  >
                    <option value="public" className="bg-[#1b1f2a] text-[#dfe2f0]">
                      Público
                    </option>
                    <option value="unlisted" className="bg-[#1b1f2a] text-[#dfe2f0]">
                      Não Listado
                    </option>
                    <option value="private" className="bg-[#1b1f2a] text-[#dfe2f0]">
                      Privado
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dica de Horário Ideal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-[#1b1f2a] border border-[#494454]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d2bbff] text-[18px]">
                  local_fire_department
                </span>
                <span className="text-[12px] text-[#dfe2f0]">
                  <strong className="text-[#d2bbff] font-medium">
                    Melhor Horário para seu público:
                  </strong>{' '}
                  18h às 20h 🔥
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#958ea0] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">public</span> GMT-3
                (Horário de Brasília)
              </span>
            </div>
          </div>

          {/* Barra de Ações do Rodapé */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-3.5 py-2.5 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] text-[#dfe2f0] text-[12px] font-medium transition-all shadow-sm cursor-pointer border border-[#494454]/30"
              >
                Salvar como Rascunho
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onShowToast('Modo Simulação', 'Simulação de testes de envio sem consumo de cotas de API.', 'info');
                }}
                className="px-3.5 py-2.5 rounded-lg bg-[#1b1f2a] hover:bg-[#262a34] text-[#cbc3d7] hover:text-[#dfe2f0] text-[12px] font-medium transition-all shadow-sm flex items-center gap-1.5 cursor-pointer border border-[#494454]/30"
              >
                <span className="material-symbols-outlined text-[16px] text-[#d2bbff]">
                  science
                </span>
                <span>Modo Simulação</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirmPublish}
              className="px-5 py-3 rounded-lg bg-[#a078ff] hover:bg-[#d0bcff] text-[#340080] font-bold text-[13px] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer shadow-[#a078ff]/20"
            >
              <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
              <span>Confirmar Agendamento ({selectedChannelsCount} Redes)</span>
            </button>
          </div>
        </div>

        {/* COLUNA DA DIREITA: Live Mobile Preview Realista (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col gap-4 lg:sticky lg:top-20">
          {/* Seletor de Rede Ativa */}
          <div className="bg-[#171b25] p-4 rounded-xl shadow-sm flex flex-col gap-2.5 border border-[#494454]/20">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#958ea0] tracking-wider font-semibold">
                Simulador de Feed Real
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00a74b]/20 text-[#4ae176]">
                Pixel Perfect
              </span>
            </div>

            {/* Abas */}
            <div className="flex items-center bg-[#1b1f2a] p-1 rounded-lg gap-1 border border-[#494454]/20">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPlatform('tiktok');
                }}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'tiktok'
                    ? 'font-bold bg-[#31353f] text-[#d0bcff] shadow-sm'
                    : 'font-medium text-[#958ea0] hover:text-[#dfe2f0]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">music_note</span>
                <span>TikTok</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPlatform('instagram');
                }}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'instagram'
                    ? 'font-bold bg-[#31353f] text-[#d0bcff] shadow-sm'
                    : 'font-medium text-[#958ea0] hover:text-[#dfe2f0]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">camera_alt</span>
                <span>Instagram Reels</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setPlatform('youtube');
                }}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'youtube'
                    ? 'font-bold bg-[#31353f] text-[#d0bcff] shadow-sm'
                    : 'font-medium text-[#958ea0] hover:text-[#dfe2f0]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">smart_display</span>
                <span>Shorts</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[#958ea0] text-[10px] font-mono">
              <span className="material-symbols-outlined text-[14px] text-[#4ae176]">
                check_circle
              </span>
              <span>Preview Fiel à Interface Nativa do Aplicativo</span>
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="flex justify-center w-full">
            <div className="relative w-full max-w-[340px] aspect-[9/19] bg-[#0a0e18] rounded-[40px] p-2.5 shadow-2xl overflow-hidden select-none border-4 border-[#262a34]">
              {/* Notch / Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0a0e18] rounded-full z-30 flex items-center justify-end pr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#31353f]/80" />
              </div>

              {/* Phone Inner Screen */}
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#171b25] flex flex-col justify-between">
                {/* Background Video Frame */}
                <div className="absolute inset-0 z-0">
                  <img
                    className="w-full h-full object-cover"
                    src={ASSETS.phoneVideoBg}
                    alt="Phone video preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e18]/60 via-transparent to-[#0a0e18]/90 pointer-events-none" />
                </div>

                {/* Top Status Bar & Sub-header */}
                <div className="relative z-10 pt-7 px-5 flex items-center justify-between text-[#dfe2f0]">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold">18:30</span>
                  </div>

                  {/* Tab Header inside app */}
                  <div className="flex items-center gap-3 text-[12px] font-semibold text-[#dfe2f0]/80">
                    {platform === 'tiktok' && (
                      <>
                        <span className="text-[#cbc3d7]/60">Seguindo</span>
                        <span className="text-[#dfe2f0] border-b-2 border-white pb-0.5">
                          Para Você
                        </span>
                      </>
                    )}
                    {platform === 'instagram' && (
                      <span className="text-[#dfe2f0] font-bold text-[14px]">Reels</span>
                    )}
                    {platform === 'youtube' && (
                      <span className="text-[#dfe2f0] font-bold text-[13px]">Shorts</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">search</span>
                  </div>
                </div>

                {/* Subtítulo / Legenda IA Flutuando no Meio */}
                <div className="relative z-10 px-4 my-auto text-center pointer-events-none">
                  <div className="inline-block px-3 py-1.5 rounded-md bg-[#0a0e18]/80 backdrop-blur-md shadow-lg border border-[#494454]/30">
                    <span className="text-[15px] font-black uppercase tracking-tight text-[#4ae176] drop-shadow-md">
                      ERRO FATAL
                    </span>
                    <span className="text-[15px] font-black uppercase tracking-tight text-white drop-shadow-md ml-1">
                      QUE 99% COMETEM
                    </span>
                  </div>
                </div>

                {/* Native App Controls & Metadata Footer Overlay */}
                <div className="relative z-10 p-3 pb-5 flex items-end justify-between gap-3">
                  {/* Left: Account, Description & Audio */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1 text-[#dfe2f0] text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-white tracking-tight">
                        {platform === 'tiktok'
                          ? '@autovideo_oficial'
                          : platform === 'instagram'
                          ? 'rafael.criativo'
                          : 'TechStudioBR'}
                      </span>
                      <span className="material-symbols-outlined text-[#d0bcff] text-[14px]">
                        verified
                      </span>

                      {platform !== 'youtube' && (
                        <button
                          type="button"
                          onClick={handleToggleFollow}
                          className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            isFollowing
                              ? 'bg-[#262a34] text-[#dfe2f0]'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {isFollowing ? 'Seguindo' : 'Seguir'}
                        </button>
                      )}
                    </div>

                    {/* Live caption mirrored text */}
                    <p className="text-[11px] leading-tight text-white/95 line-clamp-3">
                      {renderFormattedCaption()}
                    </p>

                    {/* Audio track info */}
                    <div className="flex items-center gap-1.5 text-white/80 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] animate-spin">
                        music_note
                      </span>
                      <span className="text-[10px] truncate font-mono">
                        {platform === 'tiktok'
                          ? 'Som original - Tech Studio Beats'
                          : platform === 'instagram'
                          ? 'Áudio original • rafael.criativo'
                          : 'Áudio de corte #01 • YouTube Library'}
                      </span>
                    </div>
                  </div>

                  {/* Right Vertical Action Rail */}
                  <div className="flex flex-col items-center gap-2.5 shrink-0 pb-1">
                    {/* Creator avatar with (+) */}
                    <div className="relative w-9 h-9 rounded-full p-0.5 bg-[#31353f] shadow-md">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={ASSETS.creatorAvatar}
                        alt="Creator"
                      />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px] shadow">
                        +
                      </div>
                    </div>

                    {/* Like button */}
                    <div
                      onClick={handleToggleLike}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0a0e18]/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                        <span
                          className={`material-symbols-outlined text-[20px] transition-colors ${
                            isLiked ? 'text-red-500' : 'text-white'
                          }`}
                        >
                          favorite
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-white mt-0.5">
                        {(likeCount / 1000).toFixed(1)}k
                      </span>
                    </div>

                    {/* Comment */}
                    <div
                      onClick={() => {
                        soundFX.playClick();
                        onShowToast('Comentários', 'Simulação de abertura de aba de comentários.', 'info');
                      }}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0a0e18]/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px] text-white">
                          mode_comment
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-white mt-0.5">
                        342
                      </span>
                    </div>

                    {/* Bookmark / Save */}
                    <div
                      onClick={handleToggleSave}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0a0e18]/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                        <span
                          className={`material-symbols-outlined text-[20px] transition-colors ${
                            isSaved ? 'text-yellow-400' : 'text-white'
                          }`}
                        >
                          bookmark
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-white mt-0.5">
                        1.8k
                      </span>
                    </div>

                    {/* Share */}
                    <div
                      onClick={() => {
                        soundFX.playClick();
                        onShowToast('Compartilhar', 'Compartilhamento nativo de rede disparado.', 'info');
                      }}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#0a0e18]/40 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[20px] text-white">
                          share
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-white mt-0.5">
                        628
                      </span>
                    </div>

                    {/* Rotating Vinyl Disc */}
                    <div
                      className="w-7 h-7 rounded-full bg-[#0a0e18] p-1 shadow-lg animate-spin"
                      style={{ animationDuration: '4s' }}
                    >
                      <div className="w-full h-full rounded-full bg-[#262a34] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Indicator Bar */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20" />
              </div>
            </div>
          </div>

          {/* Rodapé da Coluna Direita: Disclaimer & Status de Cota */}
          <div className="bg-[#171b25] p-3 rounded-xl text-center flex flex-col gap-1 shadow-sm border border-[#494454]/20">
            <div className="flex items-center justify-center gap-1.5 text-[#cbc3d7] text-[10px] font-mono">
              <span className="material-symbols-outlined text-[15px] text-[#d2bbff]">
                info
              </span>
              <span>
                Modo demonstração: o agendamento simula o fluxo completo de publicação sem consumir cotas de API reais.
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 text-[#958ea0] text-[10px] font-mono">
              <span>Latência de Nó: 14ms</span>
              <span>•</span>
              <span>TLS 1.3 Criptografado</span>
              <span>•</span>
              <span className="text-[#4ae176]">Zero Erros na Fila</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
