import { type Table } from './table';

export type Help = {
  footer: string;
  sections: {
    data: { data: string | Table }[];
    heading?: string;
    id: number;
  }[];
  title: string;
};