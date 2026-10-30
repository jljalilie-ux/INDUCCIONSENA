import React, { useState } from 'react';

export const SENA_ESCUDO_URL = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

interface SenaEscudoProps {
  className?: string;
  alt?: string;
}

export const SenaEscudo: React.FC<SenaEscudoProps> = ({
  className = 'w-12 h-12',
  alt = 'Escudo Oficial del SENA'
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Graceful fallback to vector shield if image fails to load
    return (
      <svg
        viewBox="0 0 200 240"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
      >
        <path
          d="M20 30 C20 30, 100 15, 100 15 C100 15, 180 30, 180 30 C180 140, 155 190, 100 225 C45 190, 20 140, 20 30 Z"
          fill="#FFFFFF"
          stroke="#00324D"
          strokeWidth="6"
        />
        <path d="M24 33 C60 22, 140 22, 176 33 L174 65 C140 55, 60 55, 26 65 Z" fill="#00324D" />
        <text x="100" y="53" fill="#FFFFFF" fontSize="18" fontWeight="bold" textAnchor="middle">SENA</text>
        <path d="M26 65 L174 65" stroke="#00324D" strokeWidth="3" />
        <path d="M100 65 L100 145" stroke="#00324D" strokeWidth="3" />
        <path d="M28 145 L172 145" stroke="#00324D" strokeWidth="3" />
        <circle cx="60" cy="105" r="14" fill="#39A900" />
        <line x1="140" y1="85" x2="140" y2="125" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <line x1="100" y1="155" x2="100" y2="205" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <img
      src={SENA_ESCUDO_URL}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${className} object-contain inline-block shrink-0 drop-shadow-xs`}
      loading="eager"
    />
  );
};
