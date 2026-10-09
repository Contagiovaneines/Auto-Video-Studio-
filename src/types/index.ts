export type ViewType = 
  | 'dashboard'
  | 'meus-projetos'
  | 'biblioteca-de-videos'
  | 'editor-de-videos'
  | 'cortes-com-ia'
  | 'processamento-em-lote'
  | 'templates'
  | 'legendas-automaticas'
  | 'publicador-automatico'
  | 'calendario'
  | 'contas-conectadas'
  | 'analytics'
  | 'historico'
  | 'configuracoes';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  resolution: string;
  fps: number;
  status: 'concluido' | 'renderizando' | 'agendado' | 'rascunho';
  statusProgress?: number;
  shortsCount: number;
  timeAgo: string;
  aspectRatio: string;
}

export interface ViralClip {
  id: string;
  title: string;
  thumbnail: string;
  score: number;
  duration: string;
  timeframe: string;
  retentionEstimate: number;
  subtitleHighlight: string;
  subtitleFull: string;
  aiRationale: string;
  category: 'reflexao' | 'dica' | 'historia';
  videoUrl?: string;
}

export interface SocialAccount {
  id: string;
  name: string;
  handle: string;
  followers: string;
  connected: boolean;
  type: 'youtube' | 'tiktok' | 'instagram' | 'facebook';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
