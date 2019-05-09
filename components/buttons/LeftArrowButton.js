import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import AbstractButton from './AbstractButton/index.js';

export default function LeftArrowButton({ className, onClick }) {
  return html`
    <${AbstractButton} className=${'LeftArrowButton ' + className} onClick=${onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <g transform="rotate(-45, 12, 12)">
          <path d="M 3,3 v 16 h 4 v -16 h -4 Z" />
          <path d="M 3,3 v 4 h 16 v -4 h -16 Z" />
        </g>
        <path d="M 4,10 v 4 h 20 v -4 h -20 Z" />
      </svg>
    </${AbstractButton}>
  `;
}
