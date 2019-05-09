import React from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import CrossButton from '../buttons/CrossButton.js';
import PlusButton from '../buttons/PlusButton.js';

function previousDateTime(date) {
  const previous = new Date(date);
  previous.setHours(0, 0, 0, 0);
  previous.setDate(previous.getDate() - 1);
  return previous.valueOf();
}

function Check({ habitName, time, checked, toggleCheck }) {
  const onClick = () => toggleCheck(habitName, time);

  let className = 'check';
  className += checked ? ' checked' : '';

  const disabled = time < previousDateTime(new Date());

  // Buttons always contain the check, its visibility is controlled with a class name and CSS
  return html`<${CrossButton} className=${className} disabled=${disabled} onClick=${onClick} />`;
}

export default function HabitList(props) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const allTimes = props.habits.map(h => h.checkTimes).flat();
  const earliestCheckTime = Math.min(todayDate.valueOf(), ...allTimes);
  const latestCheckTime = Math.max(todayDate.valueOf(), ...allTimes);

  const Habit = ({ name, checkTimes }) => {
    const checks = [];
    for (let cur = latestCheckTime; cur >= earliestCheckTime; cur = previousDateTime(cur)) {
      checks.push({
        time: cur,
        checked: checkTimes.some(checkTime => cur >= checkTime && checkTime > previousDateTime(cur)),
      });
    }

    return html`
      <div className="Habit">
        <header onClick=${() => props.startEditingHabit(name)}>${name}</header>

        ${checks.map(check => html`
          <${Check}
            key=${check.time}
            habitName=${name}
            time=${check.time}
            checked=${check.checked}
            toggleCheck=${props.toggleHabitCheckTime}
          />
        `)}
      </div>
    `;
  };

  const sortedHabits = [...props.habits].sort((a, b) => a.name.localeCompare(b.name));

  return html`
    <div className="HabitList">
      ${sortedHabits.map((habit) => html`
        <${Habit} key=${habit.name} name=${habit.name} checkTimes=${habit.checkTimes} />
      `)}

      <div className="AddHabitButtonWrapper">
        <${PlusButton} onClick={${props.startAddingHabit}} />
      </div>
    </div>
  `;
}
