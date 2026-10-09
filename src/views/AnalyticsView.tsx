import React from 'react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              query_stats
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Analytics & Retenção</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Métricas de desempenho preditivas e reais dos cortes distribuídos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20">
          <p className="text-[11px] font-mono text-[#958ea0] uppercase">Taxa de Retenção Média (Primeiros 3s)</p>
          <div className="text-[32px] font-bold text-[#4ae176] mt-1">82.4%</div>
          <p className="text-[10px] text-[#cbc3d7] mt-1">+14% vs canais do mesmo nicho</p>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20">
          <p className="text-[11px] font-mono text-[#958ea0] uppercase">Visualizações Acumuladas</p>
          <div className="text-[32px] font-bold text-[#d0bcff] mt-1">3.4M</div>
          <p className="text-[10px] text-[#cbc3d7] mt-1">Últimos 30 dias (Shorts, Reels, TikTok)</p>
        </div>

        <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20">
          <p className="text-[11px] font-mono text-[#958ea0] uppercase">Horas Humanas Economizadas</p>
          <div className="text-[32px] font-bold text-[#eaddff] mt-1">142h</div>
          <p className="text-[10px] text-[#cbc3d7] mt-1">Edição manual substituída por pipeline IA</p>
        </div>
      </div>
    </div>
  );
};
