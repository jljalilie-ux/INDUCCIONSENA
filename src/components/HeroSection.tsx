import React, { useState } from 'react';
import { Apprentice, InstructorSession, UserRole } from '../types/induction';
import {
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
  Clock,
  ShieldCheck,
  Scale,
  Users,
  Check,
  ChevronRight,
  GraduationCap,
  Sparkles,
  FileText,
  UserCheck,
  Compass,
  FileCheck,
  Shield,
  Download,
  AlertCircle,
  ExternalLink,
  Lock,
  LogOut,
  FolderOpen,
  Play
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';
import { REGLAMENTO_VIGENTE, INSTITUTIONAL_INFO } from '../data/senaInductionData';
import { VideoTutorialModal } from './VideoTutorialModal';

interface HeroSectionProps {
  apprentice: Apprentice;
  role: UserRole;
  instructorSession: InstructorSession | null;
  cohortCount?: { total: number; aprobados: number; enProgreso: number };
  onStartLearning: () => void;
  onStartQuiz: () => void;
  onViewCertificate: () => void;
  onNavigateToTab?: (tab: string) => void;
  onOpenProfile?: () => void;
  onOpenRegistration?: () => void;
  onRequestInstructorMode: () => void;
  onSwitchToApprenticeMode: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  apprentice,
  role,
  instructorSession,
  cohortCount = { total: 6, aprobados: 3, enProgreso: 2 },
  onStartLearning,
  onStartQuiz,
  onViewCertificate,
  onNavigateToTab,
  onOpenProfile,
  onOpenRegistration,
  onRequestInstructorMode,
  onSwitchToApprenticeMode
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('cap1');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const selectedChapter = REGLAMENTO_VIGENTE.capitulos.find(c => c.id === selectedChapterId) || REGLAMENTO_VIGENTE.capitulos[0];

  const handleNavigate = (tab: string) => {
    if (onNavigateToTab) {
      onNavigateToTab(tab);
    } else if (tab === 'identidad') {
      onStartLearning();
    } else if (tab === 'evaluacion') {
      onStartQuiz();
    } else if (tab === 'certificado') {
      onViewCertificate();
    }
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Role Switch Banner / Quick Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
            role === 'instructor'
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
          }`}>
            {role === 'instructor' ? 'INS' : 'APR'}
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Vista personalizada activa:</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {role === 'instructor' ? 'Modo Instructor · Coordinación y Docencia' : 'Modo Aprendiz · Formación Profesional Integral'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {role === 'aprendiz' ? (
            <button
              onClick={onRequestInstructorMode}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso para Instructores</span>
            </button>
          ) : (
            <button
              onClick={onSwitchToApprenticeMode}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Volver a Modo Aprendiz</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROLE: APRENDIZ LANDING PAGE                                               */}
      {/* ========================================================================= */}
      {role === 'aprendiz' && (
        <>
          {/* Hero Main Stage */}
          <section aria-labelledby="hero-title" className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xs transition-colors duration-300">
              
              {/* Copy, Primary CTAs & Active Apprentice Context */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <SenaLogo className="w-8 h-8" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Servicio Nacional de Aprendizaje · SENA Colombia
                    </span>
                    <span className="text-slate-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Acuerdo 0009 de 2024 Vigente
                    </span>
                  </div>

                  <h1
                    id="hero-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.15]"
                    style={{ textWrap: 'balance' }}
                  >
                    Bienvenido al SENA: Construye tu futuro con excelencia y liderazgo
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Apropia los valores, símbolos institucionales, derechos, deberes y servicios de bienestar bajo el vigente Reglamento del Aprendiz. Supera la evaluación interactiva para validar tu inducción y obtener tu constancia oficial.
                  </p>
                </div>

                {/* Apprentice Context Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-bold text-sm shrink-0">
                        {apprentice.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{apprentice.fullName}</span>
                          <span className="text-xs text-slate-400 font-mono">Ficha {apprentice.ficha}</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs sm:max-w-md">
                          {apprentice.program} · {apprentice.centroFormacion}
                        </div>
                      </div>
                    </div>

                    {onOpenProfile && (
                      <button
                        onClick={onOpenProfile}
                        className="self-start sm:self-center px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Gestionar Aprendiz
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400">Estado de Inducción:</span>
                      {apprentice.status === 'aprobado' ? (
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 inline" /> Aprobado ({apprentice.score}% de apropiación)
                        </span>
                      ) : apprentice.status === 'en_progreso' ? (
                        <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                          <Clock className="w-4 h-4 inline" /> En curso ({apprentice.score ? `${apprentice.score}%` : 'Evaluación pendiente'})
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-600 dark:text-slate-400">
                          Pendiente por iniciar
                        </span>
                      )}
                    </div>

                    <div className="text-slate-500 dark:text-slate-400">
                      {apprentice.completedAt ? `Completado: ${apprentice.completedAt}` : 'Progreso en etapa inicial'}
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Call to Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {onOpenRegistration && (
                    <button
                      onClick={onOpenRegistration}
                      className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Registrarme a la Inducción</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  )}

                  {/* Video Tutorial Button */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="px-5 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-750 border-2 border-emerald-500/70 hover:border-emerald-600 dark:border-emerald-500/60 dark:hover:border-emerald-400 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer group min-h-[44px]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#39A900] group-hover:bg-[#329600] text-white flex items-center justify-center shadow-xs transition-colors shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>video Tutorial</span>
                  </button>

                  <button
                    onClick={onStartLearning}
                    className="px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Ruta de Inducción</span>
                  </button>

                  <button
                    onClick={onStartQuiz}
                    className="px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Evaluación</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('servicios')}
                    className="px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <span>Servicios al Aprendiz</span>
                  </button>
                </div>

                {/* Privacy Guarantee Banner (Ley 1581 de 2012) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Tratamiento seguro de datos en base de datos oficial bajo la <strong>Ley 1581 de 2012</strong> (Habeas Data Colombia).
                  </span>
                </div>
              </div>

              {/* Hero Visual Image */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden min-h-[300px] lg:h-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-end group">
                  <img
                    src="/src/assets/images/hero_sena_induction_1793115127665.jpg"
                    alt="Aprendices SENA en ambiente de formación tecnológica"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                  {/* Floating Play Overlay Badge on Hero Image */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#39A900] text-white backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer group/btn"
                    title="Reproducir video tutorial"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover/btn:text-white" />
                    <span>Ver Tutorial</span>
                  </button>

                  <div className="relative z-10 p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-1.5 flex items-center justify-center shadow-md shrink-0">
                        <SenaEscudo className="w-7 h-7" />
                      </div>
                      <div className="text-white">
                        <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                          Formación Profesional Integral
                        </div>
                        <div className="text-sm font-bold tracking-tight">
                          {INSTITUTIONAL_INFO.foundedYear} · {INSTITUTIONAL_INFO.name}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed">
                      "Invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Apprentice 4-Metric Strip */}
          <section aria-label="Indicadores del aprendiz" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Intensidad Horaria</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">40 Horas</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Etapa inicial de inducción</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Umbral de Aprobación</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">80% Mínimo</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">8 de 10 preguntas evaluadas</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Reglamento Vigente</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Acuerdo 0009</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">5 Capítulos normativos (2024)</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Certificación Oficial</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Digital & QR</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Constancia inmediata de aprobación</p>
            </div>
          </section>

          {/* Apprentice Induction Roadmap */}
          <section aria-labelledby="roadmap-title" className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Ruta Formativa del Aprendiz
              </div>
              <h2 id="roadmap-title" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Ecosistema de Módulos y Recursos para el Aprendiz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1: Identidad */}
              <div
                onClick={() => handleNavigate('identidad')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Identidad, Símbolos e Himno
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Historia de 1957, el fundador Rodolfo Martínez Tono, los tres sectores en el escudo y reproductor del himno.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Explorar módulo</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Card 2: Modelo Pedagógico */}
              <div
                onClick={() => handleNavigate('modelo_pedagogico')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Modelo Pedagógico FPI
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Los 4 pilares (Aprender a Aprender, Hacer, Ser, Convivir) y las 4 fases del Proyecto Formativo.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Ver pilares y fases</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Card 3: Derechos y Deberes */}
              <div
                onClick={() => handleNavigate('derechos')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Derechos y Deberes (Acuerdo 0009)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Los 10 derechos reglamentarios, deberes éticos, prohibiciones y alternativas de la etapa productiva.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Consultar normativa</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Card 4: Servicios de Bienestar */}
              <div
                onClick={() => handleNavigate('servicios')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Servicios al Aprendiz
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Apoyos de sostenimiento, monitorías, orientación psicológica, Agencia Pública de Empleo y bibliotecas.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Conocer beneficios</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Card 5: Casos Reales */}
              <div
                onClick={() => handleNavigate('casos')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Simulador de Casos Reales
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Resolución de dilemas éticos cotidianos: justificación médica, honestidad académica y vocería.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Resolver dilemas</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Card 6: Evaluación & Certificación */}
              <div
                onClick={() => handleNavigate('evaluacion')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Evaluación y Certificado
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cuestionario interactivo con retroalimentación inmediata y constancia oficial descargable.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Iniciar prueba</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ========================================================================= */}
      {/* ROLE: INSTRUCTOR LANDING PAGE                                             */}
      {/* ========================================================================= */}
      {role === 'instructor' && (
        <>
          {/* Instructor Hero Stage */}
          <section aria-labelledby="instructor-hero-title" className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xs transition-colors">
              
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <SenaLogo className="w-8 h-8" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Coordinación Académica · Formación Profesional Integral
                    </span>
                    <span className="text-slate-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">|</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Estatuto FPI · Decreto 249 de 2004
                    </span>
                  </div>

                  <h1
                    id="instructor-hero-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.15]"
                    style={{ textWrap: 'balance' }}
                  >
                    Portal de Inducción Docente: Liderazgo Pedagógico y Calidad
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Herramientas de mediación pedagógica, seguimiento a la cohorte y gobernanza institucional bajo el Acuerdo 0009 de 2024. Acompaña a tus aprendices con rigor técnico, calidez humana y estricto respeto al debido proceso.
                  </p>
                </div>

                {/* Active Instructor Session Details Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {instructorSession?.instructor.fullName.split(' ').map(n => n[0]).slice(0, 2).join('') || 'IR'}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{instructorSession?.instructor.fullName || 'Carlos Alberto Restrepo'}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200/80 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-medium">
                            Instructor Titular
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {instructorSession?.instructor.institutionalEmail || 'instructor.fpi@sena.edu.co'} · {instructorSession?.instructor.centroFormacion || 'Centro de Tecnologías'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavigate('instructor')}
                      className="self-start sm:self-center px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      Panel de Ficha
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Total Cohorte:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{cohortCount.total} Aprendices</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Aprobados:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{cohortCount.aprobados} ({cohortCount.total > 0 ? Math.round((cohortCount.aprobados / cohortCount.total) * 100) : 0}%)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-[11px]">En Seguimiento:</span>
                      <span className="font-bold text-amber-700 dark:text-amber-400">{cohortCount.enProgreso}</span>
                    </div>
                  </div>
                </div>

                {/* Instructor Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => handleNavigate('instructor')}
                    className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Users className="w-4 h-4" />
                    <span>Gestión de Cohorte</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  {/* Video Tutorial Button for Instructor */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="px-5 py-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-750 border-2 border-emerald-500/70 hover:border-emerald-600 dark:border-emerald-500/60 dark:hover:border-emerald-400 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer group min-h-[44px]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#39A900] group-hover:bg-[#329600] text-white flex items-center justify-center shadow-xs transition-colors shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span>video Tutorial</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('orientaciones_fpi')}
                    className="px-5 py-3.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Orientaciones Pedagógicas FPI</span>
                  </button>

                  <button
                    onClick={() => handleNavigate('recursos_didacticos')}
                    className="px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Recursos Didácticos</span>
                  </button>
                </div>
              </div>

              {/* Instructor Hero Visual Banner */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden min-h-[300px] lg:h-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-end">
                  <img
                    src="/src/assets/images/sena_campus_life_1793115127466.jpg"
                    alt="Ambiente formativo y docente SENA"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                  <div className="relative z-10 p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-1.5 flex items-center justify-center shadow-md shrink-0">
                        <SenaEscudo className="w-7 h-7" />
                      </div>
                      <div className="text-white">
                        <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                          Comunidad Docente SENA
                        </div>
                        <div className="text-sm font-bold tracking-tight">
                          Mediación Pedagógica FPI
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed">
                      "El instructor SENA es un líder transformador que orienta el aprendizaje autónomo y promueve la excelencia integral de sus aprendices."
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Instructor 4-Metric Strip */}
          <section aria-label="Compromisos docentes" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Tiempo de Calificación</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">5 Días Hábiles</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Plazo máximo reglamentario (Art. 5)</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Inducción de Ficha</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">40 Horas</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ruta metodológica obligatoria</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Garantía Normativa</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Debido Proceso</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Comités y planes de mejoramiento</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Guías de Aprendizaje</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">GFPI-F-135</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Estructura normalizada SIGA</p>
            </div>
          </section>

          {/* Instructor Core Modules Grid */}
          <section aria-labelledby="instructor-modules-title" className="space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Ecosistema Docente
              </div>
              <h2 id="instructor-modules-title" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Herramientas y Recursos Formativos para el Instructor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Module 1: Orientaciones FPI */}
              <div
                onClick={() => handleNavigate('orientaciones_fpi')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Orientaciones Pedagógicas FPI
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Estatuto FPI, enfoque de competencias laborales, resultados de aprendizaje (RAP) y proyectos formativos.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Abrir orientaciones</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Module 2: Procesos Formativos */}
              <div
                onClick={() => handleNavigate('procesos_formativos')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Procesos Formativos
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ruta de inducción institucional (40 horas) y acompañamiento a etapa productiva (formato GFPI-F-023).
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Ver flujo de procesos</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Module 3: Políticas Institucionales */}
              <div
                onClick={() => handleNavigate('politicas_normativa')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Políticas & Normativa
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Aplicación del Acuerdo 0009 de 2024 en comités de evaluación, sistema SIGA y código de integridad.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Consultar políticas</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Module 4: Responsabilidades Docentes */}
              <div
                onClick={() => handleNavigate('responsabilidades')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Responsabilidades Docentes
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Plazos de calificación (5 días), planes de mejoramiento, control de asistencia y plataformas LMS.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Ver compromisos</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Module 5: Recursos Didácticos */}
              <div
                onClick={() => handleNavigate('recursos_didacticos')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-400 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Recursos Didácticos
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Plantillas de Guía de Aprendizaje (GFPI-F-135), rúbricas, banco de proyectos e ingreso a Zajuna LMS.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Obtener recursos</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Module 6: Panel de Cohorte */}
              <div
                onClick={() => handleNavigate('instructor')}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Gestión de la Cohorte
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Listado de aprendices, estado de aprobación, registro de nuevos ingresos y exportación en archivo CSV.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>Abrir panel de ficha</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 5. ACUERDO 0009 DE 2024: 5 CHAPTERS REGULATION EXPLORER (Shared Contextual Explorer) */}
      <section aria-labelledby="regulation-explorer" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Estructura Legal Oficial
              </span>
            </div>
            <h3 id="regulation-explorer" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {REGLAMENTO_VIGENTE.acuerdo}
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {role === 'instructor' ? 'Referencia obligatoria para la práctica docente' : 'Tus derechos y deberes durante toda tu formación'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          <div className="lg:col-span-5 flex flex-col gap-2">
            {REGLAMENTO_VIGENTE.capitulos.map((cap) => {
              const isSelected = cap.id === selectedChapterId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setSelectedChapterId(cap.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{cap.title}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="text-xs font-mono font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                Detalle del Capítulo
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedChapter.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedChapter.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {role === 'instructor' ? 'Enfoque Docente · Procedimiento Disciplinario' : 'Reglamento del Aprendiz SENA · Edición 2024'}
              </span>
              <button
                onClick={() => handleNavigate(role === 'instructor' ? 'politicas_normativa' : 'derechos')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
              >
                {role === 'instructor' ? 'Ver en Políticas Institucionales' : 'Abrir en Módulo de Derechos'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ventana Flotante: Video Tutorial con Controles */}
      <VideoTutorialModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartRegistration={onOpenRegistration}
      />
    </div>
  );
};
