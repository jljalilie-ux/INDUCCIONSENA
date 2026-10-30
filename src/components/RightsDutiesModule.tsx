import React, { useState } from 'react';
import { DERECHOS_APRENDIZ, DEBERES_APRENDIZ } from '../data/senaInductionData';
import { Scale, CheckCircle2, AlertTriangle, Search, FileText, HelpCircle, ShieldAlert } from 'lucide-react';

export const RightsDutiesModule: React.FC = () => {
  const [viewMode, setViewMode] = useState<'derechos' | 'deberes' | 'prohibiciones' | 'debido_proceso'>('derechos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredDerechos = DERECHOS_APRENDIZ.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeberes = DEBERES_APRENDIZ.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Módulo 2 · Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024 - Vigente)
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Derechos, Deberes y Debido Proceso Formativo
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl">
          El Reglamento del Aprendiz adoptado mediante el <strong>Acuerdo 0009 de 2024</strong> es la norma institucional vigente que rige la convivencia armónica, las libertades académicas, los compromisos éticos y el debido proceso en las etapas lectiva y productiva.
        </p>

        {/* Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-850 rounded-xl border border-transparent dark:border-slate-800">
            <button
              onClick={() => { setViewMode('derechos'); setSelectedItemIndex(null); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'derechos' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos (Art. 5)
            </button>
            <button
              onClick={() => { setViewMode('deberes'); setSelectedItemIndex(null); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'deberes' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes (Art. 8)
            </button>
            <button
              onClick={() => { setViewMode('prohibiciones'); setSelectedItemIndex(null); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'prohibiciones' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prohibiciones (Art. 9)
            </button>
            <button
              onClick={() => { setViewMode('debido_proceso'); setSelectedItemIndex(null); }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                viewMode === 'debido_proceso' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Comité y Debido Proceso
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar artículo o norma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* View: Derechos */}
      {viewMode === 'derechos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Mostrando {filteredDerechos.length} de {DERECHOS_APRENDIZ.length} derechos reglamentarios</span>
            <span>Haz clic en cualquier derecho para expandir su fundamento normativo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDerechos.map((d, index) => {
              const isSelected = selectedItemIndex === index;
              return (
                <div
                  key={d.num}
                  onClick={() => setSelectedItemIndex(isSelected ? null : index)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0">
                        {d.num}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{d.title}</h4>
                    </div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold shrink-0">Derecho</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {d.desc}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px] text-slate-400">{d.article}</span>
                    <span className="text-emerald-700 font-medium">
                      {isSelected ? 'Ocultar detalle' : 'Ver detalle'}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-700 space-y-1">
                      <div className="font-semibold text-emerald-900">Aplicación práctica en el SENA:</div>
                      <p>
                        Este derecho garantiza que ningún instructor o directivo pueda limitar arbitrariamente tu proceso formativo. Si se presenta alguna vulneración, tienes derecho a solicitar acompañamiento al Coordinador Académico o al Representante de Aprendices.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View: Deberes */}
      {viewMode === 'deberes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mostrando {filteredDeberes.length} de {DEBERES_APRENDIZ.length} deberes fundamentales</span>
            <span>El incumplimiento de deberes da lugar a medidas formativas o procesos disciplinarios</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeberes.map((d, index) => {
              const isSelected = selectedItemIndex === index;
              return (
                <div
                  key={d.num}
                  onClick={() => setSelectedItemIndex(isSelected ? null : index)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                        {d.num}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{d.title}</h4>
                    </div>
                    <span className="text-xs text-amber-700 font-semibold shrink-0">Deber</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {d.desc}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px] text-slate-400">{d.article}</span>
                    <span className="text-amber-800 font-medium">
                      {isSelected ? 'Ocultar detalle' : 'Ver alcance'}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-amber-200 text-xs text-slate-700 space-y-1">
                      <div className="font-semibold text-amber-900">Conducta esperada del Aprendiz:</div>
                      <p>
                        El porte adecuado del carné es obligatorio para el control de acceso en portería por seguridad de toda la comunidad. Recuerda reportar cualquier novedad en Sofia Plus / Zajuna de manera inmediata.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View: Prohibiciones y Faltas */}
      {viewMode === 'prohibiciones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Faltas Leves</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Incumplimientos esporádicos en puntualidad, no portar el carné visible u olvido involuntario de elementos de protección sin poner en riesgo la integridad colectiva.
              </p>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                Medida: Llamado de atención verbal o plan concertado de mejoramiento formativo.
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Faltas Graves</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reincidencia en faltas leves, plagio comprobado de evidencias, agresiones verbales o daño culposo a la maquinaria o sistemas de información institucional.
              </p>
              <div className="text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                Medida: Condicionamiento de matrícula y acta de compromiso ante el Comité.
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Faltas Gravísimas</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ingreso o porte de armas, comercialización de estupefacientes o licor, agresión física, hurto comprobado o falsedad en documento público para matricularse.
              </p>
              <div className="text-xs font-semibold text-rose-700 pt-2 border-t border-slate-100">
                Sanción: Cancelación definitiva de matrícula e inhabilidad hasta por 3 años.
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
              <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              Prohibiciones Expresas (Artículo 9 - Acuerdo 0009 de 2024)
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-slate-600 dark:text-slate-300 pt-1">
              <li>Plagiar material o copiar trabajos de otros aprendices o internet.</li>
              <li>Ingresar bajo el efecto de bebidas embriagantes o sustancias psicoactivas.</li>
              <li>Fumar o vapear dentro de las instalaciones del centro de formación.</li>
              <li>Comercializar bienes o servicios dentro del centro sin autorización expresa.</li>
              <li>Suplantar a otro aprendiz en listas de asistencia, plataformas o exámenes.</li>
              <li>Utilizar el nombre o imagen del SENA para actividades políticas o con ánimo de lucro particular.</li>
            </ul>
          </div>
        </div>
      )}

      {/* View: Comité y Debido Proceso */}
      {viewMode === 'debido_proceso' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Garantía Constitucional y Legal
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Ruta del Debido Proceso y Comité de Evaluación y Seguimiento
            </h3>
            <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
              En el SENA nadie puede ser sancionado sin haber sido escuchado previamente en descargos y habérsele garantizado el derecho de defensa y contradicción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-700">Paso 01</div>
              <h5 className="font-bold text-slate-900 text-sm">Informe de Novedad</h5>
              <p className="text-xs text-slate-600">
                El instructor o miembro de la comunidad radica el reporte con pruebas documentales y testimoniales.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-700">Paso 02</div>
              <h5 className="font-bold text-slate-900 text-sm">Citación a Comité</h5>
              <p className="text-xs text-slate-600">
                Se notifica al aprendiz formalmente con mínimo 3 días hábiles de anticipación indicando los hechos.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-700">Paso 03</div>
              <h5 className="font-bold text-slate-900 text-sm">Sesión y Descargos</h5>
              <p className="text-xs text-slate-600">
                El aprendiz asiste con el vocero de la ficha, expone sus argumentos y aporta pruebas en su defensa.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-700">Paso 04</div>
              <h5 className="font-bold text-slate-900 text-sm">Recomendación y Recurso</h5>
              <p className="text-xs text-slate-600">
                El Comité recomienda una medida al Subdirector del Centro. El aprendiz tiene derecho al recurso de reposición.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
