import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import {
  Search,
  Plus,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  Award,
  Eye,
  FileSpreadsheet,
  Trash2,
  ShieldCheck,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { GoogleSheetsSyncCard } from './GoogleSheetsSyncCard';

interface InstructorDashboardProps {
  cohort: Apprentice[];
  onSelectApprentice: (apprentice: Apprentice) => void;
  onAddNewApprentice: (apprentice: Omit<Apprentice, 'id' | 'attemptsCount'>) => Promise<void> | void;
  onDeleteApprentice?: (apprenticeId: string) => Promise<void> | void;
  onViewCertificateOf: (apprentice: Apprentice) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  cohort,
  onSelectApprentice,
  onAddNewApprentice,
  onDeleteApprentice,
  onViewCertificateOf
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aprobado' | 'en_progreso' | 'no_iniciado'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // New apprentice form state
  const [formData, setFormData] = useState({
    fullName: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE' | 'PEP',
    documentNumber: '',
    email: '',
    phone: '',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Distrito Capital',
    centroFormacion: 'Centro de Tecnologías para la Construcción y la Madera',
    status: 'no_iniciado' as const
  });

  // Analytics
  const total = cohort.length;
  const aprobados = cohort.filter(a => a.status === 'aprobado').length;
  const enProgreso = cohort.filter(a => a.status === 'en_progreso').length;
  const noIniciados = cohort.filter(a => a.status === 'no_iniciado').length;

  const testedCohort = cohort.filter(a => a.score !== undefined);
  const averageScore = testedCohort.length > 0
    ? Math.round(testedCohort.reduce((acc, curr) => acc + (curr.score || 0), 0) / testedCohort.length)
    : 0;

  const filteredCohort = cohort.filter(a => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      a.fullName.toLowerCase().includes(term) ||
      a.documentNumber.includes(term) ||
      a.ficha.includes(term) ||
      a.email.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'todos' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = [
      'Nombre Completo',
      'Tipo Doc',
      'Numero Documento',
      'Ficha',
      'Programa',
      'Estado',
      'Puntaje (%)',
      'Intentos',
      'Fecha Registro',
      'Fecha Culminacion',
      'Consentimiento Ley 1581'
    ];
    const rows = cohort.map(a => [
      `"${a.fullName}"`,
      a.documentType,
      a.documentNumber,
      a.ficha,
      `"${a.program}"`,
      a.status,
      a.score ?? 'N/A',
      a.attemptsCount,
      `"${a.createdAt ?? 'N/A'}"`,
      `"${a.completedAt ?? 'Pendiente'}"`,
      a.consentLaw1581 ? 'Aceptado' : 'Pendiente'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Reporte_Induccion_Ficha_${cohort[0]?.ficha || '2874912'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.documentNumber) return;

    await onAddNewApprentice({
      ...formData,
      status: 'no_iniciado',
      consentLaw1581: true,
      consentTimestamp: new Date().toISOString()
    });

    setFormData({
      fullName: '',
      documentType: 'CC',
      documentNumber: '',
      email: '',
      phone: '',
      program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      ficha: '2874912',
      regional: 'Regional Distrito Capital',
      centroFormacion: 'Centro de Tecnologías para la Construcción y la Madera',
      status: 'no_iniciado'
    });

    setIsModalOpen(false);
  };

  const handleDelete = async (appId: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el registro de ${name} de la base de datos? Esta acción es irreversible.`)) {
      return;
    }
    if (onDeleteApprentice) {
      setIsDeletingId(appId);
      try {
        await onDeleteApprentice(appId);
      } finally {
        setIsDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Gestión de Cohorte · Base de Datos Oficial SENA
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3">
            <SenaLogo className="w-9 h-9 shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Panel de Control de Aprendices e Inducción
              </h2>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Ficha 2874912 · ADSO · Registros seguros con cumplimiento Ley 1581 de 2012
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Inscribir Aprendiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-2xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Total Matriculados</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{total}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">En base de datos Firestore</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-2xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Inducción Aprobada</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">{aprobados}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {total > 0 ? Math.round((aprobados / total) * 100) : 0}% apropiación total
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-2xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>En Proceso / Refuerzo</span>
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 tabular-nums">{enProgreso}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Requieren acompañamiento</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-1 shadow-2xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Promedio Evaluación</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{averageScore}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Sobre aprendices evaluados</div>
        </div>
      </div>

      {/* Google Sheets & Google Drive Live Sync Card */}
      <GoogleSheetsSyncCard cohort={cohort} fichaDefault={cohort[0]?.ficha || '2874912'} />

      {/* Cohort Search and Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 md:p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
            <button
              onClick={() => setStatusFilter('todos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'todos' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todos ({total})
            </button>
            <button
              onClick={() => setStatusFilter('aprobado')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'aprobado' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Aprobados ({aprobados})
            </button>
            <button
              onClick={() => setStatusFilter('en_progreso')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'en_progreso' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              En Curso ({enProgreso})
            </button>
            <button
              onClick={() => setStatusFilter('no_iniciado')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'no_iniciado' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Pendientes ({noIniciados})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento o ficha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Apprentice Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-semibold border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento / Ficha</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Examen (%)</th>
                <th className="py-3 px-4">Habeas Data (Ley 1581)</th>
                <th className="py-3 px-4">Registro / Culminación</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCohort.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                    No se encontraron aprendices con ese criterio de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredCohort.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{app.fullName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      <div>{app.documentType} {app.documentNumber}</div>
                      <div className="text-[11px] text-slate-400">Ficha: {app.ficha}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {app.status === 'aprobado' ? (
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Aprobado
                        </span>
                      ) : app.status === 'en_progreso' ? (
                        <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 shrink-0" /> En curso
                        </span>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">Pendiente</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold tabular-nums">
                      {app.score !== undefined ? (
                        <span className={app.score >= 80 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700'}>
                          {app.score}%
                        </span>
                      ) : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.consentLaw1581 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Autorizado</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px]">
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      <div>Reg: {app.createdAt ? app.createdAt.substring(0, 10) : 'Pre-cargado'}</div>
                      <div>Fin: {app.completedAt || 'En curso'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => onSelectApprentice(app)}
                        className="px-2.5 py-1 text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors cursor-pointer"
                        title="Simular vista como este aprendiz"
                      >
                        Ver Perfil
                      </button>
                      {app.status === 'aprobado' && (
                        <button
                          onClick={() => onViewCertificateOf(app)}
                          className="px-2.5 py-1 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 rounded-lg font-medium transition-colors cursor-pointer"
                          title="Ver certificado generado"
                        >
                          Certificado
                        </button>
                      )}
                      {onDeleteApprentice && (
                        <button
                          onClick={() => handleDelete(app.id, app.fullName)}
                          disabled={isDeletingId === app.id}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar de la base de datos"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Enroll New Apprentice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <SenaLogo className="w-6 h-6" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Inscribir Aprendiz en Base de Datos
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNew} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nombre Completo del Aprendiz</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Daniel Alberto Morales Castro"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tipo Doc</label>
                  <select
                    value={formData.documentType}
                    onChange={e => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="CE">CE</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Número de Documento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 1023456789"
                    value={formData.documentNumber}
                    onChange={e => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="aprendiz@soy.sena.edu.co"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Número Celular</label>
                  <input
                    type="text"
                    placeholder="300 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Ficha</label>
                  <input
                    type="text"
                    value={formData.ficha}
                    onChange={e => setFormData({ ...formData, ficha: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-[11px] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>El registro incluirá consentimiento para la Ley 1581 de 2012 y se guardará de forma persistente en Firestore.</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm cursor-pointer"
                >
                  Guardar en Base de Datos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
