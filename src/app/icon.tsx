import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head Profile Outline */}
          <path
            d="M30 75C25 70 20 60 20 50C20 35 35 20 50 20C65 20 80 35 80 50C80 65 65 80 50 80"
            stroke="url(#logo-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          
          {/* Neural Pathways */}
          <path
            d="M45 25C55 25 65 35 65 50C65 65 55 75 45 75"
            stroke="url(#logo-gradient)"
            strokeWidth="4"
          />
          <path
            d="M55 35C65 35 75 45 75 60C75 75 65 85 55 85"
            stroke="url(#logo-gradient)"
            strokeWidth="3"
          />

          {/* Neural Nodes */}
          <circle cx="45" cy="25" r="5" fill="url(#logo-gradient)" />
          <circle cx="65" cy="50" r="5" fill="url(#logo-gradient)" />
          <circle cx="45" cy="75" r="5" fill="url(#logo-gradient)" />
          <circle cx="55" cy="35" r="5" fill="url(#logo-gradient)" />
          <circle cx="75" cy="60" r="5" fill="url(#logo-gradient)" />
          <circle cx="55" cy="85" r="5" fill="url(#logo-gradient)" />

          {/* Definitions */}
          <defs>
            <linearGradient id="logo-gradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size }
  )
}
