import React from 'react';
import { ToastMessage } from '../../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1b1f2a] border border-[#a078ff]/40 text-[#dfe2f0] p-3 rounded-lg shadow-2xl flex items-start gap-3 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="w-7 h-7 rounded-full bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[16px]">
              {toast.type === 'error' ? 'error' : toast.type === 'warning' ? 'warning' : 'check_circle'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-semibold text-[#dfe2f0] leading-tight">
              {toast.title}
            </h4>
            <p className="text-[11px] text-[#cbc3d7] mt-0.5 leading-snug">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#958ea0] hover:text-[#dfe2f0] p-1 rounded"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
