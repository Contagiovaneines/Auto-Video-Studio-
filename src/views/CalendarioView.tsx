import React from 'react';
import { soundFX } from '../utils/audio';

interface CalendarioViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const CalendarioView: React.FC<CalendarioViewProps> = ({ onShowToast }) => {
  const days = [
    { day: 'Seg 26', items: [{ title: 'Gancho ChatGPT #01', time: '18:30', network: 'TikTok / Reels' }] },
    { day: 'Ter 27', items: [{ title: 'Podcast Corte 88', time: '12:00', network: 'YT Shorts' }] },
    { day: 'Qua 28', items: [{ title: '3 Gatilhos Mentais', time: '18:30', network: 'Omnichannel' }, { title: 'Dica Produtividade', time: '21:00', network: 'Reels' }] },
    { day: 'Qui 29', items: [{ title: 'Como Faturei 6D', time: '18:30', network: 'TikTok' }] },
    { day: 'Sex 30', items: [{ title: 'Ferramenta Secreta', time: '19:00', network: 'Omnichannel' }] },
    { day: 'Sáb 31', items: [{ title: 'Highlights Semanal', time: '14:00', network: 'YT Shorts' }] },
    { day: 'Dom 01', items: [{ title: 'Setup Estúdio R$500', time: '20:00', network: 'Shorts / TikTok' }] },
  ];

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              calendar_month
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Calendário de Publicações</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Cronograma visual de disparos automáticos nos melhores horários de pico.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            onShowToast('Novo Agendamento', 'Selecione um corte para programar na grade.', 'info');
          }}
          className="px-3.5 py-2 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:bg-[#d0bcff] transition-all cursor-pointer shadow-md"
        >
          + Agendar Corte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((d, idx) => (
          <div key={idx} className="bg-[#1b1f2a] rounded-xl p-3 border border-[#494454]/20 flex flex-col gap-2 min-h-[220px]">
            <div className="flex items-center justify-between border-b border-[#494454]/20 pb-1.5">
              <span className="text-[12px] font-bold font-mono text-[#dfe2f0]">{d.day}</span>
              <span className="text-[10px] font-mono text-[#958ea0]">{d.items.length} posts</span>
            </div>

            <div className="space-y-2 flex-1">
              {d.items.map((item, i) => (
                <div key={i} className="p-2 rounded-lg bg-[#171b25] border border-[#494454]/25 flex flex-col gap-1 hover:border-[#a078ff]/50 transition-colors">
                  <span className="text-[10px] font-mono text-[#d2bbff] font-semibold">{item.time}</span>
                  <p className="text-[11px] font-medium text-[#dfe2f0] line-clamp-2">{item.title}</p>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#262a34] text-[#4ae176] w-fit">
                    {item.network}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
