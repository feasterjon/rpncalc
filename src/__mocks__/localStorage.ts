type MockLocalStorage = {
  clear: () => void;
  getAll: () => object;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
};

type Store = { [key: string]: string };

export const mockLocalStorage = (): MockLocalStorage => {
  let store: Store = {};

  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
    getAll: () => {
      return store;
    }
  };
};