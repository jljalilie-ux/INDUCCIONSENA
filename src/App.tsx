/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Apprentice, InstructorSession, UserRole } from './types/induction';
import { INITIAL_COHORT } from './data/senaInductionData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InstitutionalModule } from './components/InstitutionalModule';
import { RightsDutiesModule } from './components/RightsDutiesModule';
import { DilemmasSimulator } from './components/DilemmasSimulator';
import { InteractiveEvaluation } from './components/InteractiveEvaluation';
import { CertificateView } from './components/CertificateView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { ApprenticeTrainingModel } from './components/ApprenticeTrainingModel';
import { ApprenticeServicesModule } from './components/ApprenticeServicesModule';
import { InstructorPedagogyModule } from './components/InstructorPedagogyModule';
import { InstructorAuthModal } from './components/InstructorAuthModal';
import { ApprenticeRegistrationModal } from './components/ApprenticeRegistrationModal';
import { SenaLogo } from './components/SenaLogo';
import {
  subscribeToApprentices,
  updateApprenticeProgressInDatabase,
  registerApprenticeInDatabase,
  deleteApprenticeFromDatabase
} from './lib/firebaseService';
import { testFirestoreConnection } from './lib/firebase';
import { getSavedSheetConfig, syncApprenticeToSheet } from './lib/googleSheetsService';

export default function App() {
  // Primary database state: Synced in real-time from Cloud Firestore
  const [cohort, setCohort] = useState<Apprentice[]>(() => {
    const saved = localStorage.getItem('sena_induction_cohort_cache');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached cohort:', e);
      }
    }
    return INITIAL_COHORT;
  });

  const [activeApprenticeId, setActiveApprenticeId] = useState<string>(() => {
    const saved = localStorage.getItem('sena_induction_active_app_v1');
    return saved || 'app-004';
  });

  // Persistent role state: 'aprendiz' | 'instructor'
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('sena_induction_role');
    if (savedRole === 'instructor' || savedRole === 'aprendiz') return savedRole;
    return 'aprendiz';
  });

  // Persistent authenticated instructor session (security & RBAC)
  const [instructorSession, setInstructorSession] = useState<InstructorSession | null>(() => {
    const savedSession = localStorage.getItem('sena_instructor_session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        if (parsed.expiresAt && new Date(parsed.expiresAt) > new Date()) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse instructor session:', e);
      }
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // Theme state with local storage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sena_induction_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  // 1. Initialize Firestore Realtime Subscription as Primary Database
  useEffect(() => {
    testFirestoreConnection().catch(console.warn);

    const unsubscribe = subscribeToApprentices(
      (updatedList) => {
        if (updatedList && updatedList.length > 0) {
          setCohort(updatedList);
          localStorage.setItem('sena_induction_cohort_cache', JSON.stringify(updatedList));
        }
      },
      (err) => {
        console.warn('Real-time connection warning:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('sena_induction_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Sync persistent role
  useEffect(() => {
    localStorage.setItem('sena_induction_role', role);
  }, [role]);

  // Sync active apprentice ID
  useEffect(() => {
    localStorage.setItem('sena_induction_active_app_v1', activeApprenticeId);
  }, [activeApprenticeId]);

  // Blur transition handler when toggling theme
  const handleToggleTheme = () => {
    setIsBlurTransitioning(true);
    setTimeout(() => {
      setTheme(prev => {
        const nextTheme = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('sena_induction_theme', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
        return nextTheme;
      });
    }, 180);

    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 550);
  };

  const activeApprentice = cohort.find(a => a.id === activeApprenticeId) || cohort[0];

  // RBAC Authentication Handler
  const handleRequestInstructorMode = () => {
    if (instructorSession && new Date(instructorSession.expiresAt) > new Date()) {
      setRole('instructor');
      setCurrentTab('inicio');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthenticateInstructor = (session: InstructorSession) => {
    setInstructorSession(session);
    localStorage.setItem('sena_instructor_session', JSON.stringify(session));
    setRole('instructor');
    setIsAuthModalOpen(false);
    setCurrentTab('inicio');
  };

  const handleSwitchToApprenticeMode = () => {
    setRole('aprendiz');
    setCurrentTab('inicio');
  };

  // Update apprentice evaluation score & progress in Firestore database
  const handleUpdateApprenticeResult = async (
    score: number,
    breakdown: { identidad: number; derechos: number; deberes: number; tramitesYEtapa: number }
  ) => {
    const isApproved = score >= 80;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updates = {
      score,
      status: (isApproved ? 'aprobado' : 'en_progreso') as 'aprobado' | 'en_progreso',
      completedAt: isApproved ? formattedDate : activeApprentice.completedAt,
      attemptsCount: (activeApprentice.attemptsCount || 0) + 1,
      categoryBreakdown: breakdown,
      inductionProgress: isApproved ? 100 : Math.max(activeApprentice.inductionProgress || 0, score),
      updatedAt: now.toISOString()
    };

    // Optimistic UI update
    setCohort(prev => prev.map(a => a.id === activeApprentice.id ? { ...a, ...updates } : a));

    // Primary Database persistence in Firestore
    try {
      await updateApprenticeProgressInDatabase(activeApprentice.id, updates);
    } catch (err) {
      console.error('Error persisting evaluation result to Firestore:', err);
    }

    // Sincronización continua con la hoja de Google Sheets en Google Drive
    const sheetConfig = getSavedSheetConfig();
    if (sheetConfig?.spreadsheetId) {
      const mergedApprentice: Apprentice = { ...activeApprentice, ...updates };
      syncApprenticeToSheet(sheetConfig.spreadsheetId, mergedApprentice).catch((err) => {
        console.warn('Sincronización en segundo plano con Google Sheets pendiente:', err);
      });
    }
  };

  // Add new apprentice from Instructor Dashboard directly to Firestore
  const handleAddNewApprentice = async (newApprenticeData: Omit<Apprentice, 'id' | 'attemptsCount'>) => {
    try {
      const created = await registerApprenticeInDatabase({
        fullName: newApprenticeData.fullName,
        documentType: newApprenticeData.documentType,
        documentNumber: newApprenticeData.documentNumber,
        ficha: newApprenticeData.ficha,
        email: newApprenticeData.email,
        phone: newApprenticeData.phone,
        program: newApprenticeData.program,
        regional: newApprenticeData.regional,
        centroFormacion: newApprenticeData.centroFormacion,
        consentLaw1581: true,
        consentTimestamp: new Date().toISOString()
      });

      setActiveApprenticeId(created.id);

      // Sincronizar en Google Sheets
      const sheetConfig = getSavedSheetConfig();
      if (sheetConfig?.spreadsheetId) {
        syncApprenticeToSheet(sheetConfig.spreadsheetId, created).catch(console.warn);
      }
    } catch (err) {
      console.error('Error adding apprentice to Firestore:', err);
      alert(err instanceof Error ? err.message : 'Error al registrar aprendiz en la base de datos.');
    }
  };

  // Delete apprentice record from Firestore (role-protected for instructors)
  const handleDeleteApprentice = async (apprenticeId: string) => {
    try {
      await deleteApprenticeFromDatabase(apprenticeId);
      if (activeApprenticeId === apprenticeId) {
        const remaining = cohort.filter(a => a.id !== apprenticeId);
        if (remaining.length > 0) {
          setActiveApprenticeId(remaining[0].id);
        }
      }
    } catch (err) {
      console.error('Error deleting apprentice from Firestore:', err);
    }
  };

  // Update profile details in Firestore
  const handleSaveApprenticeDetails = async (updated: Apprentice) => {
    setCohort(prev => prev.map(a => a.id === updated.id ? updated : a));
    try {
      await updateApprenticeProgressInDatabase(updated.id, {
        fullName: updated.fullName,
        email: updated.email,
        phone: updated.phone,
        ficha: updated.ficha
      });

      // Sincronizar actualización en Google Sheets si está vinculada
      const sheetConfig = getSavedSheetConfig();
      if (sheetConfig?.spreadsheetId) {
        syncApprenticeToSheet(sheetConfig.spreadsheetId, updated).catch(console.warn);
      }
    } catch (err) {
      console.error('Error updating details in Firestore:', err);
    }
  };

  // Callback when a student completes official registration
  const handleSuccessRegistration = (newApp: Apprentice) => {
    setActiveApprenticeId(newApp.id);
    setIsRegistrationModalOpen(false);
    setCurrentTab('identidad'); // Guide them directly to start the induction!

    // Sincronización en vivo con Google Sheets en Google Drive
    const sheetConfig = getSavedSheetConfig();
    if (sheetConfig?.spreadsheetId) {
      syncApprenticeToSheet(sheetConfig.spreadsheetId, newApp).catch((err) => {
        console.warn('Sincronización de registro con Google Sheets en segundo plano:', err);
      });
    }
  };

  const handleSelectExistingApprentice = (existingApp: Apprentice) => {
    setActiveApprenticeId(existingApp.id);
    setIsRegistrationModalOpen(false);
    setCurrentTab('inicio');
  };

  // Cohort analytics for instructor overview
  const cohortAnalytics = {
    total: cohort.length,
    aprobados: cohort.filter(a => a.status === 'aprobado').length,
    enProgreso: cohort.filter(a => a.status === 'en_progreso').length
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] dark:bg-[#0B131E] text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-400 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Theme Blur Overlay */}
      {isBlurTransitioning && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none theme-blur-overlay"
        />
      )}

      {/* Top Bar with dynamic role links and authentication trigger */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        activeApprentice={activeApprentice}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        role={role}
        instructorSession={instructorSession}
        onRequestInstructorMode={handleRequestInstructorMode}
        onSwitchToApprenticeMode={handleSwitchToApprenticeMode}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Stage */}
      <main className={`max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 blur-page-transition ${isBlurTransitioning ? 'is-blurring' : ''}`}>
        
        {/* TAB: Inicio (Role-Tailored Landing Page with Registration CTA) */}
        {currentTab === 'inicio' && (
          <HeroSection
            apprentice={activeApprentice}
            role={role}
            instructorSession={instructorSession}
            cohortCount={cohortAnalytics}
            onStartLearning={() => setCurrentTab('identidad')}
            onStartQuiz={() => setCurrentTab('evaluacion')}
            onViewCertificate={() => setCurrentTab('certificado')}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onOpenRegistration={() => setIsRegistrationModalOpen(true)}
            onRequestInstructorMode={handleRequestInstructorMode}
            onSwitchToApprenticeMode={handleSwitchToApprenticeMode}
          />
        )}

        {/* ================================================================= */}
        {/* APPRENTICE MODULES                                                */}
        {/* ================================================================= */}
        {currentTab === 'identidad' && (
          <InstitutionalModule />
        )}

        {currentTab === 'modelo_pedagogico' && (
          <ApprenticeTrainingModel
            onGoToRights={() => setCurrentTab('derechos')}
            onGoToEvaluation={() => setCurrentTab('evaluacion')}
          />
        )}

        {currentTab === 'derechos' && (
          <RightsDutiesModule />
        )}

        {currentTab === 'servicios' && (
          <ApprenticeServicesModule />
        )}

        {currentTab === 'casos' && (
          <DilemmasSimulator />
        )}

        {currentTab === 'evaluacion' && (
          <InteractiveEvaluation
            apprentice={activeApprentice}
            onUpdateApprenticeResult={handleUpdateApprenticeResult}
            onViewCertificate={() => setCurrentTab('certificado')}
          />
        )}

        {currentTab === 'certificado' && (
          <CertificateView
            apprentice={activeApprentice}
            onBack={() => setCurrentTab('evaluacion')}
          />
        )}

        {/* ================================================================= */}
        {/* INSTRUCTOR MODULES                                                */}
        {/* ================================================================= */}
        {currentTab === 'orientaciones_fpi' && (
          <InstructorPedagogyModule
            initialTab="orientaciones"
            onNavigateToCohort={() => setCurrentTab('instructor')}
          />
        )}

        {currentTab === 'procesos_formativos' && (
          <InstructorPedagogyModule
            initialTab="procesos"
            onNavigateToCohort={() => setCurrentTab('instructor')}
          />
        )}

        {currentTab === 'politicas_normativa' && (
          <InstructorPedagogyModule
            initialTab="politicas"
            onNavigateToCohort={() => setCurrentTab('instructor')}
          />
        )}

        {currentTab === 'responsabilidades' && (
          <InstructorPedagogyModule
            initialTab="responsabilidades"
            onNavigateToCohort={() => setCurrentTab('instructor')}
          />
        )}

        {currentTab === 'recursos_didacticos' && (
          <InstructorPedagogyModule
            initialTab="recursos"
            onNavigateToCohort={() => setCurrentTab('instructor')}
          />
        )}

        {currentTab === 'instructor' && (
          <InstructorDashboard
            cohort={cohort}
            onSelectApprentice={(app) => {
              setActiveApprenticeId(app.id);
              setCurrentTab('inicio');
              setRole('aprendiz');
            }}
            onAddNewApprentice={handleAddNewApprentice}
            onDeleteApprentice={handleDeleteApprentice}
            onViewCertificateOf={(app) => {
              setActiveApprenticeId(app.id);
              setCurrentTab('certificado');
            }}
          />
        )}
      </main>

      {/* Apprentice Registration Modal with Ley 1581 and Duplicate Prevention */}
      <ApprenticeRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSuccessRegistration={handleSuccessRegistration}
        onSelectExistingApprentice={handleSelectExistingApprentice}
      />

      {/* Apprentice Profile & Cohort Switching Modal */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        activeApprentice={activeApprentice}
        allCohort={cohort}
        onSelectApprentice={(app) => {
          setActiveApprenticeId(app.id);
        }}
        onSaveApprenticeDetails={handleSaveApprenticeDetails}
      />

      {/* Instructor Institutional Authentication Modal (RBAC Security) */}
      <InstructorAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateInstructor}
      />

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 no-print py-6 mt-12 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <SenaLogo className="w-5 h-5" />
            <span className="font-bold text-slate-700 dark:text-slate-200">SENA Inducción Integral</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz (Acuerdo 0009 de 2024 - Vigente)</span>
            <span aria-hidden="true">·</span>
            <span>Ley 1581 de 2012 (Habeas Data)</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {role === 'instructor' ? 'Perfil Docente FPI' : 'Perfil Aprendiz'}
            </span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Base de datos Firestore sincronizada en tiempo real · SENA Colombia
          </div>
        </div>
      </footer>
    </div>
  );
}
