import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import AbstractButton from './AbstractButton/index.js';

export default function OkButton({ className, onClick }) {
  return html`
    <${AbstractButton} className=${'OkButton ' + className} onClick=${onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
        <path d="M 21.171573,3.0857863 9,15.257361 2.8284272,9.0857868 0,11.914214 l 9,9 15,-15.0000002 z" />
      </svg>
    </${AbstractButton}>
  `;
}
