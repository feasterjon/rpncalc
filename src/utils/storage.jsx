export const storage = {
  getItem: (keyName) => {
    const keyValue = localStorage.getItem(`${storage.prefix}${keyName}`);
    try {
      return JSON.parse(keyValue)
    } catch (error) {
      return keyValue
    }
  },
  prefix: '',
  removeItem: (keyName) => {
    localStorage.removeItem(`${storage.prefix}${keyName}`);
  },
  setItem: (keyName, keyValue) => {
    localStorage.setItem(`${storage.prefix}${keyName}`,
      typeof keyValue === 'object' ? JSON.stringify(keyValue) : keyValue
    );
  }
};