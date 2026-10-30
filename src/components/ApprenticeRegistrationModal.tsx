import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import {
  registerApprenticeInDatabase,
  checkApprenticeDuplicate,
  ApprenticeRegistrationPayload
} from '../lib/firebaseService';
import {
  Shield,
  Lock,
  User,
  FileText,
  Hash,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface ApprenticeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRegistration: (newApprentice: Apprentice) => void;
  onSelectExistingApprentice: (existingApprentice: Apprentice) => void;
}

export const ApprenticeRegistrationModal: React.FC<ApprenticeRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccessRegistration,
  onSelectExistingApprentice
}) => {
  const [fullName, setFullName] = useState('');
  const [documentType, setDocumentType] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [ficha, setFicha] = useState('2874912');
  const [email, setEmail] = useState('');
  const [consentLaw1581, setConsentLaw1581] = useState(false); // MUST BE UNCHECKED BY DEFAULT

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [duplicateApprentice, setDuplicateApprentice] = useState<Apprentice | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setDuplicateApprentice(null);

    // 1. Validaciones básicas de campos
    const cleanName = fullName.trim();
    const cleanDoc = documentNumber.trim();
    const cleanFicha = ficha.trim();

    if (cleanName.length < 3) {
      setErrorMessage('Por favor ingresa tus nombres y apellidos completos (mínimo 3 caracteres).');
      return;
    }

    if (cleanDoc.length < 4 || cleanDoc.length > 20) {
      setErrorMessage('El número de documento debe contener entre 4 y 20 caracteres.');
      return;
    }

    if (!/^[0-9a-zA-Z\-]+$/.test(cleanDoc)) {
      setErrorMessage('El número de documento contiene caracteres inválidos.');
      return;
    }

    if (cleanFicha.length < 3 || !/^[0-9]+$/.test(cleanFicha)) {
      setErrorMessage('El número de ficha debe contener únicamente números (ejemplo: 2874912).');
      return;
    }

    // 2. Validación obligatoria de consentimiento Ley 1581 de 2012
    if (!consentLaw1581) {
      setErrorMessage('Debes aceptar expresamente el Tratamiento de Datos Personales conforme a la Ley 1581 de 2012 para proceder con la inducción.');
      return;
    }

    setIsLoading(true);

    try {
      // 3. Verificación de duplicados en la base de datos Firestore
      const duplicateResult = await checkApprenticeDuplicate(documentType, cleanDoc);
      if (duplicateResult.exists && duplicateResult.existingApprentice) {
        setDuplicateApprentice(duplicateResult.existingApprentice);
        setErrorMessage(`Ya existe un aprendiz registrado con este documento (${documentType} ${cleanDoc}). Puedes continuar directamente con tu sesión.`);
        setIsLoading(false);
        return;
      }

      // 4. Registro seguro en Firestore
      const payload: ApprenticeRegistrationPayload = {
        fullName: cleanName,
        documentType,
        documentNumber: cleanDoc,
        ficha: cleanFicha,
        email: email.trim() || undefined,
        consentLaw1581: true,
        consentTimestamp: new Date().toISOString()
      };

      const created = await registerApprenticeInDatabase(payload);
      setIsLoading(false);
      onSuccessRegistration(created);
    } catch (err) {
      console.error('Error during registration:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Ocurrió un error al registrar en la base de datos. Inténtalo nuevamente.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs transition-opacity overflow-y-auto"
      >
        <div className="relative w-full max-w-xl max-h-[90vh] my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/60 dark:bg-slate-850">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-1.5 flex items-center justify-center">
                <SenaLogo className="w-8 h-8" />
              </div>
              <div>
                <h3 id="registration-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  Registro Oficial a la Inducción SENA
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ingreso seguro de aprendices · Base de datos institucional
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar formulario de registro"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-slate-700 dark:text-slate-200">
            
            {/* Error / Duplicate Notification */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-xs text-red-800 dark:text-red-300 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
                {duplicateApprentice && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectExistingApprentice(duplicateApprentice);
                      onClose();
                    }}
                    className="w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <span>Ingresar con el registro de {duplicateApprentice.fullName}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Input: Nombre Completo */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nombres y Apellidos Completos <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ejemplo: Juan Camilo Pérez Rodríguez"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Grid: Document Type + Document Number */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tipo Doc. <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="CC">Cédula (CC)</option>
                  <option value="TI">Tarjeta Identidad (TI)</option>
                  <option value="CE">Cédula Extranjería (CE)</option>
                  <option value="PEP">Permiso Especial (PEP)</option>
                </select>
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Número de Documento de Identidad <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Ejemplo: 1020304050"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Grid: Ficha + Correo opcional */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Ficha de Formación <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={ficha}
                    onChange={(e) => setFicha(e.target.value)}
                    placeholder="Ejemplo: 2874912"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all font-mono"
                  />
                </div>
              </div>

              <div className="sm:col-span-7 space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Correo Electrónico (Opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@soy.sena.edu.co"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* AVISO DE PRIVACIDAD EN ESPAÑOL - LEY 1581 DE 2012 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Aviso de Protección de Datos Personales (Ley 1581 de 2012)</span>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>¿Por qué se recolectan?</strong> Para validar tu matrícula, hacer seguimiento al avance de tu inducción de 40 horas y expedir tu constancia oficial con código de verificación.
                </p>
                <p>
                  <strong>¿Cómo se usan y quién accede?</strong> Se almacenan de forma segura con marcas de tiempo en la base de datos institucional. El acceso está restringido únicamente a ti como aprendiz titular y a los instructores autorizados de tu ficha formativa.
                </p>
                <p>
                  <strong>Tus derechos (Habeas Data):</strong> Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos mediante solicitud a <span className="font-mono text-emerald-700 dark:text-emerald-400">protecciondedatos@sena.edu.co</span> o en la coordinación de tu Centro de Formación.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Política Completa de Tratamiento de Datos</span>
                </button>
              </div>
            </div>

            {/* UNCHECKED CHECKBOX FOR EXPLICIT CONSENT */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={consentLaw1581}
                  onChange={(e) => setConsentLaw1581(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600 cursor-pointer shrink-0"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                  Autorizo de manera previa, expresa e informada al SENA para el tratamiento de mis datos personales con fines exclusivamente formativos, académicos y de certificación, conforme a la <strong>Ley 1581 de 2012</strong> y su Política de Privacidad.
                </span>
              </label>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading || !consentLaw1581}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {isLoading ? (
                  <span>Registrando en base de datos...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completar Registro e Iniciar Inducción</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Cancelar y volver
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Privacy Policy Submodal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
};
