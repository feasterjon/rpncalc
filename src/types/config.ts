import type { Help } from './help';
import type { Keyboard } from './keyboard';

export type Config = {
  help: Help;
  hScreen?: boolean;
  input: Keyboard;
  storage: { prefix: string };
  themes: Theme[];
};

export type Theme = {
  icon: string;
  id: number;
  label: string;
  name: string;
};