export const storage = {
  getItem: (keyName) => {
    const keyValue = window.localStorage.getItem(`${storage.prefix}${keyName}`);
    try {
      return JSON.parse(keyValue)
    } catch (error) {
      return keyValue
    }
  },
  prefix: '',
  removeItem: (keyName) => {
    window.localStorage.removeItem(`${storage.prefix}${keyName}`);
  },
  setItem: (keyName, keyValue) => {
    window.localStorage.setItem(`${storage.prefix}${keyName}`,
      typeof keyValue === 'object' ? JSON.stringify(keyValue) : keyValue
    );
  }
};