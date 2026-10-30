import React from 'react';
import { Apprentice } from '../types/induction';
import { Printer, ArrowLeft, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { SenaLogo, SENA_LOGO_DATA_URI } from './SenaLogo';

interface CertificateViewProps {
  apprentice: Apprentice;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  apprentice,
  onBack
}) => {
  const currentDate = apprentice.completedAt || '27 de Octubre de 2026';
  const certCode = `SENA-IND-${apprentice.ficha}-${apprentice.documentNumber.slice(-4)}-2026`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top action controls (hidden on print) */}
      <div className="flex items-center justify-between no-print border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Inducción
        </button>

        <button
          onClick={handlePrint}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Guardar PDF
        </button>
      </div>

      {/* Official Certificate Card */}
      <div
        id="sena-certificate"
        className="bg-white border-2 border-emerald-700/60 rounded-3xl p-8 md:p-14 shadow-lg space-y-8 relative overflow-hidden max-w-4xl mx-auto"
      >
        {/* Subtle decorative background watermark border and official logo watermark */}
        <div className="absolute inset-2 border border-slate-200 rounded-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00324D]/10 rounded-tr-full pointer-events-none" />
        <img
          src={SENA_LOGO_DATA_URI}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.04] pointer-events-none select-none"
        />

        {/* Certificate Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="flex items-center justify-center mx-auto mb-2">
            <SenaLogo className="w-16 h-16 drop-shadow-sm" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#00324D]">
              Servicio Nacional de Aprendizaje - SENA
            </h2>
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              República de Colombia · Ministerio del Trabajo
            </div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest pt-2">
              Dirección de Formación Profesional Integral
            </div>
          </div>

          <div className="pt-4">
            <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Certifica que
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {apprentice.fullName}
            </h1>
            <div className="text-xs font-mono text-slate-500 mt-1">
              Identificado(a) con {apprentice.documentType} N° {apprentice.documentNumber}
            </div>
          </div>
        </div>

        {/* Main Attestation Statement */}
        <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            Ha participado y superado satisfactoriamente el programa de{' '}
            <strong className="text-slate-900">INDUCCIÓN INSTITUCIONAL INTEGRAL</strong>, demostrando
            apropiación cabal de la misión, visión, símbolos, derechos y deberes conforme al vigente Reglamento del
            Aprendiz (Acuerdo 0009 de 2024) con una calificación destacada de:
          </p>

          <div className="inline-block px-5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-extrabold text-lg md:text-xl">
            {apprentice.score || 95}% de Apropiación Demostrada
          </div>

          <div className="text-xs text-slate-600 space-y-1 pt-2">
            <div><strong>Programa de Formación:</strong> {apprentice.program}</div>
            <div><strong>Ficha de Caracterización:</strong> {apprentice.ficha}</div>
            <div><strong>Centro de Formación:</strong> {apprentice.centroFormacion}</div>
            <div><strong>Regional:</strong> {apprentice.regional}</div>
          </div>
        </div>

        {/* Signatures & Verification Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200 items-end relative z-10">
          {/* Signature 1 */}
          <div className="text-center space-y-2">
            <div className="h-10 border-b border-slate-400 max-w-[200px] mx-auto flex items-end justify-center pb-1 text-slate-400 font-mono text-[11px] italic">
              Firma Digital Certificada
            </div>
            <div className="text-xs font-bold text-slate-900">Dr. Jorge E. Mendoza V.</div>
            <div className="text-[11px] text-slate-500">Subdirector de Centro de Formación</div>
          </div>

          {/* Center Seal / QR info with official SENA logo */}
          <div className="text-center space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-lg bg-white border border-slate-300 flex items-center justify-center mx-auto p-1.5 shadow-xs">
              <SenaLogo className="w-8 h-8" />
            </div>
            <div className="text-[10px] font-mono font-bold text-slate-700">
              {certCode}
            </div>
            <div className="text-[10px] text-slate-500">
              Expedido el: {currentDate}
            </div>
          </div>

          {/* Signature 2 */}
          <div className="text-center space-y-2">
            <div className="h-10 border-b border-slate-400 max-w-[200px] mx-auto flex items-end justify-center pb-1 text-slate-400 font-mono text-[11px] italic">
              Firma Digital Certificada
            </div>
            <div className="text-xs font-bold text-slate-900">Ing. Marcela P. Silva G.</div>
            <div className="text-[11px] text-slate-500">Coordinación Misional y Académica</div>
          </div>
        </div>
      </div>
    </div>
  );
};
