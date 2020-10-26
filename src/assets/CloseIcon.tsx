import React from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg__close"
    viewBox="0 0 32 32"
    vectorEffect="non-scaling-stroke"
  >
    <path fill="none" stroke="null" d="M-1 -1H33V33H-1z"></path>
    <g fill="none" strokeWidth="3">
      <ellipse cx="16" cy="16" rx="13.333" ry="13.588"></ellipse>
      <path
        d="M10.031 22.187L21.969 9.813"
      ></path>
      <path
        d="M10.031 22.187L21.969 9.813"
        transform="rotate(90 16 16)"
      ></path>
    </g>
  </svg>
);


export default CloseIcon;