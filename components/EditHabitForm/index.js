import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import CrossButton from '../buttons/CrossButton.js';
import LeftArrowButton from '../buttons/LeftArrowButton.js';
import OkButton from '../buttons/OkButton.js';

export default function EditHabitForm(props) {
  const inputRef = React.createRef();

  const onSubmit = () => {
    props.onEdit(inputRef.current.value);
  };

  const onRemove = () => {
    props.onRemove(props.name);
  };

  // The input is wrapped in a div to prevent it from stretching like a flex item
  return html`
    <div className="EditHabitFormCancel">
      <${LeftArrowButton} onClick=${props.onCancel} />
    </div>

    <form className="EditHabitForm" onSubmit=${onSubmit}>
      <div className="EditHabitFormInputWrapper">
        <input autoFocus defaultValue=${props.name} maxLength="24" ref=${inputRef} type="text" />
      </div>

      <${OkButton} onClick=${onSubmit} />

      <${CrossButton} onClick=${onRemove} />
    </form>
  `;
}
