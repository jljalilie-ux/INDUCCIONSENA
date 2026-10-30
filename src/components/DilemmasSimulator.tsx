import React, { useState } from 'react';
import { PRACTICAL_DILEMMAS } from '../data/senaInductionData';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

export const DilemmasSimulator: React.FC = () => {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const dilemma = PRACTICAL_DILEMMAS[currentDilemmaIndex];
  const selectedChoiceId = selectedChoices[dilemma.id];
  const hasAnswered = !!selectedChoiceId;
  const isOptimal = dilemma.choices.find(c => c.id === selectedChoiceId)?.isOptimal;

  const handleSelect = (choiceId: string) => {
    if (showFeedback[dilemma.id]) return;
    setSelectedChoices(prev => ({ ...prev, [dilemma.id]: choiceId }));
    setShowFeedback(prev => ({ ...prev, [dilemma.id]: true }));
  };

  const handleResetCurrent = () => {
    setSelectedChoices(prev => {
      const copy = { ...prev };
      delete copy[dilemma.id];
      return copy;
    });
    setShowFeedback(prev => {
      const copy = { ...prev };
      delete copy[dilemma.id];
      return copy;
    });
  };

  const answeredCount = Object.keys(showFeedback).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Módulo 3 · Simulador de Dilemas Prácticos
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Situaciones Cotidianas del Aprendiz SENA
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl">
          Pon a prueba tu criterio ante escenarios reales que vivirás en tu centro de formación. Aprende cuál es la conducta ética y el conducto regular según el Reglamento del Aprendiz.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2">
            {PRACTICAL_DILEMMAS.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => setCurrentDilemmaIndex(idx)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentDilemmaIndex === idx
                    ? 'bg-emerald-600 text-white'
                    : showFeedback[d.id]
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Caso 0{idx + 1}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Resueltos: {answeredCount} de {PRACTICAL_DILEMMAS.length} casos
          </span>
        </div>
      </div>

      {/* Interactive Case Canvas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              {dilemma.category}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{dilemma.title}</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Caso {currentDilemmaIndex + 1} de {PRACTICAL_DILEMMAS.length}
          </span>
        </div>

        {/* Situation narrative */}
        <div className="p-4 md:p-5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-750 text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed">
          <div className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-1">
            Situación planteada
          </div>
          "{dilemma.situation}"
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            ¿Qué decisión debes tomar según la normativa institucional?
          </div>

          {dilemma.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const feedbackActive = showFeedback[dilemma.id];

            let buttonStyle = 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800';
            if (feedbackActive) {
              if (choice.isOptimal) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
              } else if (isSelected && !choice.isOptimal) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
            }

            return (
              <div key={choice.id} className="space-y-2">
                <button
                  onClick={() => handleSelect(choice.id)}
                  disabled={feedbackActive}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm font-medium flex items-start gap-3 cursor-pointer ${buttonStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {feedbackActive ? (
                      choice.isOptimal ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">{choice.text}</div>
                </button>

                {/* Feedback disclosure */}
                {feedbackActive && isSelected && (
                  <div className={`p-4 rounded-xl text-xs space-y-1 ${
                    choice.isOptimal
                      ? 'bg-emerald-50/70 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/70 border border-rose-200 text-rose-900'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {choice.isOptimal ? 'Evaluación Positiva:' : 'Orientación Formativa:'}
                    </div>
                    <p className="leading-relaxed">{choice.feedback}</p>
                    <div className="pt-2 font-mono text-[11px] text-slate-500">
                      Fundamento: {choice.legalArticle}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {showFeedback[dilemma.id] ? (
            <button
              onClick={handleResetCurrent}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reintentar este caso
            </button>
          ) : (
            <span className="text-xs text-slate-400">Selecciona una opción para ver la justificación</span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDilemmaIndex(prev => Math.max(0, prev - 1))}
              disabled={currentDilemmaIndex === 0}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 cursor-pointer"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentDilemmaIndex(prev => Math.min(PRACTICAL_DILEMMAS.length - 1, prev + 1))}
              disabled={currentDilemmaIndex === PRACTICAL_DILEMMAS.length - 1}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#00324D] text-white hover:bg-[#002235] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              Siguiente Caso
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
