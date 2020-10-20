import React from "react";

function MIcon({color="#000"}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 980 1619'
    >
      <defs>
        <linearGradient
          id='linearGradient1480'
          x1='39.5'
          x2='920.5'
          y1='660'
          y2='660'
          gradientTransform='matrix(1 0 0 1.0012 .002 -.047)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0'></stop>
        </linearGradient>
      </defs>
      <g fill='none' stroke={color} transform='translate(9.998 287.46)'>
        <rect
          width='880'
          height='1241.5'
          x='40.001'
          y='40.001'
          // stroke='url(#linearGradient1480)'
          strokeWidth='100'
          rx='0.1'
        ></rect>
        <g stroke={color}>
          <path
            strokeLinejoin='round'
            strokeWidth='100'
            d='M40 40l553.66-277.46L600 40'
          ></path>
          <path
            strokeWidth='91.287'
            d='M680 760s-3.083-24.602-11.741-56.6C652.26 644.265 609.777 560 479.999 560c-129.45 0-169.95 84.72-186.06 143.83-8.78 32.218-13.937 56.169-13.937 56.169zM480 480v-40'
          ></path>
          <path
            strokeLinecap='round'
            strokeWidth='92.582'
            d='M240 880h480'
          ></path>
        </g>
        <path d='M360 600l40 40'></path>
      </g>
    </svg>
  );
}

export default MIcon;