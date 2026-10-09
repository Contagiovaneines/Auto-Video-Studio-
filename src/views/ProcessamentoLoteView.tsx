import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

interface ProcessamentoLoteViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ProcessamentoLoteView: React.FC<ProcessamentoLoteViewProps> = ({ onShowToast }) => {
  const [tasks, setTasks] = useState([
    { id: '1', name: 'render_ep42_clip03.mp4', progress: 92, speed: '142 fps', eta: '00:14s', engine: 'NVENC Dual-Pass', active: true },
    { id: '2', name: 'batch_export_reels_pack.zip', progress: 48, speed: '98 fps', eta: '01:42s', engine: 'H.264 High 4:2:0', active: true },
    { id: '3', name: 'analise_silencios_raw.mov', progress: 12, speed: '210 fps', eta: '02:30s', engine: 'Whisper Turbo PT-BR', active: true },
  ]);

  const handlePause = (id: string) => {
    soundFX.playClick();
    setTasks(tasks.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
    onShowToast('Status Alterado', 'Ação aplicada à tarefa da fila.', 'info');
  };

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              layers
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Processamento em Lote</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6001d1]/30 text-[#d2bbff] font-bold">
              3 ATIVOS NA FILA
            </span>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Acelerador de renderização paralela com GPU dedicada RTX 4090 e transcrição Whisper V3.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#00a74b]/10 text-[#4ae176] text-[10px] font-mono border border-[#4ae176]/20">
            GPU: 68°C • VRAM: 14.8/24 GB
          </span>
        </div>
      </div>

      <div className="bg-[#1b1f2a] p-4 rounded-xl shadow-md border border-[#494454]/20 space-y-3">
        <h2 className="text-[14px] font-semibold text-[#dfe2f0]">Tarefas em Andamento</h2>

        <div className="space-y-2.5">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="p-3 bg-[#171b25] rounded-lg flex flex-col gap-2 border border-[#494454]/20 hover:border-[#a078ff]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[18px] text-[#d0bcff] ${t.active ? 'animate-spin' : ''}`}>
                    autorenew
                  </span>
                  <span className="text-[13px] font-mono font-medium text-[#dfe2f0]">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#31353f] text-[#cbc3d7]">
                    {t.engine}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-mono font-bold text-[#4ae176]">
                    {t.active ? `${t.progress}%` : 'PAUSADO'}
                  </span>
                  <button
                    onClick={() => handlePause(t.id)}
                    className="p-1 rounded hover:bg-[#262a34] text-[#cbc3d7] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {t.active ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="w-full bg-[#0a0e18] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#a078ff] h-full rounded-full transition-all duration-300"
                  style={{ width: `${t.progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#958ea0]">
                <span>Velocidade de render: {t.speed}</span>
                <span>Tempo restante: {t.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
