import React, { useState } from 'react';
import { EVALUATION_QUESTIONS } from '../data/senaInductionData';
import { Apprentice } from '../types/induction';
import { CheckCircle2, XCircle, Award, AlertCircle, RotateCcw, ArrowRight, ShieldCheck, Printer, Check, ChevronRight } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface InteractiveEvaluationProps {
  apprentice: Apprentice;
  onUpdateApprenticeResult: (score: number, breakdown: { identidad: number; derechos: number; deberes: number; tramitesYEtapa: number }) => void;
  onViewCertificate: () => void;
}

export const InteractiveEvaluation: React.FC<InteractiveEvaluationProps> = ({
  apprentice,
  onUpdateApprenticeResult,
  onViewCertificate
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showImmediateExplanation, setShowImmediateExplanation] = useState<boolean>(true);

  const question = EVALUATION_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = userAnswers[question.id];
  const isAnswered = !!selectedAnswer;

  const handleSelectAnswer = (optionId: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < EVALUATION_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Calculate results
  const calculateResults = () => {
    let totalCorrect = 0;
    const categoryCounts: Record<string, { total: number; correct: number }> = {
      identidad: { total: 0, correct: 0 },
      derechos: { total: 0, correct: 0 },
      deberes: { total: 0, correct: 0 },
      tramitesYEtapa: { total: 0, correct: 0 }
    };

    EVALUATION_QUESTIONS.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctOptionId;
      if (isCorrect) totalCorrect++;

      if (categoryCounts[q.category]) {
        categoryCounts[q.category].total++;
        if (isCorrect) categoryCounts[q.category].correct++;
      }
    });

    const finalScore = Math.round((totalCorrect / EVALUATION_QUESTIONS.length) * 100);

    const breakdown = {
      identidad: Math.round((categoryCounts.identidad.correct / (categoryCounts.identidad.total || 1)) * 100),
      derechos: Math.round((categoryCounts.derechos.correct / (categoryCounts.derechos.total || 1)) * 100),
      deberes: Math.round((categoryCounts.deberes.correct / (categoryCounts.deberes.total || 1)) * 100),
      tramitesYEtapa: Math.round((categoryCounts.tramitesYEtapa.correct / (categoryCounts.tramitesYEtapa.total || 1)) * 100)
    };

    return { totalCorrect, finalScore, breakdown };
  };

  const handleSubmitEvaluation = () => {
    const { finalScore, breakdown } = calculateResults();
    setIsSubmitted(true);
    onUpdateApprenticeResult(finalScore, breakdown);
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  const allAnswered = EVALUATION_QUESTIONS.every(q => !!userAnswers[q.id]);
  const answeredCount = Object.keys(userAnswers).length;
  const results = isSubmitted ? calculateResults() : null;
  const isApproved = results ? results.finalScore >= 80 : false;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <SenaLogo className="w-5 h-5" />
          <span>Módulo 4 · Evaluación Interactiva de Inducción</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Evaluación de Apropiación Institucional y Normativa
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl">
          Esta prueba valida que el aprendiz comprende plenamente la identidad SENA, sus derechos, deberes y el conducto regular formativo. Puntaje mínimo de aprobación: 80% (8/10).
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main Question Stage */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            {/* Question Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {question.categoryLabel}
                </span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Pregunta {currentQuestionIndex + 1} de {EVALUATION_QUESTIONS.length}</span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${(answeredCount / EVALUATION_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium tabular-nums">
                  {answeredCount}/{EVALUATION_QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {question.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {question.options.map(option => {
                const isSelected = selectedAnswer === option.id;

                let optionStyles = 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 hover:border-emerald-400 dark:hover:border-emerald-500 text-slate-800 dark:text-slate-200';
                if (isSelected) {
                  optionStyles = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm font-medium flex items-start gap-3 cursor-pointer ${optionStyles}`}
                  >
                    <div className="w-5 h-5 rounded-md border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 uppercase text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                      {option.id}
                    </div>
                    <div className="flex-1 leading-relaxed">{option.text}</div>
                  </button>
                );
              })}
            </div>

            {/* In-Question Pedagogical Guidance (if answered and enabled) */}
            {isAnswered && showImmediateExplanation && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 rounded-xl text-xs space-y-1.5">
                <div className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  Soporte Pedagógico SENA
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {question.explanation}
                </p>
                <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-1">
                  Referencia: {question.regulatoryReference}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Anterior
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < EVALUATION_QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Siguiente
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitEvaluation}
                    disabled={!allAnswered}
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#00324D] dark:bg-emerald-600 text-white hover:bg-[#002235] dark:hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Finalizar y Calificar Inducción
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Question Matrix & Checklist */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Matriz de Preguntas
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Responde todas las preguntas para enviar la evaluación oficial.
              </p>

              <div className="grid grid-cols-5 gap-2">
                {EVALUATION_QUESTIONS.map((q, idx) => {
                  const hasAnswer = !!userAnswers[q.id];
                  const isCurrent = currentQuestionIndex === idx;

                  let boxStyles = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
                  if (isCurrent) {
                    boxStyles = 'bg-emerald-600 text-white ring-2 ring-emerald-600 font-bold';
                  } else if (hasAnswer) {
                    boxStyles = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer ${boxStyles}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 inline-block" /> Respondida
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block" /> Pendiente
                </span>
              </div>
            </div>

            {/* Learner Info Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200">Aprendiz Evaluado:</div>
              <div className="text-slate-700 dark:text-slate-300">{apprentice.fullName}</div>
              <div className="text-slate-500 dark:text-slate-400 font-mono">CC/TI: {apprentice.documentNumber}</div>
              <div className="text-slate-500 dark:text-slate-400">Ficha: {apprentice.ficha}</div>
            </div>
          </div>
        </div>
      ) : (
        /* Evaluation Results View (Reporte de Apropiación) */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-8 shadow-sm">
          {/* Result Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Resultado Oficial de Inducción
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                {isApproved ? '¡Apropiación Exitosa del Proceso de Inducción!' : 'Inducción Pendiente de Refuerzo'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {isApproved
                  ? 'Has demostrado dominio cabal de la identidad institucional, derechos, deberes y normas formativas del SENA. Tu constancia de inducción ha sido generada.'
                  : 'Has completado la evaluación pero no alcanzaste el umbral mínimo de 80%. Te recomendamos repasar los temas señalados a continuación y volver a intentar.'}
              </p>
            </div>

            {/* Score Big Display */}
            <div className={`p-6 rounded-2xl border text-center shrink-0 min-w-[180px] ${
              isApproved
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300'
            }`}>
              <div className="text-4xl md:text-5xl font-black tabular-nums">
                {results?.finalScore}%
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider mt-1">
                {isApproved ? 'Acreditado / Aprobado' : 'No Aprobado'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {results?.totalCorrect} de {EVALUATION_QUESTIONS.length} aciertos
              </div>
            </div>
          </div>

          {/* Breakdown by Dimension */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Desglose de Apropiación por Dimensiones Institucionales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Identidad Institucional</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                  {results?.breakdown.identidad}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Misión, Visión y Símbolos</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Derechos del Aprendiz</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                  {results?.breakdown.derechos}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Acuerdo 0009 - Art. 5</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Deberes y Convivencia</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                  {results?.breakdown.deberes}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Asistencia, Carné y Respeto</div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Trámites y Etapa Productiva</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                  {results?.breakdown.tramitesYEtapa}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">FPI y Alternativas Prácticas</div>
              </div>
            </div>
          </div>

          {/* Question Review Accordion / List */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">
              Revisión Detallada de Preguntas y Respuestas
            </h4>
            <div className="space-y-3">
              {EVALUATION_QUESTIONS.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctOptionId;
                const correctOpt = q.options.find(o => o.id === q.correctOptionId);
                const userOpt = q.options.find(o => o.id === userAns);

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                        </span>
                      ) : (
                        <span className="text-rose-700 font-semibold flex items-center gap-1 shrink-0">
                          <XCircle className="w-3.5 h-3.5" /> Incorrecta
                        </span>
                      )}
                    </div>

                    <div className="text-slate-600">
                      <strong>Tu respuesta:</strong> ({userAns.toUpperCase()}) {userOpt?.text}
                    </div>

                    {!isCorrect && (
                      <div className="text-emerald-800">
                        <strong>Respuesta correcta:</strong> ({q.correctOptionId.toUpperCase()}) {correctOpt?.text}
                      </div>
                    )}

                    <div className="text-slate-500 italic pt-1">
                      {q.explanation} ({q.regulatoryReference})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reintentar Evaluación
            </button>

            {isApproved && (
              <button
                onClick={onViewCertificate}
                className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Award className="w-4 h-4" />
                Ver y Descargar Certificado Oficial de Inducción
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
