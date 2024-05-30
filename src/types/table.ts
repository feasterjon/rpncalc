export type Table = {
  data: {
    data: string[];
    id: number;
  }[];
  headings: {
    id: number;
    name: string;
  }[];
  type?: string;
  width?: number;
};