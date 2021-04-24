import * as React from "react"

function SvgComponent({ onClick }) {
  return (
    <svg
      onClick={ onClick }
      width={10}
      height={5}
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.82.32h8.36L5 4.5.82.32z" fill="#676C7A" />
    </svg>
  )
}

export default SvgComponent
