import React, { Fragment } from 'react';

export const Laptop = (props) =>
(
  <g className="laptop">
    <path d="M143 833C143 817.536 155.536 805 171 805H853C868.464 805 881 817.536 881 833V1029H143V833Z" fill="#C4C4C4"/>
    <path  d="M163 839C163 830.163 170.163 823 179 823H846C854.837 823 862 830.163 862 839V1029H163V839Z" fill="white"/>
    <g transform={"translate(200,870)"}>
      <rect></rect>
      <text className="laptopText" alignmentBaseline="middle">{props.message}</text>
    </g>
  </g>
)
