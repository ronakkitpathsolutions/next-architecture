const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
};
