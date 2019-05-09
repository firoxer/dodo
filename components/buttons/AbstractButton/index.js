import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

export default function AbstractButton({ children, className, disabled, onClick }) {
  return html`
    <button className=${'AbstractButton ' + className} disabled=${disabled} onClick=${onClick} type="button">
      ${children}
    </button>
  `;
}
