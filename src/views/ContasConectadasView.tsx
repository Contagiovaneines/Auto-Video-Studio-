import React, { useState } from 'react';
import { SOCIAL_ACCOUNTS } from '../data/mockData';
import { soundFX } from '../utils/audio';

interface ContasConectadasViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ContasConectadasView: React.FC<ContasConectadasViewProps> = ({ onShowToast }) => {
  const [accounts, setAccounts] = useState(SOCIAL_ACCOUNTS);

  const toggleConnect = (id: string) => {
    soundFX.playClick();
    setAccounts(
      accounts.map((acc) =>
        acc.id === id ? { ...acc, connected: !acc.connected } : acc
      )
    );
    onShowToast('Status de Conexão', 'Token OAuth atualizado.', 'success');
  };

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              hub
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Contas Conectadas</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a74b]/20 text-[#4ae176]">
              {accounts.filter((a) => a.connected).length} CANAIS ATIVOS
            </span>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Gerenciamento de credenciais OAuth 2.0 para publicação multi-plataforma simultânea.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#171b25] flex items-center justify-center text-[#d0bcff]">
                <span className="material-symbols-outlined text-[20px]">
                  {acc.type === 'youtube'
                    ? 'smart_display'
                    : acc.type === 'tiktok'
                    ? 'music_note'
                    : acc.type === 'instagram'
                    ? 'camera_alt'
                    : 'public'}
                </span>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#dfe2f0]">{acc.name}</h3>
                <p className="text-[11px] font-mono text-[#958ea0]">
                  {acc.handle} • {acc.followers} seguidores
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleConnect(acc.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                acc.connected
                  ? 'bg-[#00a74b]/20 text-[#4ae176] hover:bg-red-500/20 hover:text-red-400'
                  : 'bg-[#a078ff] text-[#340080] hover:bg-[#d0bcff]'
              }`}
            >
              {acc.connected ? 'Conectado' : '+ Conectar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
