import React, { useState } from 'react';
import { INSTITUTIONAL_INFO, SYMBOLS, HIMNO_VERSES } from '../data/senaInductionData';
import { Shield, Flag, Compass, Music, Volume2, Play, Pause, RotateCcw, Check, Heart, Sparkles, Building2, Users } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';

export const InstitutionalModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simbolos' | 'mision_vision' | 'valores' | 'himno'>('simbolos');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);
  const [isPlayingHimno, setIsPlayingHimno] = useState<boolean>(false);

  const selectedSymbol = SYMBOLS.find(s => s.id === selectedSymbolId) || SYMBOLS[0];

  // Synthetic speech synthesis or audio guide for the anthem
  const handlePlayHimno = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingHimno) {
        window.speechSynthesis.cancel();
        setIsPlayingHimno(false);
      } else {
        window.speechSynthesis.cancel();
        const currentVerse = HIMNO_VERSES[activeVerseIndex];
        const utterance = new SpeechSynthesisUtterance(currentVerse.text);
        utterance.lang = 'es-CO';
        utterance.rate = 0.9;
        utterance.onend = () => {
          setIsPlayingHimno(false);
          if (activeVerseIndex < HIMNO_VERSES.length - 1) {
            setActiveVerseIndex(prev => prev + 1);
          }
        };
        utterance.onerror = () => setIsPlayingHimno(false);
        setIsPlayingHimno(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleStopHimno = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingHimno(false);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Módulo 1 · Identidad Institucional
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Valores, Misión y Símbolos del SENA
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-3xl">
          Conoce el ADN del Servicio Nacional de Aprendizaje: su origen en 1957 por Rodolfo Martínez Tono, los tres sectores de la economía reflejados en sus insignias y el compromiso ético de cada aprendiz colombiano.
        </p>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mt-6 p-1 bg-slate-100 dark:bg-slate-850 rounded-xl w-fit border border-transparent dark:border-slate-800">
          <button
            onClick={() => setActiveTab('simbolos')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'simbolos'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Símbolos Patrios e Institucionales
          </button>
          <button
            onClick={() => setActiveTab('mision_vision')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'mision_vision'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Misión y Visión
          </button>
          <button
            onClick={() => setActiveTab('valores')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'valores'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Principios y Valores
          </button>
          <button
            onClick={() => setActiveTab('himno')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'himno'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Himno Oficial SENA
          </button>
        </div>
      </div>

      {/* Tab: Símbolos Institucionales */}
      {activeTab === 'simbolos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selecciona un símbolo para examinar
            </div>
            <div className="space-y-3">
              {SYMBOLS.map(sym => (
                <button
                  key={sym.id}
                  onClick={() => setSelectedSymbolId(sym.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedSymbolId === sym.id
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 p-1.5 transition-colors ${
                      selectedSymbolId === sym.id
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 ring-2 ring-emerald-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                    }`}>
                      {sym.id === 'escudo' && <SenaEscudo className="w-7 h-7 object-contain" />}
                      {sym.id === 'bandera' && <Flag className={`w-5 h-5 ${selectedSymbolId === sym.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`} />}
                      {sym.id === 'logosimbolo' && <SenaLogo className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{sym.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{sym.subtitle}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Context Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                Fundación Histórica: 1957
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Creado bajo el Decreto Ley 118 del 21 de junio de 1957, el SENA es una entidad tripartita donde convergen trabajadores, empresarios y el Estado colombiano para cualificar el talento humano nacional.
              </p>
            </div>
          </div>

          {/* Right: Symbol Deep-Dive Stage */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Inspección Detallada
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedSymbol.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{selectedSymbol.subtitle}</p>
              </div>

              {/* Graphical Emblem representation */}
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 p-2 shadow-sm">
                {selectedSymbol.id === 'escudo' && <SenaEscudo className="w-20 h-20 object-contain drop-shadow-md" />}
                {selectedSymbol.id === 'bandera' && <Flag className="w-12 h-12" />}
                {selectedSymbol.id === 'logosimbolo' && <SenaLogo className="w-14 h-14" />}
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedSymbol.description}
            </p>

            {/* Elements Breakout */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Desglose de Componentes y Significado
              </div>
              <div className="grid grid-cols-1 gap-3">
                {selectedSymbol.elements.map((el, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {el.name}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
                      {el.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Misión y Visión */}
      {activeTab === 'mision_vision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                M
              </div>
              <h3 className="text-xl font-bold text-slate-900">Misión del SENA</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {INSTITUTIONAL_INFO.mision}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Ley 119 de 1994 · Reestructuración institucional del SENA
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00324D]/10 text-[#00324D] flex items-center justify-center font-bold">
                V
              </div>
              <h3 className="text-xl font-bold text-slate-900">Visión Estratégica</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {INSTITUTIONAL_INFO.vision}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Plan Estratégico Institucional · Formación Técnica y Tecnológica
            </div>
          </div>

          {/* Photo Context strip */}
          <div className="lg:col-span-12 rounded-2xl overflow-hidden border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-5 h-64 md:h-full relative bg-slate-100">
              <img
                src="/src/assets/images/sena_campus_life_1793115127466.jpg"
                alt="Ambiente de formación SENA y comunidad de aprendices"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 p-6 md:p-8 space-y-3">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Comunidad Educativa en Acción
              </span>
              <h4 className="text-lg md:text-xl font-bold text-slate-900">
                La Formación Profesional Integral (FPI)
              </h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                La FPI en el SENA no solo transmite habilidades técnicas e instrumentales, sino que forma seres humanos íntegros, con pensamiento crítico, respeto por los derechos colectivos y compromiso con el progreso social y productivo de Colombia.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-medium text-slate-700">
                <span className="px-3 py-1 bg-slate-100 rounded-md">Saber (Cognitivo)</span>
                <span className="px-3 py-1 bg-slate-100 rounded-md">Saber Hacer (Procedimental)</span>
                <span className="px-3 py-1 bg-slate-100 rounded-md">Saber Ser (Actitudinal)</span>
                <span className="px-3 py-1 bg-slate-100 rounded-md">Saber Convivir (Ciudadano)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Valores y Principios */}
      {activeTab === 'valores' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSTITUTIONAL_INFO.valores.map((val, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{val.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Principios Institucionales */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Principios Éticos Institucionales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INSTITUTIONAL_INFO.principios.map((pr, i) => (
                <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-slate-900">{pr.title}</div>
                  <div className="text-xs text-slate-600">{pr.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Himno del SENA */}
      {activeTab === 'himno' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Música: Daniel Marlez · Letra: Luis Alfredo Sánchez
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                Himno del Servicio Nacional de Aprendizaje
              </h3>
            </div>

            {/* Audio Guidance Controller */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayHimno}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                {isPlayingHimno ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    Pausar Lectura
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Escuchar Estrofa {activeVerseIndex === 0 ? 'Coro' : activeVerseIndex}
                  </>
                )}
              </button>
              {isPlayingHimno && (
                <button
                  onClick={handleStopHimno}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Detener"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Verses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HIMNO_VERSES.map((verse, index) => (
              <div
                key={index}
                onClick={() => {
                  handleStopHimno();
                  setActiveVerseIndex(index);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeVerseIndex === index
                    ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold uppercase tracking-wider text-emerald-800">
                    {verse.type === 'coro' ? 'Coro Principal' : `Estrofa ${verse.number}`}
                  </span>
                  <span className="text-slate-400 font-mono">0{index + 1}</span>
                </div>
                <div className="text-sm font-medium text-slate-800 whitespace-pre-line leading-relaxed italic">
                  "{verse.text}"
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 text-center">
            El himno del SENA se entona solemnemente en actos protocolarios, inducciones, ceremonias de certificación y eventos académicos oficiales.
          </div>
        </div>
      )}
    </div>
  );
};
