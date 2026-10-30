import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { SenaEscudo } from './SenaEscudo';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-1.5 flex items-center justify-center">
              <SenaEscudo className="w-7 h-7" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Política de Tratamiento de Datos Personales
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                Servicio Nacional de Aprendizaje (SENA) · Ley Estatutaria 1581 de 2012
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar ventana de política de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Compromiso Institucional de Protección de Datos (Habeas Data)</span>
            </div>
            <p>
              El SENA, entidad pública de orden nacional identificada con NIT 899.999.034-1, en cumplimiento de la Ley 1581 de 2012 y el Decreto Reglamentario 1377 de 2013, garantiza la confidencialidad, integridad y seguridad de los datos suministrados por los aprendices durante su proceso formativo.
            </p>
          </div>

          {/* Section 1: Finalidad */}
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-mono text-xs">1</span>
              ¿Por qué y para qué recolectamos sus datos? (Finalidad)
            </h4>
            <p>
              Los datos recolectados (Nombres y Apellidos, Tipo y Número de Documento, Ficha de Formación) son necesarios y proporcionales para los siguientes fines exclusivos:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Identificar plenamente al aprendiz en los ambientes de formación y plataformas digitales (SofiaPlus y Zajuna LMS).</li>
              <li>Registrar el cumplimiento de la ruta pedagógica de inducción institucional (40 horas de formación integral).</li>
              <li>Almacenar de forma segura el puntaje de la evaluación de apropiación y expedir la constancia institucional oficial con firma y código de verificación.</li>
              <li>Consolidar reportes analíticos de asistencia y estado académico para el equipo de instructores y la Coordinación Académica del Centro.</li>
            </ul>
          </section>

          {/* Section 2: Uso y Acceso */}
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-mono text-xs">2</span>
              ¿Cómo se utilizan y quién tiene acceso a sus datos?
            </h4>
            <p>
              Los registros se almacenan en una base de datos segura en la nube con cifrado y marcas de tiempo. El acceso está restringido bajo estrictos permisos basados en roles (RBAC):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>El Aprendiz Titular:</strong> Puede consultar en todo momento su progreso, resultados y descargar su certificado.</li>
              <li><strong>Instructores Asignados:</strong> Tienen acceso autenticado mediante credenciales institucionales verificadas para revisar el estado del grupo y orientar planes de mejoramiento.</li>
              <li><strong>Terceros no autorizados:</strong> El SENA <strong>no comercializa ni cede</strong> sus datos a terceros bajo ninguna circunstancia.</li>
            </ul>
          </section>

          {/* Section 3: Menores de edad */}
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-mono text-xs">3</span>
              Tratamiento de Datos de Menores de Edad (Tarjeta de Identidad - TI)
            </h4>
            <p>
              De conformidad con el Artículo 7 de la Ley 1581 de 2012 y el Artículo 12 del Decreto 1377 de 2013, el tratamiento de datos personales de aprendices menores de edad responderá y respetará el interés superior de los niños, niñas y adolescentes, y asegurará el respeto de sus derechos fundamentales, orientándose estrictamente a su proceso educativo y formativo.
            </p>
          </section>

          {/* Section 4: Derechos ARCO */}
          <section className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 flex items-center justify-center font-mono text-xs">4</span>
              ¿Cómo ejercer sus derechos de Habeas Data?
            </h4>
            <p>
              Como titular de sus datos personales, usted tiene derecho en cualquier momento a:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente al SENA.</li>
              <li><strong>Solicitar prueba</strong> de la autorización otorgada para su tratamiento.</li>
              <li><strong>Revocar la autorización o solicitar la supresión</strong> del dato cuando no medie un deber legal o contractual de permanecer en la base de datos institucional.</li>
              <li><strong>Canales de atención:</strong> Para ejercer estos derechos, puede radicar su solicitud ante la Oficina de Gestión Documental de su Centro de Formación o escribir al correo electrónico oficial: <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">protecciondedatos@sena.edu.co</span> o a través de la plataforma web oficial <span className="font-mono">www.sena.edu.co</span>.</li>
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Marco Legal: Ley 1581 de 2012 · Decreto 1377 de 2013
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
