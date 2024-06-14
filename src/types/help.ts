import type { Table } from './table';

export type Help = {
  api?: string | null;
  footer?: string | null;
  sections?: Section[];
  title?: string;
};

export type Section = {
  data?: { data: string | Table }[];
  heading?: string;
  id?: number;
};