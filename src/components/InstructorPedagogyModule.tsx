import React, { useState } from 'react';
import { INSTRUCTOR_CONTENT } from '../data/senaInductionData';
import {
  Compass,
  FileCheck,
  Shield,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface InstructorPedagogyModuleProps {
  initialTab?: 'orientaciones' | 'procesos' | 'politicas' | 'responsabilidades' | 'recursos';
  onNavigateToCohort?: () => void;
}

export const InstructorPedagogyModule: React.FC<InstructorPedagogyModuleProps> = ({
  initialTab = 'orientaciones',
  onNavigateToCohort
}) => {
  const [activeTab, setActiveTab] = useState<'orientaciones' | 'procesos' | 'politicas' | 'responsabilidades' | 'recursos'>(initialTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Formación Profesional Integral · Rol Docente
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Ecosistema Pedagógico y de Gestión para Instructores
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Guía metodológica, normativa y de recursos formativos diseñada para orientar la labor del instructor SENA en concordancia con el Estatuto de la FPI y el Acuerdo 0009 de 2024.
        </p>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('orientaciones')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orientaciones'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Orientaciones Pedagógicas FPI</span>
          </button>

          <button
            onClick={() => setActiveTab('procesos')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'procesos'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Procesos Formativos</span>
          </button>

          <button
            onClick={() => setActiveTab('politicas')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'politicas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Políticas Institucionales</span>
          </button>

          <button
            onClick={() => setActiveTab('responsabilidades')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'responsabilidades'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Responsabilidades Docentes</span>
          </button>

          <button
            onClick={() => setActiveTab('recursos')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recursos'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Recursos Didácticos</span>
          </button>
        </div>
      </div>

      {/* 1. Orientaciones Pedagógicas FPI */}
      {activeTab === 'orientaciones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSTRUCTOR_CONTENT.orientacionesFpi.map((ori) => (
              <div
                key={ori.id}
                className="p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {ori.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ori.summary}
                </p>
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide block">
                    Criterios de Aplicación Práctica:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {ori.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                ¿Deseas gestionar el rendimiento de tu ficha activa?
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Consulta matriculados, calificaciones y seguimiento a casos de refuerzo.
              </div>
            </div>
            {onNavigateToCohort && (
              <button
                onClick={onNavigateToCohort}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shrink-0"
              >
                Ir a Gestión de Cohorte
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Procesos Formativos */}
      {activeTab === 'procesos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSTRUCTOR_CONTENT.procesosFormativos.map((proc) => (
            <div
              key={proc.id}
              className="p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {proc.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {proc.summary}
              </p>
              <div className="pt-2 space-y-2.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide block">
                  Flujo de Ejecución Oficial:
                </span>
                <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {proc.pasos.map((paso, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Políticas Institucionales */}
      {activeTab === 'politicas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSTRUCTOR_CONTENT.politicasInstitucionales.map((pol) => (
              <div
                key={pol.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {pol.title}
                  </h4>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    Rol: {pol.rolInstructor}
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {pol.claves.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Responsabilidades Docentes */}
      {activeTab === 'responsabilidades' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <strong>Garantía de Calidad y Transparencia:</strong> Las responsabilidades docentes aseguran el cumplimiento del Acuerdo 0009 de 2024 y protegen el derecho del aprendiz a una formación oportuna y motivante.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INSTRUCTOR_CONTENT.responsabilidadesDocentes.map((resp, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">{resp.norma}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                    {resp.plazo}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {resp.detalle}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Impacto Institucional:</strong> {resp.impacto}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Recursos Didácticos */}
      {activeTab === 'recursos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSTRUCTOR_CONTENT.recursosDidacticos.map((rec, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                    {rec.tipo}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {rec.formato}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {rec.nombre}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rec.descripcion}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Formato oficial SIGA SENA</span>
                <button
                  onClick={() => alert(`Descarga iniciada: ${rec.nombre}`)}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Obtener Plantilla</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
