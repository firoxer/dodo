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

  const resumeViewing = () => {
    setEditedHabitName(null);
    setMode(MODE_VIEW);
  };

  const addHabit = (name) => {
    setHabits(habitStore.addHabit(name));
    resumeViewing();
  };

  const removeHabit = (name) => {
    setHabits(habitStore.removeHabit(name));
    resumeViewing();
  };

  const renameHabit = (newName) => {
    setHabits(habitStore.renameHabit(editedHabitName, newName));
    resumeViewing();
  }

  const toggleHabitCheckTime = (habitName, time) => {
    setHabits(habitStore.toggleHabitCheckTime(habitName, time));
  };

  switch (mode) {
    case MODE_ADD:
      return html`
        <${AddHabitForm} onAdd=${addHabit} onCancel=${resumeViewing} />
      `;

    case MODE_EDIT:
      return html`
        <${EditHabitForm}
          name=${editedHabitName}
          onCancel=${resumeViewing}
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
