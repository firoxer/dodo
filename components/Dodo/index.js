import React, { useState, useEffect } from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import AddHabitForm from '../AddHabitForm/index.js';
import EditHabitForm from '../EditHabitForm/index.js';
import HabitList from '../HabitList/index.js';

const MODE_ADD = 'add';
const MODE_VIEW = 'view';
const MODE_EDIT = 'edit';

export default function Dodo({ habitStore }) {
  const [mode, setMode] = useState(MODE_VIEW);
  const [editedHabitName, setEditedHabitName] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(habitStore.getAll());
  }, []);

  const startAddingHabit = () => {
    setMode(MODE_ADD);
  };

  const startEditingHabit = (habitName) => {
    setMode(MODE_EDIT);
    setEditedHabitName(habitName);
  };

  const addHabit = (name) => {
    startAddingHabit();
    setHabits(habitStore.addHabit(name));
  };

  const removeHabit = (name) => {
    startAddingHabit();
    setHabits(habitStore.removeHabit(name));
  };

  const renameHabit = (newName) => {
    startAddingHabit();
    setHabits(habitStore.renameHabit(editedHabitName, newName));
  }

  const toggleHabitCheckTime = (habitName, time) => {
    setHabits(habitStore.toggleHabitCheckTime(habitName, time));
  };

  switch (mode) {
    case MODE_ADD:
      return html`
        <${AddHabitForm} onAdd=${addHabit} onCancel=${startAddingHabit} />
      `;

    case MODE_EDIT:
      return html`
        <${EditHabitForm}
          name=${editedHabitName}
          onCancel=${startAddingHabit}
          onEdit=${renameHabit}
          onRemove=${removeHabit}
        />
      `;

    case MODE_VIEW:
    default:
      return html`
        <${HabitList}
          habits=${habits}
          startAddingHabit=${startAddingHabit}
          startEditingHabit=${startEditingHabit}
          toggleHabitCheckTime=${toggleHabitCheckTime}
        />
      `;
  }
}
