import type { Table } from './table';

export type Help = {
  api?: string;
  footer?: string;
  logo?: Logo | null;
  sections?: Section[];
  storage?: { prefix?: string };
  title?: string;
};

type Logo = {
  alt?: string;
  src: string;
  width?: number;
};

export type Section = {
  data?: { data: string | Table }[];
  heading?: string;
  id?: number;
};