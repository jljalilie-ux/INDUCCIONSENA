import { Apprentice, Question, PracticalDilemma, InstitutionalSymbol } from '../types/induction';

export const INSTITUTIONAL_INFO = {
  name: 'Servicio Nacional de Aprendizaje (SENA)',
  motto: 'Conocimiento para todos los colombianos',
  foundedYear: '1957',
  founder: 'Rodolfo Martínez Tono',
  mision: 'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el 2026, el SENA se consolidará como una entidad referente de formación integral para el trabajo y el desarrollo humano, con pertinencia, calidad y equidad, impulsando la innovación, la sostenibilidad y el empleo decente en Colombia.',
  principios: [
    { title: 'Primero la vida', desc: 'Respeto irrestricto por la vida, la dignidad humana y los derechos humanos de toda la comunidad.' },
    { title: 'La dignidad del ser humano', desc: 'Reconocimiento del valor intrínseco de cada aprendiz, instructor y colaborador del SENA.' },
    { title: 'La libertad con responsabilidad', desc: 'Ejercicio autónomo del aprendizaje con disciplina, ética y sentido del deber social.' },
    { title: 'El bien común prevalece', desc: 'El interés general de la comunidad SENA prima sobre los intereses particulares.' },
    { title: 'Formación para la vida y el trabajo', desc: 'Desarrollo de competencias técnicas, socioemocionales y ciudadanas con excelencia.' }
  ],
  valores: [
    { name: 'Respeto', desc: 'Tratar a todas las personas con cortesía, reconociendo su valor y diversidad cultural.' },
    { name: 'Honestidad', desc: 'Actuar con coherencia, transparencia, honradez y rechazo total al fraude o la copia.' },
    { name: 'Compromiso', desc: 'Asumir con entusiasmo y disciplina los deberes académicos y el crecimiento del país.' },
    { name: 'Solidaridad', desc: 'Cooperar y apoyar a los compañeros de formación y a las comunidades vulnerables.' },
    { name: 'Justicia', desc: 'Obrar con imparcialidad, equidad y respeto estricto al debido proceso formativo.' },
    { name: 'Liderazgo', desc: 'Inspirar cambios positivos, proponer soluciones y transformar los sectores productivos.' }
  ]
};

export const REGLAMENTO_VIGENTE = {
  acuerdo: 'Acuerdo 0009 de 2024 (Reglamento del Aprendiz)',
  capitulos: [
    {
      id: 'cap1',
      title: 'Capítulo I: Definiciones',
      content: 'Establece conceptos fundamentales como Formación Profesional Integral (FPI), Aspirante, Aprendiz SENA, Comunidad Educativa y Centro de Formación, garantizando un lenguaje común para toda la institución.'
    },
    {
      id: 'cap2',
      title: 'Capítulo II: Derechos del Aprendiz SENA',
      content: 'Detalla las garantías, facultades y derechos que posee el aprendiz desde su ingreso hasta su certificación, incluyendo aspectos de bienestar, modalidades de formación y representatividad.'
    },
    {
      id: 'cap3',
      title: 'Capítulo III: Deberes del Aprendiz SENA y Prohibiciones',
      content: 'Establece los compromisos académicos y comportamentales que el aprendiz debe cumplir, así como las conductas prohibidas dentro de la comunidad educativa para garantizar la convivencia.'
    },
    {
      id: 'cap4',
      title: 'Capítulo IV: Ingreso, Permanencia y Certificación',
      content: 'Regula el ciclo de vida del aprendiz: reglas de ingreso, matriz de novedades (traslados, aplazamientos, reingresos, retiros), definición de deserción y requisitos para la certificación final.'
    },
    {
      id: 'cap5',
      title: 'Capítulo V: Régimen de Faltas, Medidas Formativas, Disciplinarias y Sancionatorias',
      content: 'Define el debido proceso ante incumplimientos: clasificación de faltas (académicas/disciplinarias y leves/graves/gravísimas), principios orientadores, medidas formativas (planes de mejoramiento) y sanciones formales (llamados de atención, cancelación de matrícula).'
    }
  ]
};

export const SYMBOLS: InstitutionalSymbol[] = [
  {
    id: 'escudo',
    title: 'El Escudo del SENA',
    subtitle: 'Síntesis de los tres sectores económicos de Colombia',
    description: 'El escudo del SENA fue diseñado en los primeros años de la entidad y simboliza la integración de las fuerzas productivas que impulsan la soberanía económica de Colombia.',
    elements: [
      { name: 'La Rueda Dentada (Piñón)', meaning: 'Representa el sector Industria y de la Construcción. Simboliza la técnica, la mecánica, la manufactura y el trabajo transformador.' },
      { name: 'El Caduceo', meaning: 'Representa el sector Comercio y Servicios. Simboliza el intercambio justo, la administración, el turismo, la logística y la actividad mercantil.' },
      { name: 'La Espiga', meaning: 'Representa el sector Primario y Agropecuario. Simboliza la tierra fértil, la seguridad alimentaria, el campesinado y el campo colombiano.' }
    ]
  },
  {
    id: 'bandera',
    title: 'La Bandera del SENA',
    subtitle: 'Paz, tranquilidad y universalidad del saber',
    description: 'La bandera de la institución consta de un paño rectangular blanco que lleva en su centro el escudo oficial de la entidad.',
    elements: [
      { name: 'Fondo Blanco', meaning: 'Simboliza la paz, la transparencia, la armonía, la tranquilidad y la convivencia pacífica que promueve la formación integral.' },
      { name: 'Escudo Centrado', meaning: 'Representa la universalidad de la formación profesional y la presencia institucional en cada rincón del territorio nacional.' }
    ]
  },
  {
    id: 'logosimbolo',
    title: 'El Logosímbolo',
    subtitle: 'El ser humano en proyección hacia el futuro',
    description: 'Es la marca gráfica más visible del SENA en la contemporaneidad. Representa gráficamente los dos ejes cardinales de la institución: el hombre y el camino.',
    elements: [
      { name: 'La Figura Humana', meaning: 'El aprendiz y el trabajador como centro y razón de ser de la formación profesional integral.' },
      { name: 'El Camino y Horizonte', meaning: 'El sendero de superación constante, innovación, tecnología y apertura hacia el porvenir productivo.' },
      { name: 'El Color Verde SENA', meaning: 'Esperanza, juventud, naturaleza, pujanza y desarrollo sostenible para Colombia.' }
    ]
  }
];

export const HIMNO_VERSES = [
  {
    type: 'coro',
    text: 'Estudiantes del SENA adelante\npor Colombia luchad con amor\ncon el ánimo noble y radiante\ntransformemos el mundo en mejor.'
  },
  {
    type: 'estrofa',
    number: 'I',
    text: 'De la patria el futuro destino,\nen las manos del joven está,\nel trabajo es seguro camino,\nque la paz y el progreso nos da.'
  },
  {
    type: 'estrofa',
    number: 'II',
    text: 'En la forja del SENA se forman,\nhombres libres que saben triunfar,\ncon la ciencia y la técnica aprenden,\nel camino del bien a labrar.'
  },
  {
    type: 'estrofa',
    number: 'III',
    text: 'Hoy la patria nos llama a la lid,\ncon la antorcha del saber en la mano,\nconstruyamos un mundo feliz,\npara gloria del pueblo hermano.'
  }
];

export const DERECHOS_APRENDIZ = [
  {
    num: 1,
    title: 'Inducción Oportuna y Completa',
    desc: 'Recibir al iniciar el programa el proceso de inducción sobre la institución, el programa, el centro y el reglamento.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 1'
  },
  {
    num: 2,
    title: 'Formación Profesional Integral de Calidad',
    desc: 'Disfrutar de una formación orientada por instructores competentes con metodologías actualizadas y pertinentes.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 2'
  },
  {
    num: 3,
    title: 'Acceso a Recursos y Ambientes de Aprendizaje',
    desc: 'Utilizar la infraestructura, bibliotecas físicas y virtuales, conectividad, maquinaria y materiales requeridos.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 3'
  },
  {
    num: 4,
    title: 'Trato Digno, Respetuoso e Inclusivo',
    desc: 'Ser tratado con dignidad y consideración por directivos, instructores, administrativos y compañeros, sin discriminación.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 6'
  },
  {
    num: 5,
    title: 'Conocer Evaluaciones y Evaluaciones Oportunas',
    desc: 'Recibir retroalimentación formativa y conocer los resultados de las evaluaciones en máximo 5 días hábiles.',
    article: 'Acuerdo 0009 de 2024, Art. 5 (Retroalimentación Oportuna)'
  },
  {
    num: 6,
    title: 'Participación Democrática (Elegir y ser Elegido)',
    desc: 'Postularse y votar para vocero de ficha o representante de los aprendices ante el comité del centro.',
    article: 'Acuerdo 0009 de 2024, Art. 5 y Art. 7'
  },
  {
    num: 7,
    title: 'Libre Expresión y Debido Proceso',
    desc: 'Expresar ideas respetuosamente y ser escuchado en defensa ante cualquier reporte disciplinario o académico.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 7'
  },
  {
    num: 8,
    title: 'Estímulos e Incentivos al Mérito',
    desc: 'Ser postulado a monitorías, pasantías, intercambios y distinciones por excelencia académica y actitudinal.',
    article: 'Acuerdo 0009 de 2024, Art. 6 (Estímulos)'
  },
  {
    num: 9,
    title: 'Servicios de Bienestar al Aprendiz',
    desc: 'Acceder a programas deportivos, culturales, orientación psicológica, salud ocupacional y apoyos de sostenimiento.',
    article: 'Acuerdo 0009 de 2024, Art. 5, Numeral 5'
  },
  {
    num: 10,
    title: 'Garantía y Acompañamiento en la Etapa Productiva',
    desc: 'Recibir asesoría y acompañamiento institucional para el registro y desarrollo de la alternativa de etapa práctica.',
    article: 'Acuerdo 0009 de 2024, Cap. IV (Etapa Productiva)'
  }
];

export const DEBERES_APRENDIZ = [
  {
    num: 1,
    title: 'Conocer y Cumplir el Reglamento',
    desc: 'Acatar el Reglamento del Aprendiz (Acuerdo 0009 de 2024), manuales de convivencia y normas de bioseguridad del centro.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 1'
  },
  {
    num: 2,
    title: 'Portar el Carné y Cuidar la Imagen Institucional',
    desc: 'Llevar visible el carné institucional dentro de las sedes y portar el uniforme con decoro y pulcritud.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 2'
  },
  {
    num: 3,
    title: 'Asistencia y Participación Activa Rigurosa',
    desc: 'Asistir puntualmente y participar de forma activa en las actividades presenciales o virtuales del plan formativo.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 6'
  },
  {
    num: 4,
    title: 'Justificación Oportuna de Inasistencias',
    desc: 'Presentar soporte médico o legal de inasistencias dentro de los 3 días hábiles siguientes al hecho.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 7'
  },
  {
    num: 5,
    title: 'Cuidado y Custodia de Bienes e Instalaciones',
    desc: 'Cuidar las máquinas, computadores, plataformas tecnológicas, mobiliario y herramientas asignadas para las prácticas.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 4'
  },
  {
    num: 6,
    title: 'Honestidad Intelectual y No Plagio',
    desc: 'Entregar evidencias de autoría propia, citar fuentes y evitar el plagio, copia o suplantación en evaluaciones.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 5'
  },
  {
    num: 7,
    title: 'Respeto Institucional y Trato Digno',
    desc: 'Obrar bajo los principios SENA, tratando con respeto y sin discriminación a instructores, aprendices y colaboradores.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 3'
  },
  {
    num: 8,
    title: 'Uso de Canales Oficiales y Plataformas Zajuna/Sofia',
    desc: 'Emplear adecuadamente los canales oficiales y mantener actualizados los datos personales y documentos.',
    article: 'Acuerdo 0009 de 2024, Art. 8, Numeral 8'
  },
  {
    num: 9,
    title: 'Cumplimiento en la Alternativa Productiva',
    desc: 'Cumplir con las horas, deberes de la empresa patrocinadora y entrega puntual de bitácoras de seguimiento.',
    article: 'Acuerdo 0009 de 2024, Cap. IV (Etapa Productiva)'
  },
  {
    num: 10,
    title: 'Prohibición de Sustancias, Armas y Faltas Graves',
    desc: 'No ingresar ni consumir sustancias psicoactivas, licor o portar armas, respetando las prohibiciones expresas.',
    article: 'Acuerdo 0009 de 2024, Art. 9 (Prohibiciones)'
  }
];

export const PRACTICAL_DILEMMAS: PracticalDilemma[] = [
  {
    id: 'dilema-1',
    title: 'Inasistencia por Causa de Fuerza Mayor',
    category: 'Deberes y Trámites',
    situation: 'Mateo tuvo una emergencia médica comprobable un día martes y no pudo asistir a su taller de programación en el Centro de Formación. ¿Cuál es la ruta correcta según el reglamento?',
    choices: [
      {
        id: 'c1',
        text: 'Avisar por WhatsApp a un compañero y no presentar ninguna incapacidad formal.',
        isOptimal: false,
        feedback: 'Incorrecto. Los mensajes informales a compañeros no tienen validez legal ante la coordinación.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 8 Numeral 7'
      },
      {
        id: 'c2',
        text: 'Presentar la constancia médica radicada formalmente ante el instructor en los siguientes 3 días hábiles.',
        isOptimal: true,
        feedback: '¡Correcto! El aprendiz dispone de hasta tres (3) días hábiles después del hecho para entregar la justificación válida con soporte.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 8 Numeral 7 (Justificación de Inasistencias)'
      },
      {
        id: 'c3',
        text: 'Esperar a final del trimestre para justificar todas las faltas acumuladas.',
        isOptimal: false,
        feedback: 'Incorrecto. Si pasan más de tres días continuos sin justificación, se inicia proceso por presunta deserción.',
        legalArticle: 'Acuerdo 0009 de 2024, Cap. IV (Deserción)'
      }
    ]
  },
  {
    id: 'dilema-2',
    title: 'Dilema de Honestidad en Evidencias de Aprendizaje',
    category: 'Ética y Derechos',
    situation: 'Camila no alcanzó a terminar su algoritmo de base de datos. Un compañero le ofrece copiar y pegar exactamente su archivo para subirlo a la plataforma Zajuna. ¿Qué estipula la normativa SENA?',
    choices: [
      {
        id: 'c1',
        text: 'Subir el código de su compañero porque en el SENA se fomenta el trabajo colaborativo.',
        isOptimal: false,
        feedback: 'Incorrecto. El trabajo colaborativo no autoriza plagio o suplantación en evidencias individuales.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 9 (Prohibiciones)'
      },
      {
        id: 'c2',
        text: 'Solicitar concertación al instructor o apoyo pedagógico, presentando únicamente su trabajo original.',
        isOptimal: true,
        feedback: '¡Excelente decisión! La honestidad académica es un principio SENA innegociable. El plagio constituye una falta disciplinaria y académica grave.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 8 Numeral 5 y Art. 9'
      },
      {
        id: 'c3',
        text: 'Pagarle a un tercero externo para que le desarrolle el entregable de la ficha.',
        isOptimal: false,
        feedback: 'Incorrecto. Comprar evidencias vulnera la ética formativa y acarrea sanciones disciplinarias de comité.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 9 (Prohibiciones)'
      }
    ]
  },
  {
    id: 'dilema-3',
    title: 'Representación y Vocería de la Ficha',
    category: 'Derechos y Democracia',
    situation: 'La ficha de Julián necesita elegir a su vocero para que los represente ante el Comité de Evaluación y el Centro. ¿Quiénes pueden postularse y cuál es su función principal?',
    choices: [
      {
        id: 'c1',
        text: 'Cualquier aprendiz matriculado en estado activo con buen rendimiento, actuando como puente constructivo.',
        isOptimal: true,
        feedback: '¡Correcto! Los voceros son líderes dinamizadores elegidos democráticamente por sus pares para fortalecer la convivencia y la comunicación.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 5 y Art. 7 (Representatividad)'
      },
      {
        id: 'c2',
        text: 'Únicamente el aprendiz con la matrícula más antigua o mayor edad.',
        isOptimal: false,
        feedback: 'Incorrecto. La elección es democrática y universal entre todos los aprendices inscritos en la ficha.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 7'
      },
      {
        id: 'c3',
        text: 'El instructor designa al vocero a dedo sin realizar votación en el grupo.',
        isOptimal: false,
        feedback: 'Incorrecto. Es un derecho fundamental de los aprendices elegir y ser elegidos por votación directa.',
        legalArticle: 'Acuerdo 0009 de 2024, Art. 5 Numeral 7 y Art. 7'
      }
    ]
  }
];

export const EVALUATION_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    question: '¿Qué simbolizan los tres elementos presentes en el escudo oficial del SENA?',
    options: [
      { id: 'a', text: 'Los tres colores de la bandera de Colombia (amarillo, azul y rojo).' },
      { id: 'b', text: 'Los sectores productivos: Industria (piñón), Comercio y Servicios (caduceo), y Agropecuario (espiga).' },
      { id: 'c', text: 'Las tres cordilleras de la geografía nacional colombiana.' },
      { id: 'd', text: 'Las etapas lectiva, productiva y de egresado del aprendiz.' }
    ],
    correctOptionId: 'b',
    explanation: 'El escudo del SENA representa los tres grandes sectores de la economía nacional: piñón (industria y construcción), caduceo (comercio y servicios) y espiga (sector agropecuario y primario).',
    regulatoryReference: 'Símbolos Institucionales del SENA - Manual de Identidad'
  },
  {
    id: 'q2',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    question: '¿En qué año fue fundado el SENA y quién fue su fundador principal?',
    options: [
      { id: 'a', text: 'En 1957 por Rodolfo Martínez Tono con el apoyo de trabajadores y empresarios.' },
      { id: 'b', text: 'En 1975 por el Ministerio de Educación Nacional.' },
      { id: 'c', text: 'En 1991 mediante la promulgación de la nueva Constitución Política.' },
      { id: 'd', text: 'En 1948 durante el gobierno de Mariano Ospina Pérez.' }
    ],
    correctOptionId: 'a',
    explanation: 'El SENA nació en 1957 gracias a la iniciativa visionaria del cartagenero Rodolfo Martínez Tono, respaldada por gremios empresariales y organizaciones sindicales.',
    regulatoryReference: 'Decreto Ley 118 de 1957 / Historia SENA'
  },
  {
    id: 'q3',
    category: 'derechos',
    categoryLabel: 'Derechos del Aprendiz',
    question: 'Si un aprendiz presenta una evidencia de aprendizaje, ¿cuál es el plazo reglamentario para que el instructor registre la evaluación y retroalimentación?',
    options: [
      { id: 'a', text: 'Al finalizar todo el año lectivo durante la última semana.' },
      { id: 'b', text: 'Máximo dentro de los cinco (5) días hábiles siguientes a la entrega.' },
      { id: 'c', text: 'Quince (15) días calendario sin importar la fecha de cierre.' },
      { id: 'd', text: 'No existe límite de tiempo establecido en el reglamento.' }
    ],
    correctOptionId: 'b',
    explanation: 'El aprendiz tiene el derecho de conocer oportunamente sus evaluaciones dentro de los 5 días hábiles siguientes a la entrega para poder formular ajustes o reclamos si fuere necesario.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Artículo 5 (Retroalimentación Oportuna)'
  },
  {
    id: 'q4',
    category: 'derechos',
    categoryLabel: 'Derechos del Aprendiz',
    question: '¿Cuál de los siguientes es un derecho explícito de los aprendices en formación según el Acuerdo 0009 de 2024 (Reglamento del Aprendiz)?',
    options: [
      { id: 'a', text: 'Modificar a criterio propio los horarios de formación sin aviso previo.' },
      { id: 'b', text: 'Elegir y ser elegido democráticamente como vocero de grupo o representante del centro.' },
      { id: 'c', text: 'Aprobar automáticamente sin presentar evidencias si asiste al 90% de clases.' },
      { id: 'd', text: 'Ingresar a los ambientes de aprendizaje sin el carné institucional visible.' }
    ],
    correctOptionId: 'b',
    explanation: 'La representación democrática mediante la elección de voceros de ficha y representantes generales es un derecho consagrado en el Reglamento del Aprendiz.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Artículos 5 y 7'
  },
  {
    id: 'q5',
    category: 'deberes',
    categoryLabel: 'Deberes y Convivencia',
    question: 'Si un aprendiz tiene una calamidad doméstica o enfermedad que le impide asistir, ¿cuántos días tiene para justificar su inasistencia?',
    options: [
      { id: 'a', text: 'Hasta un mes después de regresar a las clases.' },
      { id: 'b', text: 'Hasta tres (3) días hábiles siguientes al hecho con su respectivo soporte válido.' },
      { id: 'c', text: 'No es necesario justificar si la falta no supera los dos días.' },
      { id: 'd', text: 'Diez (10) días calendario directamente ante la Dirección General.' }
    ],
    correctOptionId: 'b',
    explanation: 'El reglamento estipula que las inasistencias deben ser justificadas formalmente con soportes válidos dentro de los 3 días hábiles siguientes a la ocurrencia.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Artículo 8 Numeral 7'
  },
  {
    id: 'q6',
    category: 'deberes',
    categoryLabel: 'Deberes y Convivencia',
    question: '¿Qué consecuencia directa puede acarrear el no justificar tres (3) días consecutivos de inasistencia a la formación?',
    options: [
      { id: 'a', text: 'Una felicitación en la hoja de vida por autonomía formativa.' },
      { id: 'b', text: 'El inicio de un trámite de deserción del programa y posterior cancelación de matrícula.' },
      { id: 'c', text: 'Un descuento económico en las cuotas de matrícula (el SENA es gratuito).' },
      { id: 'd', text: 'El traslado inmediato a jornada nocturna sin su consentimiento.' }
    ],
    correctOptionId: 'b',
    explanation: 'La inasistencia injustificada durante tres días consecutivos da inicio al procedimiento de deserción, otorgando 5 días para presentar descargos antes de la cancelación definitiva.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Capítulo IV (Novedades de Deserción)'
  },
  {
    id: 'q7',
    category: 'tramitesYEtapa',
    categoryLabel: 'Trámites y Etapa Productiva',
    question: '¿Cuáles son las dos grandes etapas secuenciales que componen la Formación Profesional Integral del SENA?',
    options: [
      { id: 'a', text: 'Etapa Preparatoria y Etapa de Grado Académico.' },
      { id: 'b', text: 'Etapa Lectiva (apropiación teórica/práctica) y Etapa Productiva (aplicación en el sector real).' },
      { id: 'c', text: 'Etapa de Inducción y Etapa de Titulación Profesional.' },
      { id: 'd', text: 'Etapa Presencial y Etapa Virtual sin interacción real.' }
    ],
    correctOptionId: 'b',
    explanation: 'El proceso formativo SENA se estructura en Etapa Lectiva (donde se desarrollan las competencias en aula y taller) y Etapa Productiva (donde se aplican en entornos reales de trabajo).',
    regulatoryReference: 'Estatuto de la Formación Profesional Integral SENA y Acuerdo 0009 de 2024'
  },
  {
    id: 'q8',
    category: 'tramitesYEtapa',
    categoryLabel: 'Trámites y Etapa Productiva',
    question: '¿Cuál de las siguientes es una alternativa válida y reconocida para desarrollar la Etapa Productiva?',
    options: [
      { id: 'a', text: 'Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo, Pasantía o Monitoría.' },
      { id: 'b', text: 'Tomar cursos de idiomas en plataformas no homologadas sin convenio.' },
      { id: 'c', text: 'Presentar una carta de buena conducta firmada por un familiar.' },
      { id: 'd', text: 'Estar matriculado en un gimnasio comunitario o centro deportivo.' }
    ],
    correctOptionId: 'a',
    explanation: 'El SENA reconoce múltiples modalidades para la etapa productiva: Contrato de Aprendizaje, Vínculo laboral, Proyectos formativos SENA Empresa, Apoyo a unidades productivas familiares y Pasantías.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Capítulo IV (Alternativas de Etapa Productiva)'
  },
  {
    id: 'q9',
    category: 'deberes',
    categoryLabel: 'Deberes y Convivencia',
    question: 'En el SENA, ¿cuál es el significado pedagógico del "Plan de Mejoramiento"?',
    options: [
      { id: 'a', text: 'Una sanción disciplinaria irrevocable que expulsa al aprendiz de la institución.' },
      { id: 'b', text: 'Una medida formativa concertada para superar deficiencias académicas o actitudinales en un plazo definido.' },
      { id: 'c', text: 'Una rebaja de calificación para que el aprendiz repita todo el programa.' },
      { id: 'd', text: 'Un examen sorpresa obligatorio sin asesoría del instructor.' }
    ],
    correctOptionId: 'b',
    explanation: 'El Plan de Mejoramiento es una oportunidad pedagógica que busca que el aprendiz alcance los resultados de aprendizaje aún no logrados o corrija conductas inapropiadas con metas claras.',
    regulatoryReference: 'Acuerdo 0009 de 2024, Capítulo V (Medidas Formativas)'
  },
  {
    id: 'q10',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    question: '¿Cuáles son los cuatro pilares fundamentales de la Formación Profesional Integral (FPI) orientados al desarrollo humano?',
    options: [
      { id: 'a', text: 'Aprender a Ganar, Aprender a Mandar, Aprender a Competir y Aprender a Comprar.' },
      { id: 'b', text: 'Aprender a Aprender, Aprender a Hacer, Aprender a Ser y Aprender a Convivir.' },
      { id: 'c', text: 'Aprender a Programar, Aprender a Vender, Aprender a Viajar y Aprender a Rendir.' },
      { id: 'd', text: 'Aprender a Memorizar, Aprender a Repetir, Aprender a Acatar y Aprender a Callar.' }
    ],
    correctOptionId: 'b',
    explanation: 'El modelo pedagógico del SENA promueve una formación holística: Aprender a Aprender (cognitivo), Aprender a Hacer (técnico/procedimental), Aprender a Ser (ético/personal) y Aprender a Convivir (social y ciudadano).',
    regulatoryReference: 'Modelo Pedagógico de la Formación Profesional Integral (FPI)'
  }
];

export const INITIAL_COHORT: Apprentice[] = [
  {
    id: 'app-001',
    documentType: 'CC',
    documentNumber: '1098745231',
    fullName: 'Laura Sofía Gómez Rueda',
    email: 'lsgomez@soy.sena.edu.co',
    phone: '312 458 9012',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Distrito Capital',
    centroFormacion: 'Centro de Tecnologías para la Construcción y la Madera',
    status: 'aprobado',
    score: 95,
    completedAt: '2026-10-25 14:32',
    attemptsCount: 1,
    categoryBreakdown: {
      identidad: 100,
      derechos: 100,
      deberes: 90,
      tramitesYEtapa: 90
    }
  },
  {
    id: 'app-002',
    documentType: 'TI',
    documentNumber: '1045892110',
    fullName: 'Juan David Méndez Palacio',
    email: 'jdmendez@soy.sena.edu.co',
    phone: '318 765 4321',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Antioquia',
    centroFormacion: 'Centro de Servicios y Gestión Empresarial',
    status: 'aprobado',
    score: 90,
    completedAt: '2026-10-26 11:15',
    attemptsCount: 1,
    categoryBreakdown: {
      identidad: 100,
      derechos: 85,
      deberes: 90,
      tramitesYEtapa: 85
    }
  },
  {
    id: 'app-003',
    documentType: 'CC',
    documentNumber: '1120984756',
    fullName: 'Valentina Restrepo Castro',
    email: 'vrestrepo@soy.sena.edu.co',
    phone: '300 234 5678',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Santander',
    centroFormacion: 'Centro Industrial del Mantenimiento Integral',
    status: 'en_progreso',
    score: 65,
    attemptsCount: 2,
    categoryBreakdown: {
      identidad: 70,
      derechos: 60,
      deberes: 65,
      tramitesYEtapa: 65
    }
  },
  {
    id: 'app-004',
    documentType: 'CC',
    documentNumber: '1032948571',
    fullName: 'Carlos Eduardo Ramírez Peña',
    email: 'ceramirez@soy.sena.edu.co',
    phone: '314 908 1234',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Valle',
    centroFormacion: 'Centro de Electricidad y Automatización Industrial',
    status: 'no_iniciado',
    attemptsCount: 0
  },
  {
    id: 'app-005',
    documentType: 'TI',
    documentNumber: '1076543219',
    fullName: 'Mariana Duque Torres',
    email: 'mduque@soy.sena.edu.co',
    phone: '315 678 4321',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Cundinamarca',
    centroFormacion: 'Centro de Desarrollo Agroempresarial',
    status: 'aprobado',
    score: 100,
    completedAt: '2026-10-27 09:40',
    attemptsCount: 1,
    categoryBreakdown: {
      identidad: 100,
      derechos: 100,
      deberes: 100,
      tramitesYEtapa: 100
    }
  },
  {
    id: 'app-006',
    documentType: 'CC',
    documentNumber: '1088741258',
    fullName: 'Andrés Felipe Morales Ortiz',
    email: 'afmorales@soy.sena.edu.co',
    phone: '311 543 9876',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2874912',
    regional: 'Regional Atlántico',
    centroFormacion: 'Centro Colombo Alemán',
    status: 'en_progreso',
    score: 70,
    attemptsCount: 1,
    categoryBreakdown: {
      identidad: 80,
      derechos: 70,
      deberes: 60,
      tramitesYEtapa: 70
    }
  }
];

export const DEMO_INSTRUCTOR = {
  id: 'inst-001',
  fullName: 'Carlos Alberto Restrepo Salazar',
  documentNumber: '71957420',
  institutionalEmail: 'instructor.fpi@sena.edu.co',
  role: 'instructor' as const,
  regional: 'Regional Distrito Capital',
  centroFormacion: 'Centro de Tecnologías para la Construcción y la Madera',
  areaEspecialidad: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  fichasAsignadas: ['2874912', '2874913', '2901450'],
  pinAcceso: 'SENA2024'
};

export const MODELO_PEDAGOGICO_DATA = {
  titulo: 'Modelo Pedagógico de la Formación Profesional Integral (FPI)',
  definicion: 'Proceso teórico-práctico integral de carácter formativo, enfocado en el desarrollo de conocimientos técnicos, tecnológicos, actitudes y valores para la convivencia social y el mundo laboral.',
  pilares: [
    {
      id: 'pilar-1',
      title: 'Aprender a Aprender',
      dimensión: 'Cognitiva y Metacognitiva',
      desc: 'Capacidad de gestionar el propio aprendizaje de manera autónoma, crítica y continua, adaptándose a las transformaciones tecnológicas y sociales.',
      icono: 'Brain'
    },
    {
      id: 'pilar-2',
      title: 'Aprender a Hacer',
      dimensión: 'Técnica y Procedimental',
      desc: 'Adquisición de habilidades prácticas, destrezas operativas y aplicación rigurosa de metodologías en entornos reales y simulados de producción.',
      icono: 'Wrench'
    },
    {
      id: 'pilar-3',
      title: 'Aprender a Ser',
      dimensión: 'Ética y Actitudinal',
      desc: 'Construcción de la propia identidad con principios de honestidad, respeto irrestricto a la vida, responsabilidad social y liderazgo transformador.',
      icono: 'User'
    },
    {
      id: 'pilar-4',
      title: 'Aprender a Convivir',
      dimensión: 'Social y Ciudadana',
      desc: 'Trabajo colaborativo armónico, resolución pacífica de conflictos, empatía, inclusión y valoración de la diversidad en la comunidad formativa.',
      icono: 'Users'
    }
  ],
  fasesProyecto: [
    {
      fase: 'Fase 1: Análisis',
      desc: 'Diagnóstico de necesidades productivas o sociales, formulación del problema y levantamiento de requerimientos técnicos.',
      entregable: 'Informe de caracterización y árbol de problemas/objetivos.'
    },
    {
      fase: 'Fase 2: Planeación',
      desc: 'Diseño de la solución, cronograma de actividades, selección de tecnologías, recursos requeridos y formulación de arquitectura.',
      entregable: 'Plan de trabajo, especificaciones técnicas y modelos de diseño.'
    },
    {
      fase: 'Fase 3: Ejecución',
      desc: 'Desarrollo material del producto o servicio, codificación, ensamblaje, pruebas técnicas y aplicación en contextos reales.',
      entregable: 'Prototipo funcional, software desplegado o producto terminado.'
    },
    {
      fase: 'Fase 4: Evaluación',
      desc: 'Validación de impacto, pruebas de calidad con usuarios, análisis de sostenibilidad y retroalimentación de resultados.',
      entregable: 'Informe final de validación y sustentación pública.'
    }
  ]
};

export const SERVICIOS_BIENESTAR_DATA = [
  {
    id: 'bienestar-salud',
    area: 'Salud y Prevención',
    titulo: 'Orientación Psicosocial y Salud Integral',
    descripcion: 'Atención primaria en primeros auxilios, asesoría psicológica confidencial, jornadas de vacunación y programas de prevención en salud mental y sexual.',
    beneficio: 'Acompañamiento individual y talleres de inteligencia emocional en cada centro.',
    canal: 'Oficina de Bienestar al Aprendiz en tu centro de formación.'
  },
  {
    id: 'bienestar-apoyos',
    area: 'Apoyos Socioeconómicos',
    titulo: 'Apoyos de Sostenimiento y Frecuencia de Transporte',
    descripcion: 'Asignación monetaria mensual para aprendices de estratos 1 y 2 en condición de vulnerabilidad, apoyo alimentario y auxilio de transporte urbano o rural.',
    beneficio: 'Hasta el 50% del salario mínimo legal mensual según convocatoria institucional.',
    canal: 'Convocatorias trimestrales a través de la plataforma SofiaPlus.'
  },
  {
    id: 'bienestar-cultura-deporte',
    area: 'Cultura, Deporte y Recreación',
    titulo: 'Grupos Representativos, Torneos y Expresión Artística',
    descripcion: 'Torneos deportivos zonales y nacionales (fútbol, baloncesto, voleibol, atletismo) y agrupaciones de danza, teatro, coro y música tradicional colombiana.',
    beneficio: 'Inscripción gratuita, uniformes de competencia e indumentaria institucional.',
    canal: 'Área de Deporte y Cultura de la Coordinación de Bienestar.'
  },
  {
    id: 'bienestar-monitorias',
    area: 'Desarrollo del Talento',
    titulo: 'Monitorías Académicas y Tecnológicas',
    descripcion: 'Oportunidad para aprendices de rendimiento sobresaliente de apoyar a instructores en ambientes de aprendizaje, laboratorios y biblioteca.',
    beneficio: 'Estímulo económico mensual y certificación de experiencia formativa destacada.',
    canal: 'Convocatoria semestral de monitorías según resolución vigente.'
  },
  {
    id: 'bienestar-empleo',
    area: 'Inserción Laboral y Emprendimiento',
    titulo: 'Agencia Pública de Empleo (APE) y Fondo Emprender',
    descripcion: 'Intermediación laboral gratuita con empresas aliadas, talleres de hoja de vida, simulación de entrevistas y capital semilla para ideas de negocio innovadoras.',
    beneficio: 'Acceso prioritario a vacantes de contrato de aprendizaje y empleo formal.',
    canal: 'Portal ape.sena.edu.co y Unidades de Emprendimiento SBDC SENA.'
  },
  {
    id: 'bienestar-biblioteca',
    area: 'Recursos del Conocimiento',
    titulo: 'Sistema de Bibliotecas y Plataforma Zajuna',
    descripcion: 'Acceso ilimitado a más de 50 bases de datos científicas internacionales (EBSCO, ProQuest, ScienceDirect), repositorios de libros digitales y soporte LMS Zajuna 24/7.',
    beneficio: 'Préstamo interbibliotecario y conectividad en salas de cómputo.',
    canal: 'biblioteca.sena.edu.co y zajuna.sena.edu.co'
  }
];

export const INSTRUCTOR_CONTENT = {
  orientacionesFpi: [
    {
      id: 'ori-1',
      title: 'Estatuto de la Formación Profesional Integral (Decreto 249 de 2004)',
      summary: 'Marco fundacional que orienta la acción pedagógica del instructor SENA hacia el desarrollo holístico del ser humano y la productividad nacional.',
      items: [
        'Enfoque por competencias laborales: Saber, Saber Hacer y Saber Ser.',
        'Metodología de aprendizaje basado en proyectos productivos reales.',
        'Articulación de la teoría con la práctica en talleres y laboratorios especializados.',
        'El instructor como mediador pedagógico, no mero transmisor de información.'
      ]
    },
    {
      id: 'ori-2',
      title: 'Planeación Pedagógica del Proyecto Formativo',
      summary: 'Estructuración metódica de los Resultados de Aprendizaje (RAP) articulados en fases secuenciales de desarrollo.',
      items: [
        'Diseño de Guías de Aprendizaje bajo el formato oficial GFPI-F-135.',
        'Formulación de actividades de Reflexión Inicial, Contextualización y Apropiación.',
        'Concertación de evidencias de Conocimiento, Desempeño y Producto.',
        'Definición de criterios de evaluación unificados por equipo ejecutor.'
      ]
    }
  ],
  procesosFormativos: [
    {
      id: 'proc-1',
      title: 'Ruta Metodológica de Inducción (40 Horas)',
      summary: 'Proceso obligatorio de acogida institucional donde los aprendices conocen el SENA, sus normas y el perfil del programa.',
      pasos: [
        'Presentación del Centro, Directivas y Equipo de Instructores.',
        'Apropiación de la Identidad Institucional, Símbolos e Himno.',
        'Socialización y firma de compromiso con el Acuerdo 0009 de 2024 (Reglamento del Aprendiz).',
        'Navegación en plataformas SofiaPlus y Zajuna, y conformación de grupos de proyecto.',
        'Evaluación diagnóstica y formativa de apropiación.'
      ]
    },
    {
      id: 'proc-2',
      title: 'Acompañamiento y Evaluación de Etapa Productiva',
      summary: 'Supervisión rigurosa del desempeño del aprendiz en el entorno laboral o de proyecto formativo.',
      pasos: [
        'Diligenciamiento y concertación del formato GFPI-F-023 (Planeación y Seguimiento).',
        'Revisión y validación de bitácoras quincenales suscritas con el coformador empresarial.',
        'Visitas presenciales o virtuales de concertación inicial, parcial y final.',
        'Emisión de juicio evaluativo "Aprobado" o "No Aprobado" para trámite de certificación.'
      ]
    }
  ],
  politicasInstitucionales: [
    {
      id: 'pol-1',
      title: 'Reglamento del Aprendiz (Acuerdo 0009 de 2024)',
      rolInstructor: 'Garante del debido proceso, orientador formativo y miembro deliberativo del Comité de Evaluación y Seguimiento.',
      claves: [
        'Aplicación estricta de medidas formativas (Planes de Mejoramiento) antes de sanciones formales.',
        'Notificación clara y fundamentada de llamados de atención escritos.',
        'Garantía del derecho a la defensa y contradicción en descargos del aprendiz.'
      ]
    },
    {
      id: 'pol-2',
      title: 'Sistema Integrado de Gestión y Autocontrol (SIGA)',
      rolInstructor: 'Cumplimiento de estándares de calidad pedagógica, bioseguridad, gestión ambiental y seguridad de la información.',
      claves: [
        'Uso exclusivo de formatos vigentes en la plataforma CompromISO SENA.',
        'Cuidado y mantenimiento preventivo de máquinas y herramientas en ambientes.',
        'Gestión responsable de residuos y consumo eficiente en talleres.'
      ]
    },
    {
      id: 'pol-3',
      title: 'Código de Integridad del Servidor Público SENA',
      rolInstructor: 'Modelo de probidad, honestidad, respeto irrestricto, justicia y diligencia en el ejercicio docente.',
      claves: [
        'Trato digno, respetuoso y sin discriminación a todos los integrantes de la comunidad.',
        'Transparencia absoluta en la asignación de notas y juicios evaluativos.',
        'Cero tolerancia al acoso, soborno, favoritismo o cobros indebidos.'
      ]
    }
  ],
  responsabilidadesDocentes: [
    {
      norma: 'Evaluación y Calificación Oportuna',
      plazo: 'Máximo 5 días hábiles',
      detalle: 'Registrar la calificación cuantitativa o cualitativa y la retroalimentación formativa en Zajuna/SofiaPlus dentro de los 5 días hábiles siguientes a la entrega de la evidencia.',
      impacto: 'Garantiza el derecho fundamental consagrado en el Art. 5 del Acuerdo 0009 de 2024.'
    },
    {
      norma: 'Concertación de Planes de Mejoramiento',
      plazo: 'Inmediato tras juicio "No Aprobado"',
      detalle: 'Formular actividades pedagógicas complementarias para que el aprendiz alcance los resultados no logrados, fijando fechas límite razonables y seguimiento continuo.',
      impacto: 'Previene la deserción académica y promueve la superación formativa.'
    },
    {
      norma: 'Control Diario de Asistencia y Novedades',
      plazo: 'Día a día formativo',
      detalle: 'Registrar la asistencia presencial o virtual. Si un aprendiz acumula 3 días hábiles consecutivos de inasistencia injustificada, iniciar reporte a coordinación.',
      impacto: 'Cumplimiento del procedimiento institucional de novedades y debido proceso.'
    },
    {
      norma: 'Actualización en Plataformas Tecnológicas',
      plazo: 'Permanente',
      detalle: 'Mantener actualizados los anuncios, guías, foros y banco de recursos en el LMS institucional Zajuna.',
      impacto: 'Asegura la trazabilidad y calidad del proceso pedagógico.'
    }
  ],
  recursosDidacticos: [
    {
      nombre: 'Guía de Aprendizaje Tipo SENA (Formato GFPI-F-135)',
      tipo: 'Documento Maestro Pedagógico',
      formato: 'Word / PDF Editable',
      descripcion: 'Plantilla normalizada con secciones de Introducción, Identificación de la Guía, Actividades de Aprendizaje (Reflexión, Contextualización, Apropiación, Transferencia) y Glosario.'
    },
    {
      nombre: 'Banco de Instrumentos de Evaluación Normalizados',
      tipo: 'Evaluación Formativa',
      formato: 'Rúbricas & Listas de Chequeo',
      descripcion: 'Modelos de listas de verificación de producto y listas de chequeo de desempeño basadas en criterios de evaluación de programas titulados.'
    },
    {
      nombre: 'Formatos de Etapa Productiva (GFPI-F-023 y Bitácoras)',
      tipo: 'Seguimiento Laboral',
      formato: 'Formatos SIGA Oficiales',
      descripcion: 'Formato de concertación de actividades, plan de trabajo del coformador empresarial y registro de 12 bitácoras quincenales del aprendiz.'
    },
    {
      nombre: 'Acceso a Zajuna LMS y Bancos de Preguntas',
      tipo: 'Entornos Virtuales',
      formato: 'Plataforma Moodle SENA',
      descripcion: 'Repositorio de semillas de curso, bancos de reactivos de evaluación interactiva y aulas virtuales de entrenamiento.'
    }
  ]
};

