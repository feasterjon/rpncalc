export const setNavigatorOnline = (online: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    get: () => online,
  });
};

export const simulateNetworkChange = (online: boolean) => {
  setNavigatorOnline(online);
  window.dispatchEvent(new Event(online ? 'online' : 'offline'));
};
