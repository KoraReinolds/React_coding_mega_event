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
      <path d="M0.820312 4.67969H9.17969L5 0.5L0.820312 4.67969Z" fill="#676C7A"/>
    </svg>
  )
}

export default SvgComponent
