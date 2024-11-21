import type { API } from './api';
import type { Table } from './table';

type Attributes = Config & {
  sections: Section[];
};

type Config = {
  footer?: string;
  logo?: Logo | null;
  title?: string;
};

export type Help = Config & {
  data?: API & {
    attributes: Attributes;
  };
};

type Logo = {
  alt?: string;
  src: string;
  width?: number;
};

type Section = {
  data?: { data: string | Table }[];
  heading?: string;
  id?: number;
};