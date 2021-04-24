import * as React from "react"

function SvgComponent({ onClick }) {
  return (
    <svg
      onClick={ onClick }
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={12} cy={12} r={4} fill="#fff" />
      <path
        d="M3 12c5-8 13-8 18 0M3 12c5 8 13 8 18 0"
        stroke="#fff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default SvgComponent
