import HabitStore from './habit-store.js';

const minusDays = (days) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d.valueOf();
}
let fakeHabits = [
  {
    name: 'ambush cats',
    checkTimes: [minusDays(3), minusDays(4), minusDays(5), minusDays(6), minusDays(7)],
  },
  {
    name: 'bark at door',
    checkTimes: [minusDays(0), minusDays(1), minusDays(2), minusDays(3), minusDays(4), minusDays(5), minusDays(6), minusDays(7), minusDays(8), minusDays(9), minusDays(10)],
  },
  {
    name: 'chew bone',
    checkTimes: [minusDays(0), minusDays(1), minusDays(2), minusDays(5), minusDays(6)],
  },
  {
    name: 'sniff butts',
    checkTimes: [minusDays(1), minusDays(2), minusDays(3), minusDays(4), minusDays(9)],
  },
];

export default class DemoHabitStore extends HabitStore {
  constructor() {
    super(
      () => {
        return fakeHabits;
      },
      (habits) => {
        fakeHabits = habits;
      },
    );
  }
}
