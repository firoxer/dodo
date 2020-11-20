export default class HabitStore {
  constructor(getFromPersistentStore, setToPersistentStore) {
    this.getFromPersistentStore = getFromPersistentStore;
    this.setToPersistentStore = setToPersistentStore;

    try {
      this.habits = getFromPersistentStore() || [];
    } catch {
      this.habits = [];
    }
  }

  getAll() {
    return this.habits.filter(h => !h.removed)
  }

  addHabit(name) {
    if (!name) {
      return this.getAll();
    }

    const formerlyRemovedHabit = this.habits.find(h => h.name === name);
    if (formerlyRemovedHabit) {
      delete formerlyRemovedHabit.removed;
      return this.getAll();
    }

    this.habits.push({ name, checkTimes: [] });

    this.setToPersistentStore(this.habits);

    return this.getAll();
  }

  removeHabit(name) {
    if (!name) {
      return this.getAll();
    }

    const removedHabit = this.habits.find(h => h.name === name);

    if (!removedHabit) {
      console.debug(`Tried to remove a habit that does not exist, "${name}"`);
      return this.getAll();
    }

    removedHabit.removed = true;

    this.setToPersistentStore(this.habits);

    return this.getAll();
  }

  renameHabit(oldName, newName) {
    if (!oldName || !newName || oldName === newName) {
      return this.getAll();
    }

    if (this.habits.some(h => h.name === newName)) {
      console.debug(`Tried to rename a habit to something that already exists, "${newName}"`);
      return this.getAll();
    }

    const renamedHabit = this.habits.find(h => h.name === oldName);
    if (!renamedHabit) {
      console.error(`Tried to rename unknown habit "${newName}"`);
      return this.getAll();
    }

    renamedHabit.name = newName;

    this.setToPersistentStore(this.habits);

    return this.getAll();
  }

  toggleHabitCheckTime(name, toggledCheckTime) {
    const toggledHabit = this.habits.find(h => h.name === name);
    if (!toggledHabit) {
      console.error(`Tried to toggle check of unknown habit "${name}"`);
      return this.getAll();
    }

    let newHabit;
    if (toggledHabit.checkTimes.includes(toggledCheckTime)) {
      newHabit = {
        ...toggledHabit,
        checkTimes: toggledHabit.checkTimes.filter(checkTime => checkTime !== toggledCheckTime)
      };
    } else {
      newHabit = {
        ...toggledHabit,
        checkTimes: [...toggledHabit.checkTimes, toggledCheckTime],
      };
    }

    this.habits = [
      ...this.habits.filter(h => h.name !== name),
      newHabit,
    ];

    this.setToPersistentStore(this.habits);

    return this.getAll();
  }
}
