import React, { ReactDOM } from 'https://unpkg.com/es-react@16.12.0';
import htm from 'https://unpkg.com/htm@2.1.1?module';
const html = htm.bind(React.createElement);

import Dodo from './components/Dodo/index.js';

import HabitStore from './store/habit-store.js';
import DemoHabitStore from './store/demo-habit-store.js';

let renderDodo;
const isDemo = new URL(document.URL).searchParams.get('demo') === 'true';
if (isDemo) {
  renderDodo = () => {
    ReactDOM.render(
      html`<${Dodo} habitStore={${new DemoHabitStore()}} />`,
      document.getElementById('root')
    );
  };
} else {
  const realHabitStore = new HabitStore(
    () => JSON.parse(localStorage.getItem('habits')),
    (habits) => localStorage.setItem('habits', JSON.stringify(habits)),
  );
  renderDodo = () => {
    ReactDOM.render(
      html`<${Dodo} habitStore={${realHabitStore}} />`,
      document.getElementById('root')
    );
  };
}

renderDodo();

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    renderDodo();
  }
}, false);
