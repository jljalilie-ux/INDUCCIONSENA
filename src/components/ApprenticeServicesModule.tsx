import React, { useState } from 'react';
import { SERVICIOS_BIENESTAR_DATA } from '../data/senaInductionData';
import { Heart, Search, ExternalLink, ShieldCheck, Award, Briefcase, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const ApprenticeServicesModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICIOS_BIENESTAR_DATA[0].id);

  const filteredServices = SERVICIOS_BIENESTAR_DATA.filter(s =>
    s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedService = SERVICIOS_BIENESTAR_DATA.find(s => s.id === selectedServiceId) || SERVICIOS_BIENESTAR_DATA[0];

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Servicios y Apoyos Institucionales · SENA
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Bienestar al Aprendiz y Servicios de Apoyo
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Como aprendiz SENA tienes derecho a programas integrales de bienestar: apoyos económicos, orientación psicosocial, monitorías académicas, intermediación laboral gratuita e impulso a emprendimientos.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por apoyo, salud, empleo, monitoría..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Services Grid & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* List of Services */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredServices.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-slate-900 dark:text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide block">
                    {service.area}
                  </span>
                  <span className="text-sm font-bold block mt-0.5">
                    {service.titulo}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-emerald-600' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Service Detail Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 text-emerald-600" />
                <span>{selectedService.area}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                {selectedService.titulo}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedService.descripcion}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                Beneficio Principal para el Aprendiz:
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {selectedService.beneficio}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-2">
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ¿Cómo y dónde solicitar este servicio?
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200">
                {selectedService.canal}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Resolución de Bienestar al Aprendiz · SENA Colombia</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">Acceso 100% Gratuito</span>
          </div>
        </div>

      </div>
    </div>
  );
};
