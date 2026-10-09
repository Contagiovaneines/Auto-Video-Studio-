import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface BibliotecaVideosViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const BibliotecaVideosView: React.FC<BibliotecaVideosViewProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<'brutos' | 'broll' | 'audio'>('brutos');

  const rawVideos = [
    { title: 'Master_Podcast_Ep_88_IA.mp4', size: '4.2 GB', duration: '01:24:18', res: '4K 60fps', date: 'Hoje', img: ASSETS.podcastMasterStage },
    { title: 'Entrevista_Tech_Estrategia.mp4', size: '2.8 GB', duration: '00:54:10', res: '4K 60fps', date: 'Ontem', img: ASSETS.project01 },
    { title: 'Vlog_Setup_Gravacao.mov', size: '1.9 GB', duration: '00:36:45', res: '1080p 60fps', date: '3 dias atrás', img: ASSETS.project03 },
  ];

  const handleUpload = () => {
    soundFX.playClick();
    onShowToast('Carregar Arquivo', 'Selecione vídeos brutos (.mp4, .mov, .mkv) para importar.', 'info');
  };

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              video_library
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Biblioteca de Vídeos</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Repositório de mídias master, estoques de B-Roll cinemáticos e trilhas de áudio.
          </p>
        </div>

        <button
          onClick={handleUpload}
          className="px-3.5 py-2 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:bg-[#d0bcff] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">upload_file</span>
          <span>Upload de Vídeos</span>
        </button>
      </div>

      <div className="flex items-center gap-1 bg-[#171b25] p-1 rounded-lg border border-[#494454]/20 w-fit">
        <button
          onClick={() => setActiveTab('brutos')}
          className={`px-3 py-1.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
            activeTab === 'brutos' ? 'bg-[#31353f] text-[#d0bcff] font-semibold' : 'text-[#958ea0] hover:text-[#dfe2f0]'
          }`}
        >
          Gravações Brutas (3)
        </button>
        <button
          onClick={() => setActiveTab('broll')}
          className={`px-3 py-1.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
            activeTab === 'broll' ? 'bg-[#31353f] text-[#d0bcff] font-semibold' : 'text-[#958ea0] hover:text-[#dfe2f0]'
          }`}
        >
          Banco de B-Rolls IA (48)
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={`px-3 py-1.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
            activeTab === 'audio' ? 'bg-[#31353f] text-[#d0bcff] font-semibold' : 'text-[#958ea0] hover:text-[#dfe2f0]'
          }`}
        >
          Trilhas & SFX (12)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rawVideos.map((vid, idx) => (
          <div
            key={idx}
            className="group rounded-xl bg-[#1b1f2a] hover:bg-[#262a34] p-3 flex flex-col justify-between transition-all border border-[#494454]/20"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0a0e18] mb-2">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={vid.img} alt={vid.title} />
              <div className="absolute top-2 left-2 bg-[#0a0e18]/80 text-[#4ae176] text-[10px] font-mono px-1.5 py-0.5 rounded">
                {vid.res}
              </div>
              <div className="absolute bottom-2 left-2 bg-[#0a0e18]/80 text-[#dfe2f0] text-[10px] font-mono px-1.5 py-0.5 rounded">
                {vid.duration}
              </div>
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-[#dfe2f0] truncate">{vid.title}</h3>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#958ea0] mt-1">
                <span>{vid.size}</span>
                <span>{vid.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
