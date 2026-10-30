export interface Apprentice {
  id: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  ficha: string;
  regional: string;
  centroFormacion: string;
  status: 'aprobado' | 'en_progreso' | 'no_iniciado';
  score?: number; // 0 - 100
  completedAt?: string;
  attemptsCount: number;
  inductionProgress?: number;
  consentLaw1581?: boolean;
  consentTimestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  categoryBreakdown?: {
    identidad: number;
    derechos: number;
    deberes: number;
    tramitesYEtapa: number;
  };
}

export interface Question {
  id: string;
  category: 'identidad' | 'derechos' | 'deberes' | 'tramitesYEtapa';
  categoryLabel: string;
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  regulatoryReference: string; // e.g. "Acuerdo 0009 de 2024 - Art. 5"
}

export interface PracticalDilemma {
  id: string;
  title: string;
  situation: string;
  category: string;
  choices: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    legalArticle: string;
  }[];
}

export interface InstitutionalSymbol {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  elements: {
    name: string;
    meaning: string;
  }[];
}

export interface InstructorUser {
  id: string;
  fullName: string;
  documentNumber: string;
  institutionalEmail: string;
  role: 'instructor';
  regional: string;
  centroFormacion: string;
  areaEspecialidad: string;
  fichasAsignadas: string[];
}

export interface InstructorSession {
  instructor: InstructorUser;
  token: string;
  authenticatedAt: string;
  expiresAt: string;
}

export type UserRole = 'aprendiz' | 'instructor';

