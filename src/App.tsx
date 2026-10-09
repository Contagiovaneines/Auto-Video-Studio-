import React, { useState, useEffect } from 'react';
import { ViewType, Project, ViralClip, ToastMessage } from './types';
import { INITIAL_PROJECTS, INITIAL_VIRAL_CLIPS } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SearchModal } from './components/modals/SearchModal';
import { NewProjectModal } from './components/modals/NewProjectModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { Toast } from './components/modals/Toast';

// Views
import { DashboardView } from './views/DashboardView';
import { CortesIaView } from './views/CortesIaView';
import { EditorNleView } from './views/EditorNleView';
import { PublicadorView } from './views/PublicadorView';
import { MeusProjetosView } from './views/MeusProjetosView';
import { BibliotecaVideosView } from './views/BibliotecaVideosView';
import { ProcessamentoLoteView } from './views/ProcessamentoLoteView';
import { TemplatesView } from './views/TemplatesView';
import { LegendasAutomaticasView } from './views/LegendasAutomaticasView';
import { CalendarioView } from './views/CalendarioView';
import { ContasConectadasView } from './views/ContasConectadasView';
import { AnalyticsView } from './views/AnalyticsView';
import { HistoricoView } from './views/HistoricoView';
import { ConfiguracoesView } from './views/ConfiguracoesView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeClip, setActiveClip] = useState<ViralClip | null>(INITIAL_VIRAL_CLIPS[0]);
  const [publisherClip, setPublisherClip] = useState<ViralClip | null>(INITIAL_VIRAL_CLIPS[0]);

  // Modals & UI states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keyboard shortcut for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    showToast('Projeto Criado', `"${newProject.title}" adicionado à workstation.`, 'success');
  };

  const handleSelectClipForEditor = (clip: ViralClip) => {
    setActiveClip(clip);
  };

  const handleSelectClipForPublisher = (clip: ViralClip) => {
    setPublisherClip(clip);
  };

  return (
    <div className="bg-[#0f131d] min-h-screen text-[#dfe2f0] antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main App Container */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Viewport Content */}
        <main className="relative pt-16 flex-1 w-full px-3 sm:px-4 lg:px-6 py-4 min-h-[calc(100vh-4rem)]">
          {currentView === 'dashboard' && (
            <DashboardView
              projects={projects}
              onNavigate={setCurrentView}
              onOpenNewProject={() => setIsNewProjectOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentView === 'cortes-com-ia' && (
            <CortesIaView
              onNavigate={setCurrentView}
              onSelectClipForEditor={handleSelectClipForEditor}
              onSelectClipForPublisher={handleSelectClipForPublisher}
              onShowToast={showToast}
            />
          )}

          {currentView === 'editor-de-videos' && (
            <EditorNleView
              activeClip={activeClip}
              onNavigate={setCurrentView}
              onShowToast={showToast}
            />
          )}

          {currentView === 'publicador-automatico' && (
            <PublicadorView
              initialClip={publisherClip}
              onNavigate={setCurrentView}
              onShowToast={showToast}
            />
          )}

          {currentView === 'meus-projetos' && (
            <MeusProjetosView
              projects={projects}
              onOpenNewProject={() => setIsNewProjectOpen(true)}
              onNavigate={setCurrentView}
              onShowToast={showToast}
            />
          )}

          {currentView === 'biblioteca-de-videos' && (
            <BibliotecaVideosView onShowToast={showToast} />
          )}

          {currentView === 'processamento-em-lote' && (
            <ProcessamentoLoteView onShowToast={showToast} />
          )}

          {currentView === 'templates' && (
            <TemplatesView onShowToast={showToast} />
          )}

          {currentView === 'legendas-automaticas' && (
            <LegendasAutomaticasView onShowToast={showToast} />
          )}

          {currentView === 'calendario' && (
            <CalendarioView onShowToast={showToast} />
          )}

          {currentView === 'contas-conectadas' && (
            <ContasConectadasView onShowToast={showToast} />
          )}

          {currentView === 'analytics' && <AnalyticsView />}

          {currentView === 'historico' && <HistoricoView />}

          {currentView === 'configuracoes' && (
            <ConfiguracoesView onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentView}
      />

      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
