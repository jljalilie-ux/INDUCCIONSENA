import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Cloud,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Lock,
  LogOut,
  Sparkles,
  AlertCircle,
  Unlink,
  Layers,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Apprentice } from '../types/induction';
import {
  ConnectedSheetConfig,
  getSavedSheetConfig,
  saveSheetConfig,
  signInWithGoogle,
  logoutGoogle,
  getAccessToken,
  createInductionSpreadsheet,
  syncAllCohortToSheet,
  initGoogleAuth
} from '../lib/googleSheetsService';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

interface GoogleSheetsSyncCardProps {
  cohort: Apprentice[];
  fichaDefault?: string;
  onSyncCompleted?: (count: number) => void;
}

export const GoogleSheetsSyncCard: React.FC<GoogleSheetsSyncCardProps> = ({
  cohort,
  fichaDefault = '2874912',
  onSyncCompleted
}) => {
  const [googleUser, setGoogleUser] = useState<User | null>(auth.currentUser);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [sheetConfig, setSheetConfig] = useState<ConnectedSheetConfig | null>(() => getSavedSheetConfig());
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [customFicha, setCustomFicha] = useState(fichaDefault);
  const [showManualLink, setShowManualLink] = useState(false);
  const [manualSheetId, setManualSheetId] = useState('');

  // Check auth state
  useEffect(() => {
    const unsubscribe = initGoogleAuth(
      (user, token) => {
        setGoogleUser(user);
        setHasToken(!!token);
      },
      () => {
        setGoogleUser(null);
        setHasToken(false);
      }
    );

    getAccessToken().then(tok => {
      setHasToken(!!tok);
      setGoogleUser(auth.currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setFeedback(null);
    try {
      const { user, accessToken } = await signInWithGoogle();
      setGoogleUser(user);
      setHasToken(true);
      setFeedback({
        type: 'success',
        message: `Cuenta de Google conectada (${user.email}). Ya puedes crear o sincronizar hojas.`
      });
    } catch (err: any) {
      console.error(err);
      setFeedback({
        type: 'error',
        message: err.message || 'No se pudo conectar con Google. Por favor intenta de nuevo.'
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
      setHasToken(false);
      setFeedback({
        type: 'info',
        message: 'Sesión de Google cerrada. El token ha sido removido de la memoria.'
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleCreateSheet = async () => {
    if (!hasToken) {
      await handleSignIn();
    }
    setIsCreatingSheet(true);
    setFeedback(null);
    try {
      const config = await createInductionSpreadsheet(customFicha || fichaDefault, cohort);
      setSheetConfig(config);
      setFeedback({
        type: 'success',
        message: `¡Hoja oficial creada con éxito en Google Drive con ${cohort.length} registros iniciales!`
      });
      if (onSyncCompleted) onSyncCompleted(cohort.length);
    } catch (err: any) {
      console.error(err);
      setFeedback({
        type: 'error',
        message: err.message || 'Error al crear la hoja en Google Drive.'
      });
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleSyncAllNow = async () => {
    if (!sheetConfig) return;
    if (!hasToken) {
      await handleSignIn();
    }

    setIsSyncingAll(true);
    setFeedback(null);
    try {
      const result = await syncAllCohortToSheet(sheetConfig.spreadsheetId, cohort);
      if (result.success) {
        setSheetConfig(getSavedSheetConfig());
        setFeedback({
          type: 'success',
          message: `Sincronización completada exitosamente: ${result.count} aprendices actualizados en Google Sheets.`
        });
        if (onSyncCompleted) onSyncCompleted(result.count);
      } else {
        setFeedback({
          type: 'error',
          message: result.error || 'No se pudo sincronizar la cohorte.'
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Error durante la sincronización.'
      });
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleLinkManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualSheetId.trim()) return;

    let cleanId = manualSheetId.trim();
    // Extraer ID si se pegó una URL completa de Google Sheets
    const urlMatch = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      cleanId = urlMatch[1];
    }

    const config: ConnectedSheetConfig = {
      spreadsheetId: cleanId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${cleanId}/edit`,
      title: `Hoja Vinculada SENA - Ficha ${customFicha}`,
      ficha: customFicha,
      lastSyncedAt: new Date().toISOString(),
      syncedCount: cohort.length
    };

    saveSheetConfig(config);
    setSheetConfig(config);
    setShowManualLink(false);
    setManualSheetId('');
    setFeedback({
      type: 'success',
      message: 'Hoja de Google Sheets vinculada. Haz clic en "Sincronizar Todos Ahora" para volcar la cohorte.'
    });
  };

  const handleUnlink = () => {
    if (window.confirm('¿Estás seguro de que deseas desvincular la hoja de cálculo? Los datos en tu Google Drive se conservarán intactos.')) {
      saveSheetConfig(null);
      setSheetConfig(null);
      setFeedback({
        type: 'info',
        message: 'Hoja desvinculada del panel del instructor.'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-8 transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-[#39A900] text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Sincronización en la Nube con Google Sheets
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                Google Drive API
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Guarda y actualiza continuamente registros, progreso y resultados de evaluación en vivo.
            </p>
          </div>
        </div>

        {/* Google Account Status Badge */}
        <div className="flex items-center gap-2">
          {hasToken && googleUser ? (
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[160px]">
                {googleUser.email}
              </span>
              <button
                onClick={handleSignOut}
                title="Cerrar sesión de Google"
                className="text-slate-400 hover:text-rose-500 transition-colors ml-1 p-0.5"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isAuthenticating ? 'Conectando...' : 'Conectar Google Drive'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`mt-4 p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : feedback.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
              : 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            {feedback.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            {feedback.type === 'info' && <Cloud className="w-4 h-4 text-blue-600 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="mt-5">
        {sheetConfig ? (
          /* Sincronización ACTIVA y Hoja Vinculada */
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700/80">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Sincronización en Vivo Activa
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{sheetConfig.title}</span>
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Ficha: <strong className="text-slate-700 dark:text-slate-200">{sheetConfig.ficha}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Última sincr.: {new Date(sheetConfig.lastSyncedAt).toLocaleTimeString('es-CO')}
                  </span>
                  <span>•</span>
                  <span>{cohort.length} aprendices sincronizados</span>
                </div>
              </div>

              {/* Botones de acción rápida */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <a
                  href={sheetConfig.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002235] rounded-lg shadow-sm transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en Google Drive</span>
                </a>

                <button
                  onClick={handleSyncAllNow}
                  disabled={isSyncingAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#00324D] dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                  <span>{isSyncingAll ? 'Sincronizando...' : 'Sincronizar Todos'}</span>
                </button>

                <button
                  onClick={handleUnlink}
                  title="Desvincular esta hoja"
                  className="inline-flex items-center gap-1 p-2 text-xs text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Unlink className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Micro-guía de sincronización reactiva */}
            <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Cada vez que un aprendiz se registra o termina su evaluación, la fila se actualiza automáticamente en Google Sheets y Firestore.
                </span>
              </span>
            </div>
          </div>
        ) : (
          /* Estado CERO: No hay hoja conectada aún */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opción 1: Crear Hoja Nueva Oficial */}
            <div className="border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Recomendado • Un Clic
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Crear Hoja Oficial de Inducción SENA
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Crea automáticamente un nuevo libro en tu Google Drive con encabezados institucionales verdes SENA, fórmulas de progreso y los {cohort.length} registros del cohorte actual.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Ficha Formativa:
                  </label>
                  <input
                    type="text"
                    value={customFicha}
                    onChange={(e) => setCustomFicha(e.target.value)}
                    placeholder="Ej. 2874912"
                    className="w-28 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3">
                <button
                  onClick={handleCreateSheet}
                  disabled={isCreatingSheet}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>
                    {isCreatingSheet ? 'Creando libro en Google Drive...' : 'Crear Hoja en Google Drive'}
                  </span>
                </button>
              </div>
            </div>

            {/* Opción 2: Vincular Hoja Existente */}
            <div className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Opción Avanzada
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                  Vincular Hoja Existente
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Si ya tienes una hoja en Google Drive creada previamente para esta ficha formativa, puedes conectarla mediante su enlace o identificador.
                </p>

                {showManualLink ? (
                  <form onSubmit={handleLinkManual} className="mt-3 space-y-2">
                    <input
                      type="text"
                      value={manualSheetId}
                      onChange={(e) => setManualSheetId(e.target.value)}
                      placeholder="ID o URL de Google Spreadsheet..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#00324D] text-white text-xs font-semibold rounded-lg hover:bg-[#002235]"
                      >
                        Confirmar Enlace
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowManualLink(false)}
                        className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>

              {!showManualLink && (
                <div className="mt-4 pt-3">
                  <button
                    onClick={() => setShowManualLink(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Pegar Enlace de Google Sheets</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
