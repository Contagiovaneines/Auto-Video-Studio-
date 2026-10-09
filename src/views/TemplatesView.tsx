import React from 'react';
import { soundFX } from '../utils/audio';

interface TemplatesViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onShowToast }) => {
  const templates = [
    { name: 'Alex Hormozi Bounce', category: 'Legendas Virais', colors: 'Amarelo & Verde Neon', badge: 'MAIS USADO', desc: 'Auto-highlight na palavra falada com efeito pop elástico e sombra pesada.' },
    { name: 'MrBeast Dynamic Captions', category: 'Legendas Virais', colors: 'Branco & Ciano', badge: 'HIGH RETENTION', desc: 'Fonte grossa condensada com animação rápida de rotação sutil por frase.' },
    { name: 'Podcast Dark Sleek', category: 'Layout 9:16', colors: 'Slate & Roxo', badge: 'CINEMATOGRÁFICO', desc: 'Reenquadramento de dois convidados com divisão limpa e foco facial automático.' },
    { name: 'Karaokê Glow Studio', category: 'Legendas Virais', colors: 'Violeta & Rosa', badge: 'TRENDING', desc: 'Brilho pulsante suave que acompanha a entonação vocal do orador.' },
  ];

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              dashboard_customize
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Templates Virais</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Estilos pré-configurados de legendas cinéticas, molduras 9:16 e pacotes sonoros de impacto.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[#1b1f2a] hover:bg-[#262a34] transition-all border border-[#494454]/20 flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#6001d1]/30 text-[#d2bbff] font-bold">
                  {tpl.badge}
                </span>
                <span className="text-[10px] font-mono text-[#958ea0]">{tpl.category}</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#dfe2f0]">{tpl.name}</h3>
              <p className="text-[12px] text-[#cbc3d7] mt-1">{tpl.desc}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#494454]/20">
              <span className="text-[10px] font-mono text-[#4ae176]">Cores: {tpl.colors}</span>
              <button
                onClick={() => {
                  soundFX.playDing();
                  onShowToast('Template Ativado', `O preset "${tpl.name}" foi aplicado para o editor.`, 'success');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[11px] font-mono hover:bg-[#d0bcff] transition-all cursor-pointer"
              >
                Usar Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
