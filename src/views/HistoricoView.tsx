import React from 'react';

export const HistoricoView: React.FC = () => {
  const logs = [
    { id: '1', action: 'Publicação Concluída', target: 'YouTube Shorts + TikTok (@TechStudioBR)', time: 'Hoje • 18:30', status: 'Sucesso', code: '200 OK' },
    { id: '2', action: 'Renderização em Lote', target: 'batch_export_reels_pack.zip (4 vídeos)', time: 'Hoje • 17:15', status: 'Concluído', code: 'GPU NVENC' },
    { id: '3', action: 'Geração de Legendas', target: 'corte_ia_01_gatilhos_mentais.mp4', time: 'Hoje • 16:40', status: 'Whisper V3', code: 'Sync 100%' },
    { id: '4', action: 'Corte de Silêncios', target: 'Master_Podcast_Ep_88_IA.mp4 (-4.2 min)', time: 'Ontem • 22:10', status: 'Removido', code: '0.4s Threshold' },
  ];

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              history
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Histórico & Logs de Pipeline</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Registro cronológico das publicações, renderizações de GPU e extrações neurais.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20 divide-y divide-[#494454]/20">
        {logs.map((log) => (
          <div key={log.id} className="py-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-[13px] font-semibold text-[#dfe2f0]">{log.action}</p>
              <p className="text-[11px] text-[#958ea0]">{log.target}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a74b]/20 text-[#4ae176]">
                {log.status}
              </span>
              <p className="text-[10px] font-mono text-[#958ea0] mt-1">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
