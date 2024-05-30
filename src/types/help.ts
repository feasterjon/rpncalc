export type Help = {
  footer: string;
  sections: {
    data: { data: string | Table }[];
    heading?: string;
    id: number;
  }[];
  title: string;
};

type Table = {
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