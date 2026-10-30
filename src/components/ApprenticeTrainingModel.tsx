import React, { useState } from 'react';
import { MODELO_PEDAGOGICO_DATA } from '../data/senaInductionData';
import { Brain, Wrench, User, Users, CheckCircle2, Target, ArrowRight, Lightbulb } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeTrainingModelProps {
  onGoToRights?: () => void;
  onGoToEvaluation?: () => void;
}

export const ApprenticeTrainingModel: React.FC<ApprenticeTrainingModelProps> = ({
  onGoToRights,
  onGoToEvaluation
}) => {
  const [activeTab, setActiveTab] = useState<'pilares' | 'proyecto' | 'competencias'>('pilares');
  const [selectedPilarId, setSelectedPilarId] = useState<string>('pilar-1');

  const pilarIcons: Record<string, React.ReactNode> = {
    'pilar-1': <Brain className="w-6 h-6" />,
    'pilar-2': <Wrench className="w-6 h-6" />,
    'pilar-3': <User className="w-6 h-6" />,
    'pilar-4': <Users className="w-6 h-6" />
  };

  const selectedPilar = MODELO_PEDAGOGICO_DATA.pilares.find(p => p.id === selectedPilarId) || MODELO_PEDAGOGICO_DATA.pilares[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Formación Integral · Aprendiz SENA
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          {MODELO_PEDAGOGICO_DATA.titulo}
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          {MODELO_PEDAGOGICO_DATA.definicion}
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('pilares')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'pilares'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            Los 4 Pilares del Saber
          </button>
          <button
            onClick={() => setActiveTab('proyecto')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'proyecto'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            Fases del Proyecto Formativo
          </button>
          <button
            onClick={() => setActiveTab('competencias')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'competencias'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            Enfoque por Competencias
          </button>
        </div>
      </div>

      {/* View: 4 Pilares */}
      {activeTab === 'pilares' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-3">
            {MODELO_PEDAGOGICO_DATA.pilares.map((p) => {
              const isSelected = p.id === selectedPilarId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPilarId(p.id)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {pilarIcons[p.id]}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">{p.dimensión}</div>
                    <div className="text-sm font-bold">{p.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400">
                <Target className="w-4 h-4" />
                <span>Dimensión: {selectedPilar.dimensión}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {selectedPilar.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedPilar.desc}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  ¿Cómo lo aplicas en tu formación?
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  En el SENA no memorizas teoría aislada: desarrollas proyectos reales guiados por instructores expertos donde integras la destreza técnica con la responsabilidad social y ética.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Modelo FPI · Estatuto Formativo SENA</span>
              {onGoToRights && (
                <button
                  onClick={onGoToRights}
                  className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Conocer Derechos del Aprendiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View: Fases del Proyecto Formativo */}
      {activeTab === 'proyecto' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Estrategia Pedagógica Central:</strong> En todos los programas del SENA el aprendizaje se organiza en torno a un Proyecto Formativo articulado en 4 fases progresivas.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODELO_PEDAGOGICO_DATA.fasesProyecto.map((f, i) => (
              <div
                key={i}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                    ETAPA 0{i + 1}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {f.fase}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-0.5">Entregable Típico:</span>
                  <span className="text-slate-500 dark:text-slate-400">{f.entregable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View: Enfoque por Competencias */}
      {activeTab === 'competencias' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
              01
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Saber (Cognitivo)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Apropiación de conceptos, normas técnicas, fundamentos científicos, leyes y principios que sustentan la profesión.
            </p>
            <div className="text-xs text-slate-400">Evaluado en: Evidencias de Conocimiento</div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              02
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Saber Hacer (Procedimental)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Capacidad de ejecutar tareas prácticas, operar tecnología, resolver problemas técnicos y entregar productos funcionales de alta calidad.
            </p>
            <div className="text-xs text-slate-400">Evaluado en: Evidencias de Desempeño y Producto</div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              03
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Saber Ser (Actitudinal)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compromiso ético, honestidad, puntualidad, empatía, cuidado ambiental y convivencia pacífica bajo el Acuerdo 0009 de 2024.
            </p>
            <div className="text-xs text-slate-400">Evaluado en: Convivencia y Actitud Formativa</div>
          </div>
        </div>
      )}
    </div>
  );
};
