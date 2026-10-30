import React from 'react';
import { Apprentice, InstructorSession, UserRole } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { Sun, Moon, Lock, LogOut, User } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeApprentice: Apprentice;
  onOpenProfile: () => void;
  role: UserRole;
  instructorSession: InstructorSession | null;
  onRequestInstructorMode: () => void;
  onSwitchToApprenticeMode: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeApprentice,
  onOpenProfile,
  role,
  instructorSession,
  onRequestInstructorMode,
  onSwitchToApprenticeMode,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16">
          
          {/* Zone 1: Brand Wordmark with official SENA logo */}
          <button
            onClick={() => onSelectTab('inicio')}
            className="flex items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md py-1 shrink-0 cursor-pointer"
          >
            <SenaLogo className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap leading-none">
                SENA Inducción
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider hidden sm:block">
                {role === 'instructor' ? 'Portal Docente FPI' : 'Portal Aprendices'}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links Tailored to Role */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {role === 'aprendiz' ? (
              <>
                <button
                  onClick={() => onSelectTab('inicio')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'inicio' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => onSelectTab('identidad')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'identidad' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Identidad
                </button>
                <button
                  onClick={() => onSelectTab('modelo_pedagogico')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'modelo_pedagogico' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Modelo FPI
                </button>
                <button
                  onClick={() => onSelectTab('derechos')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'derechos' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Derechos y Deberes
                </button>
                <button
                  onClick={() => onSelectTab('servicios')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'servicios' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Servicios al Aprendiz
                </button>
                <button
                  onClick={() => onSelectTab('casos')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'casos' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Casos Reales
                </button>
                <button
                  onClick={() => onSelectTab('evaluacion')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'evaluacion' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Evaluación
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectTab('inicio')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'inicio' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => onSelectTab('orientaciones_fpi')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'orientaciones_fpi' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Orientaciones FPI
                </button>
                <button
                  onClick={() => onSelectTab('procesos_formativos')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'procesos_formativos' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Procesos Formativos
                </button>
                <button
                  onClick={() => onSelectTab('politicas_normativa')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'politicas_normativa' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Políticas Institucionales
                </button>
                <button
                  onClick={() => onSelectTab('responsabilidades')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'responsabilidades' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Responsabilidades
                </button>
                <button
                  onClick={() => onSelectTab('recursos_didacticos')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'recursos_didacticos' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Recursos Didácticos
                </button>
                <button
                  onClick={() => onSelectTab('instructor')}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
                    currentTab === 'instructor' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500' : ''
                  }`}
                >
                  Gestión Cohorte
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Role Switcher with Auth & Profile + Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {role === 'aprendiz' ? (
              <button
                onClick={onRequestInstructorMode}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Acceso seguro para instructores (requiere autenticación institucional)"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Modo Instructor</span>
                <span className="sm:hidden">Instructor</span>
              </button>
            ) : (
              <button
                onClick={onSwitchToApprenticeMode}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg border border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                title="Cambiar a vista de aprendiz"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modo Aprendiz</span>
                <span className="sm:hidden">Aprendiz</span>
              </button>
            )}

            {/* Profile Action */}
            {role === 'aprendiz' ? (
              <button
                onClick={onOpenProfile}
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                title="Ver perfil del aprendiz y cambiar de ficha"
              >
                <span className="hidden sm:inline">{activeApprentice.fullName.split(' ')[0]}</span>
                <span className="sm:hidden"><User className="w-3.5 h-3.5 inline" /></span>
              </button>
            ) : (
              <div
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 dark:bg-emerald-700 rounded-lg whitespace-nowrap shrink-0 shadow-2xs flex items-center gap-1"
                title="Sesión de instructor activa"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 shrink-0" />
                <span className="hidden sm:inline">{instructorSession?.instructor.fullName.split(' ')[0] || 'Docente'}</span>
                <span className="sm:hidden">Docente</span>
              </div>
            )}

            {/* Theme Toggle Button with Blur Transition */}
            <button
              onClick={onToggleTheme}
              type="button"
              id="theme-toggle-button"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
            >
              {theme === 'dark' ? (
                <>
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Sun className="w-3.5 h-3.5" />
                  </span>
                  <span className="hidden md:inline">Claro</span>
                </>
              ) : (
                <>
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                    <Moon className="w-3.5 h-3.5" />
                  </span>
                  <span className="hidden md:inline">Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scrollbar */}
        <div className="flex xl:hidden items-center gap-3 py-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-300">
          {role === 'aprendiz' ? (
            <>
              <button
                onClick={() => onSelectTab('inicio')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'inicio' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Inicio
              </button>
              <button
                onClick={() => onSelectTab('identidad')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'identidad' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Identidad
              </button>
              <button
                onClick={() => onSelectTab('modelo_pedagogico')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'modelo_pedagogico' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Modelo FPI
              </button>
              <button
                onClick={() => onSelectTab('derechos')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'derechos' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Derechos
              </button>
              <button
                onClick={() => onSelectTab('servicios')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'servicios' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Servicios
              </button>
              <button
                onClick={() => onSelectTab('casos')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'casos' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Casos
              </button>
              <button
                onClick={() => onSelectTab('evaluacion')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'evaluacion' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Evaluación
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onSelectTab('inicio')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'inicio' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Inicio
              </button>
              <button
                onClick={() => onSelectTab('orientaciones_fpi')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'orientaciones_fpi' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Orientaciones FPI
              </button>
              <button
                onClick={() => onSelectTab('procesos_formativos')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'procesos_formativos' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Procesos
              </button>
              <button
                onClick={() => onSelectTab('politicas_normativa')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'politicas_normativa' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Políticas
              </button>
              <button
                onClick={() => onSelectTab('responsabilidades')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'responsabilidades' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Responsabilidades
              </button>
              <button
                onClick={() => onSelectTab('recursos_didacticos')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'recursos_didacticos' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Recursos
              </button>
              <button
                onClick={() => onSelectTab('instructor')}
                className={`whitespace-nowrap px-2 py-1 rounded-md transition-colors ${currentTab === 'instructor' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : ''}`}
              >
                Gestión Cohorte
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
