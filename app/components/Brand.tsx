export const BRAND = {
  name: 'Saldão de Joias Cortantes',
  Icon: ({ size = 44 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 160 160" role="img" aria-label="Ícone Saldão de Joias Cortantes">
      <defs>
        <linearGradient id="jcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4cc2ff"/>
          <stop offset="1" stopColor="#7c5cff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="160" fill="transparent"/>
      <g transform="translate(12,16)">
        <path d="M20 84 L130 24 Q140 20 148 28 L68 104 Q56 114 44 106 Z" fill="url(#jcGrad)"/>
        <path d="M136 40 L64 100" stroke="#e6eeff" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round"/>
        <rect x="14" y="74" width="42" height="24" rx="12" fill="url(#jcGrad)"/>
        <circle cx="36" cy="86" r="4" fill="#0b0f14"/>
      </g>
    </svg>
  ),
  Logo: () => (
    <svg width="260" height="56" viewBox="0 0 760 160" role="img" aria-label="Saldão de Joias Cortantes">
      <defs>
        <linearGradient id="jcGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4cc2ff"/>
          <stop offset="1" stopColor="#7c5cff"/>
        </linearGradient>
      </defs>
      <g transform="translate(0,16)">
        <path d="M24 92 L138 38 Q152 32 162 44 L76 124 Q60 136 46 126 Z" fill="url(#jcGrad2)"/>
        <path d="M146 54 L70 120" stroke="#e6eeff" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round"/>
        <rect x="16" y="80" width="40" height="22" rx="11" fill="url(#jcGrad2)"/>
        <circle cx="38" cy="91" r="3.6" fill="#0b0f14"/>
      </g>
      <g fontFamily="ui-sans-serif, system-ui, -apple-system">
        <text x="200" y="64" fontSize="28" fontWeight="700" fill="#e6eeff" letterSpacing=".4">SALDÃO DE JOIAS</text>
        <text x="200" y="120" fontSize="56" fontWeight="800" fill="url(#jcGrad2)" letterSpacing=".6">CORTANTES</text>
      </g>
    </svg>
  ),
};
