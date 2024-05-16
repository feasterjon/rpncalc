type Storage = {
  getItem: (keyName: string) => string | object;
  prefix: string;
  removeItem: (keyName: string) => void;
  setItem: (keyName: string, keyValue: string | object) => void;
}

export const storage: Storage = {
  getItem: (keyName: string) => {
    const keyValue = window.localStorage.getItem(`${storage.prefix}${keyName}`);
    try {
      return JSON.parse(keyValue!)
    } catch (error) {
      return keyValue
    }
  },
  prefix: '',
  removeItem: (keyName: string) => {
    window.localStorage.removeItem(`${storage.prefix}${keyName}`);
  },
  setItem: (keyName: string, keyValue: string | object) => {
    window.localStorage.setItem(`${storage.prefix}${keyName}`,
      typeof keyValue === 'object' ? JSON.stringify(keyValue) : keyValue
    );
  }
};