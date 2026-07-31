import { useEffect, useState } from "react";

const TaxIllustration = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circles - animated */}
      <circle 
        cx="400" 
        cy="100" 
        r="80" 
        fill="url(#accentGradient)" 
        opacity="0.1"
        className={`transition-all duration-1000 ${isVisible ? 'scale-100' : 'scale-0'}`}
        style={{ transformOrigin: '400px 100px' }}
      />
      <circle 
        cx="100" 
        cy="400" 
        r="60" 
        fill="url(#accentGradient)" 
        opacity="0.1"
        className={`transition-all duration-1000 delay-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
        style={{ transformOrigin: '100px 400px' }}
      />

      {/* Main house structure */}
      <g className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* House base */}
        <rect
          x="150"
          y="220"
          width="200"
          height="180"
          rx="8"
          fill="url(#houseGradient)"
          filter="url(#glow)"
        />
        
        {/* Roof */}
        <path
          d="M 140 220 L 250 140 L 360 220 Z"
          fill="#3b82f6"
          opacity="0.9"
        />
        
        {/* Chimney */}
        <rect
          x="280"
          y="160"
          width="30"
          height="60"
          rx="4"
          fill="#60a5fa"
          opacity="0.8"
        />

        {/* Door */}
        <rect
          x="220"
          y="320"
          width="60"
          height="80"
          rx="6"
          fill="#3b82f6"
          opacity="0.7"
        />
        
        {/* Windows */}
        <rect
          x="170"
          y="250"
          width="50"
          height="50"
          rx="4"
          fill="#93c5fd"
          opacity="0.6"
        />
        <rect
          x="280"
          y="250"
          width="50"
          height="50"
          rx="4"
          fill="#93c5fd"
          opacity="0.6"
        />
      </g>

      {/* Floating document/checklist - animated */}
      <g className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
        {/* Document */}
        <rect
          x="70"
          y="180"
          width="100"
          height="130"
          rx="8"
          fill="white"
          opacity="0.95"
          filter="url(#glow)"
        />
        
        {/* Checkmarks */}
        <g>
          <circle cx="95" cy="210" r="8" fill="#22c55e" opacity="0.9"/>
          <path d="M 92 210 L 95 213 L 100 206" stroke="white" strokeWidth="2" fill="none"/>
          
          <circle cx="95" cy="240" r="8" fill="#22c55e" opacity="0.9"/>
          <path d="M 92 240 L 95 243 L 100 236" stroke="white" strokeWidth="2" fill="none"/>
          
          <circle cx="95" cy="270" r="8" fill="#22c55e" opacity="0.9"/>
          <path d="M 92 270 L 95 273 L 100 266" stroke="white" strokeWidth="2" fill="none"/>
        </g>
        
        {/* Text lines */}
        <line x1="110" y1="210" x2="155" y2="210" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="110" y1="240" x2="155" y2="240" stroke="#94a3b8" strokeWidth="2"/>
        <line x1="110" y1="270" x2="155" y2="270" stroke="#94a3b8" strokeWidth="2"/>
      </g>

      {/* Money/Savings symbol - animated */}
      <g className={`transition-all duration-1000 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
        {/* Coin/Badge background */}
        <circle
          cx="380"
          cy="300"
          r="45"
          fill="#22c55e"
          opacity="0.9"
          filter="url(#glow)"
        />
        
        {/* Pound symbol */}
        <text
          x="380"
          y="320"
          fontSize="48"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          fontFamily="Arial"
        >
          £
        </text>
      </g>

      {/* Calculator/Stats icon - animated */}
      <g className={`transition-all duration-1000 delay-1200 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} style={{ transformOrigin: '90px 350px' }}>
        <rect
          x="60"
          y="330"
          width="60"
          height="80"
          rx="6"
          fill="white"
          opacity="0.95"
          filter="url(#glow)"
        />
        
        {/* Calculator display */}
        <rect
          x="70"
          y="340"
          width="40"
          height="20"
          rx="2"
          fill="#3b82f6"
          opacity="0.7"
        />
        
        {/* Calculator buttons */}
        <g fill="#e0e7ff">
          <rect x="72" y="370" width="10" height="10" rx="2"/>
          <rect x="87" y="370" width="10" height="10" rx="2"/>
          <rect x="102" y="370" width="10" height="10" rx="2"/>
          <rect x="72" y="385" width="10" height="10" rx="2"/>
          <rect x="87" y="385" width="10" height="10" rx="2"/>
          <rect x="102" y="385" width="10" height="10" rx="2"/>
        </g>
      </g>

      {/* Sparkles/Stars - animated */}
      <g opacity="0.8">
        <path d="M 420 180 L 423 190 L 417 190 Z" fill="#fbbf24"/>
        <path d="M 420 200 L 417 190 L 423 190 Z" fill="#fbbf24"/>
        
        <path d="M 130 150 L 133 160 L 127 160 Z" fill="#fbbf24"/>
        <path d="M 130 170 L 127 160 L 133 160 Z" fill="#fbbf24"/>
      </g>

      {/* Percentage badge - animated */}
      <g className={`transition-all duration-1000 delay-1400 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} style={{ transformOrigin: '380px 180px' }}>
        <circle cx="380" cy="180" r="30" fill="#ef4444" opacity="0.9"/>
        <text x="380" y="193" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">%</text>
      </g>
    </svg>
  );
};

export default TaxIllustration;
