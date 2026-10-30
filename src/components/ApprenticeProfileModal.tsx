import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { User, CheckCircle2, Clock, Award, Shield } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeApprentice: Apprentice;
  allCohort: Apprentice[];
  onSelectApprentice: (apprentice: Apprentice) => void;
  onSaveApprenticeDetails: (updated: Apprentice) => void;
}

export const ApprenticeProfileModal: React.FC<ApprenticeProfileModalProps> = ({
  isOpen,
  onClose,
  activeApprentice,
  allCohort,
  onSelectApprentice,
  onSaveApprenticeDetails
}) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activeApprentice.fullName);
  const [doc, setDoc] = useState(activeApprentice.documentNumber);
  const [phone, setPhone] = useState(activeApprentice.phone);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApprenticeDetails({
      ...activeApprentice,
      fullName: name,
      documentNumber: doc,
      phone: phone
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-6 border border-slate-200 dark:border-slate-800 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-7 h-7" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Perfil del Aprendiz SENA</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sesión activa de inducción</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Current Apprentice Summary */}
        {!isEditing ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-750 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{activeApprentice.fullName}</span>
                {activeApprentice.status === 'aprobado' ? (
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Acreditado ({activeApprentice.score}%)
                  </span>
                ) : activeApprentice.status === 'en_progreso' ? (
                  <span className="font-semibold text-amber-700">En curso</span>
                ) : (
                  <span className="text-slate-500">Sin iniciar</span>
                )}
              </div>
              <div className="text-slate-600">
                <strong>Documento:</strong> {activeApprentice.documentType} {activeApprentice.documentNumber}
              </div>
              <div className="text-slate-600">
                <strong>Correo:</strong> {activeApprentice.email}
              </div>
              <div className="text-slate-600">
                <strong>Programa:</strong> {activeApprentice.program}
              </div>
              <div className="text-slate-600">
                <strong>Ficha:</strong> {activeApprentice.ficha}
              </div>
              <div className="text-slate-600">
                <strong>Centro:</strong> {activeApprentice.centroFormacion}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                Editar información personal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Documento</label>
              <input
                type="text"
                value={doc}
                onChange={e => setDoc(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}

        {/* Quick Apprentice Switcher */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Simular otro aprendiz de la cohorte
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allCohort.map(a => (
              <button
                key={a.id}
                onClick={() => {
                  onSelectApprentice(a);
                  setIsEditing(false);
                  setName(a.fullName);
                  setDoc(a.documentNumber);
                  setPhone(a.phone);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  activeApprentice.id === a.id
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div>{a.fullName}</div>
                  <div className="text-[11px] text-slate-400 font-normal">{a.documentType} {a.documentNumber}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {a.status === 'aprobado' ? `${a.score}%` : a.status === 'en_progreso' ? 'En curso' : 'Pendiente'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
