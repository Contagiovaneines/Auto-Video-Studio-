import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

interface LegendasAutomaticasViewProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const LegendasAutomaticasView: React.FC<LegendasAutomaticasViewProps> = ({ onShowToast }) => {
  const [model, setModel] = useState('Whisper V3 Large');
  const [language, setLanguage] = useState('Português (Brasil)');
  const [autoEmojis, setAutoEmojis] = useState(true);
  const [wordsPerLine, setWordsPerLine] = useState(3);

  const sampleWords = [
    { text: 'QUANDO', highlight: false },
    { text: 'VOCÊ', highlight: false },
    { text: 'DESCOBRE,', highlight: false },
    { text: 'ISSO', highlight: true },
    { text: 'MUDA', highlight: true },
    { text: 'TUDO!', highlight: true },
  ];

  return (
    <div className="flex flex-col w-full gap-4 text-[#dfe2f0] select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171b25] p-4 rounded-xl border border-[#494454]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#d0bcff]">
              subtitles
            </span>
            <h1 className="text-[20px] font-bold text-[#dfe2f0]">Legendas Automáticas com IA</h1>
          </div>
          <p className="text-[12px] text-[#958ea0] mt-0.5">
            Sincronização neural frame a frame com Whisper v3 e destaque cinético de palavras-chave.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Settings Panel */}
        <div className="p-4 rounded-xl bg-[#1b1f2a] border border-[#494454]/20 space-y-4">
          <h2 className="text-[14px] font-semibold text-[#dfe2f0]">Configurações da Transcrição</h2>

          <div>
            <label className="block text-[11px] font-mono text-[#958ea0] mb-1">Modelo de IA</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#171b25] border border-[#494454]/30 text-[12px] text-[#dfe2f0]"
            >
              <option value="Whisper V3 Large">Whisper V3 Large (Maior Precisão)</option>
              <option value="Whisper Turbo">Whisper Turbo (Mais Rápido)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#958ea0] mb-1">Idioma Nativo</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 rounded-lg bg-[#171b25] border border-[#494454]/30 text-[12px] text-[#dfe2f0]"
            >
              <option value="Português (Brasil)">Português (Brasil)</option>
              <option value="Inglês (US)">Inglês (US)</option>
              <option value="Espanhol">Espanhol</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-[#171b25] border border-[#494454]/20">
            <div>
              <p className="text-[12px] font-medium text-[#dfe2f0]">Inserção Automática de Emojis</p>
              <p className="text-[10px] text-[#958ea0]">Gera ícones contextuais com base em sentimento</p>
            </div>
            <input
              type="checkbox"
              checked={autoEmojis}
              onChange={(e) => setAutoEmojis(e.target.checked)}
              className="accent-[#a078ff] w-4 h-4 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#958ea0] mb-1">
              Palavras por Bloco: <span className="text-[#d0bcff] font-bold">{wordsPerLine}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={wordsPerLine}
              onChange={(e) => setWordsPerLine(Number(e.target.value))}
              className="w-full accent-[#a078ff] cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              soundFX.playDing();
              onShowToast('Transcrição Atualizada', 'Parâmetros de legenda salvos com sucesso.', 'success');
            }}
            className="w-full py-2.5 rounded-lg bg-[#a078ff] text-[#340080] font-bold text-[12px] font-mono hover:bg-[#d0bcff] transition-all cursor-pointer"
          >
            Salvar Parâmetros Globais
          </button>
        </div>

        {/* Live Subtitle Preview */}
        <div className="p-4 rounded-xl bg-[#0a0e18] border border-[#494454]/20 flex flex-col justify-between items-center text-center">
          <span className="text-[10px] font-mono text-[#958ea0] uppercase tracking-wider">
            Pré-visualização Dinâmica da Legenda
          </span>

          <div className="my-12 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-[#494454]/30 max-w-sm">
            <p className="text-[20px] font-black uppercase tracking-tight leading-snug">
              {sampleWords.map((w, idx) => (
                <span
                  key={idx}
                  className={`inline-block mr-1.5 ${
                    w.highlight
                      ? 'text-yellow-400 bg-yellow-400/20 px-1.5 py-0.5 rounded shadow-[0_0_12px_rgba(250,204,21,0.5)] animate-pulse'
                      : 'text-white'
                  }`}
                >
                  {w.text}
                </span>
              ))}
              {autoEmojis && <span className="ml-1">🔥🚀</span>}
            </p>
          </div>

          <div className="text-[11px] font-mono text-[#4ae176]">
            Latência do reconhecedor: ~120ms • Sincronismo perfeitamente alinhado
          </div>
        </div>
      </div>
    </div>
  );
};
