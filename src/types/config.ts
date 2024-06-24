import type { Help } from './help';
import type { Keyboard } from './keyboard';

type Brand = {
  logo?: {
    colors?: {
      dark?: string,
      main: string
    },
    width?: number
  }
};

export type Config = {
  brand?: Brand;
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