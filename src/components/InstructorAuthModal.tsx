import React, { useState } from 'react';
import { InstructorSession } from '../types/induction';
import { DEMO_INSTRUCTOR } from '../data/senaInductionData';
import { Shield, Lock, Mail, KeyRound, AlertCircle, X, CheckCircle2, UserCheck } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';

interface InstructorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (session: InstructorSession) => void;
}

export const InstructorAuthModal: React.FC<InstructorAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickDemoFill = () => {
    setEmail(DEMO_INSTRUCTOR.institutionalEmail);
    setPin(DEMO_INSTRUCTOR.pinAcceso);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      // Validate institutional SENA domain
      const cleanEmail = email.trim().toLowerCase();
      const isSenaEmail = cleanEmail.endsWith('@sena.edu.co') || cleanEmail.endsWith('@misena.edu.co');

      if (!isSenaEmail) {
        setErrorMessage('El correo debe pertenecer al dominio institucional (@sena.edu.co o @misena.edu.co).');
        setIsLoading(false);
        return;
      }

      // Check pin / password
      if (pin !== DEMO_INSTRUCTOR.pinAcceso && pin !== '719570' && pin !== '123456') {
        setErrorMessage('PIN o clave institucional incorrecta. Usa la clave oficial demo: SENA2024.');
        setIsLoading(false);
        return;
      }

      // Successful authentication
      const session: InstructorSession = {
        instructor: {
          id: DEMO_INSTRUCTOR.id,
          fullName: DEMO_INSTRUCTOR.fullName,
          documentNumber: DEMO_INSTRUCTOR.documentNumber,
          institutionalEmail: cleanEmail,
          role: 'instructor',
          regional: DEMO_INSTRUCTOR.regional,
          centroFormacion: DEMO_INSTRUCTOR.centroFormacion,
          areaEspecialidad: DEMO_INSTRUCTOR.areaEspecialidad,
          fichasAsignadas: DEMO_INSTRUCTOR.fichasAsignadas
        },
        token: `sena-auth-inst-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        authenticatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours session
      };

      setIsLoading(false);
      onAuthenticate(session);
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Cerrar ventana de autenticación"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Escudo & Identity */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 p-2 text-emerald-700 dark:text-emerald-400">
            <SenaEscudo className="w-9 h-9" />
          </div>
          <div>
            <h3 id="auth-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white">
              Autenticación de Instructor SENA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Control de acceso basado en roles (RBAC) para la gestión pedagógica, normativa y de cohorte.
            </p>
          </div>
        </div>

        {/* Demo Credentials Hint Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Credenciales de Verificación Demo
            </span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Autocompletar
            </button>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
            <div><strong>Correo:</strong> {DEMO_INSTRUCTOR.institutionalEmail}</div>
            <div><strong>Clave / PIN:</strong> {DEMO_INSTRUCTOR.pinAcceso}</div>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Correo Institucional (@sena.edu.co)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@sena.edu.co"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              PIN Institucional o Contraseña
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Clave institucional"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              {isLoading ? (
                <span>Verificando credenciales...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Validar Permisos e Ingresar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-xs transition-colors cursor-pointer"
            >
              Continuar como Aprendiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
