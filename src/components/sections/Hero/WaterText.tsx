import React from 'react'

export default function WaterText() {
  return (
    <svg
      className="fadedText absolute water-text-svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 720 105"
      aria-hidden="true"
    >
      <defs>
        <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
          <path
            fill="#0077be"
            d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
          />
        </pattern>
        <text
          id="water-txt"
          x="10"
          y="90"
          style={{ fontWeight: 'bold', fontSize: '90px', fontFamily: 'var(--font-primary), Arial, sans-serif' }}
        >
          Aditya Rai
        </text>
        <mask id="water-mask">
          <use xlinkHref="#water-txt" fill="#ffffff" />
        </mask>
      </defs>
      <g id="water-eff">
        <use xlinkHref="#water-txt" className="water-base-fill" />
        <rect className="water-fill" mask="url(#water-mask)" fill="url(#water)" x="-300" y="50" width="1200" height="120" opacity="0.3">
          <animate attributeType="xml" attributeName="x" from="-300" to="0" repeatCount="indefinite" dur="3s" />
        </rect>
        <rect className="water-fill" mask="url(#water-mask)" fill="url(#water)" y="45" width="1600" height="120" opacity="0.3">
          <animate attributeType="xml" attributeName="x" from="-400" to="0" repeatCount="indefinite" dur="4s" />
        </rect>
        <rect className="water-fill" mask="url(#water-mask)" fill="url(#water)" y="55" width="800" height="120" opacity="0.3">
          <animate attributeType="xml" attributeName="x" from="-200" to="0" repeatCount="indefinite" dur="2.4s" />
        </rect>
        <rect className="water-fill" mask="url(#water-mask)" fill="url(#water)" y="55" width="2000" height="120" opacity="0.3">
          <animate attributeType="xml" attributeName="x" from="-500" to="0" repeatCount="indefinite" dur="3.8s" />
        </rect>
      </g>
      <use xlinkHref="#water-eff" opacity="0.9" />
    </svg>
  )
}
