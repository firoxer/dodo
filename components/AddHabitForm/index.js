import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import LeftArrowButton from '../buttons/LeftArrowButton.js';
import PlusButton from '../buttons/PlusButton.js';

export default function AddHabitForm(props) {
  const inputRef = React.createRef();

  const onSubmit = () => {
    props.onAdd(inputRef.current.value);
  };

  return html`
    <div key="cancel" className="AddHabitFormCancel">
      <${LeftArrowButton} onClick=${props.onCancel} />
    </div>

    <form key="add" className="AddHabitForm" onSubmit=${onSubmit}>
      <input autoFocus maxLength="24" ref=${inputRef} type="text" />
      <${PlusButton} onClick=${onSubmit} />
    </form>
  `;
}
