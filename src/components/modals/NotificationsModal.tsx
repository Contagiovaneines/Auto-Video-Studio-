import React from 'react';
import { soundFX } from '../../utils/audio';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Short Publicado com Sucesso!',
      desc: 'Corte #42-A "3 Gatilhos Mentais" enviado para o YouTube Shorts e TikTok.',
      time: '14 min atrás',
      icon: 'check_circle',
      color: 'text-[#4ae176]',
    },
    {
      id: '2',
      title: 'Fila de Renderização GPU Atualizada',
      desc: 'batch_export_reels_pack.zip atingiu 48% com aceleração NVENC.',
      time: '28 min atrás',
      icon: 'memory',
      color: 'text-[#d0bcff]',
    },
    {
      id: '3',
      title: 'Pico de Atenção Viral Detectado',
      desc: 'Novo corte de 00:46s gerado com Virality Score de 98/100.',
      time: '1 hora atrás',
      icon: 'local_fire_department',
      color: 'text-[#f59e0b]',
    },
    {
      id: '4',
      title: 'Sincronização OAuth Concluída',
      desc: 'Token do Instagram Reels renovado com sucesso (v2.4).',
      time: '2 horas atrás',
      icon: 'hub',
      color: 'text-[#d2bbff]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-8 bg-black/40 backdrop-blur-xs animate-in fade-in duration-100" onClick={onClose}>
      <div
        className="bg-[#1b1f2a] border border-[#494454] w-full max-w-sm rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-[#494454]/30 flex items-center justify-between bg-[#171b25]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">
              notifications
            </span>
            <h4 className="text-[13px] font-semibold text-[#dfe2f0]">
              Notificações do Sistema
            </h4>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="text-[#958ea0] hover:text-[#dfe2f0] p-1 rounded"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#494454]/20 p-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 hover:bg-[#262a34]/60 transition-colors flex items-start gap-2.5 cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[18px] mt-0.5 ${n.color}`}>
                {n.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#dfe2f0] leading-tight">
                  {n.title}
                </p>
                <p className="text-[11px] text-[#cbc3d7] mt-0.5 leading-snug">
                  {n.desc}
                </p>
                <span className="text-[9px] font-mono text-[#958ea0] mt-1 block">
                  {n.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 bg-[#171b25] border-t border-[#494454]/30 text-center">
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="text-[11px] font-mono text-[#d0bcff] hover:underline"
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>
    </div>
  );
};
