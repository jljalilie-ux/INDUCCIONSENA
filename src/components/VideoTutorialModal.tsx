import React, { useEffect, useRef } from 'react';
import { X, Play, Volume2, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRegistration?: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartRegistration
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pause video when modal is closed
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Background click dismiss */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Floating Modal Window */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col z-10 max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-4.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#39A900] to-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Video Tutorial Oficial
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 inline" /> 2:44 min
                </span>
              </div>
              <h3
                id="video-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5 leading-tight"
              >
                Guía Definitiva: Plataforma de Inducción Digital SENA
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar video tutorial"
            className="w-9 h-9 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-300 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden aspect-video w-full max-h-[62vh]">
          <video
            ref={videoRef}
            src="/assets/aistudio/2026__11_51_d2eccf0a.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain focus:outline-none"
          >
            <source src="/assets/aistudio/2026__11_51_d2eccf0a.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>
        </div>

        {/* Modal Footer / Navigation Guide */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Aprende cómo registrarte, navegar los 6 módulos, presentar la evaluación y obtener tu certificado.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {onStartRegistration && (
              <button
                onClick={() => {
                  onClose();
                  onStartRegistration();
                }}
                className="px-4 py-2 bg-[#39A900] hover:bg-[#329600] text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Comenzar Registro Ahora
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
