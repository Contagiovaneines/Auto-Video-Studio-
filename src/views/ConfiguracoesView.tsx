import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

interface ConfiguracoesViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ConfiguracoesView: React.FC<ConfiguracoesViewProps> = ({ onShowToast }) => {
  const [hardwareAccel, setHardwareAccel] = useState(true);
  const [cudaThreads, setCudaThreads] = useState(16);
  const [vramCap, setVramCap] = useState(20);

  const handleSave = () => {
    soundFX.playDing();
    onShowToast('Configurações Salvas', 'Parâmetros de aceleração de hardware e GPU persistidos.', 'success');
  };

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              settings
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Configurações da Workstation</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Aceleração NVIDIA RTX 4090 / CUDA, alocação de VRAM e encoders NVENC.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20 space-y-4 max-w-2xl">
        <div className="flex items-center justify-between p-3 rounded-lg bg-[#171b25] border border-[#494454]/20">
          <div>
            <p className="text-[13px] font-semibold text-[#dfe2f0]">Aceleração por Hardware CUDA</p>
            <p className="text-[11px] text-[#958ea0]">Habilita renderização direta via GPU RTX 4090</p>
          </div>
          <input
            type="checkbox"
            checked={hardwareAccel}
            onChange={(e) => setHardwareAccel(e.target.checked)}
            className="accent-[#a078ff] w-4 h-4 cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-[#958ea0] mb-1">
            Threads Concorrentes CUDA: <span className="text-[#d0bcff] font-bold">{cudaThreads}</span>
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={cudaThreads}
            onChange={(e) => setCudaThreads(Number(e.target.value))}
            className="w-full accent-[#a078ff] cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono text-[#958ea0] mb-1">
            Limite de Alocação de VRAM: <span className="text-[#4ae176] font-bold">{vramCap} GB / 24 GB</span>
          </label>
          <input
            type="range"
            min="8"
            max="24"
            value={vramCap}
            onChange={(e) => setVramCap(Number(e.target.value))}
            className="w-full accent-[#4ae176] cursor-pointer"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:bg-[#d0bcff] transition-all cursor-pointer shadow-md"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};
