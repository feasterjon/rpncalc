export type Button = {
  aria?: string;
  icon?: { id: string; styles?: string };
  id: number;
  label?: string;
  name?: string;
  order?: string;
  type?: string;
  value: string;
  valueMath?: number;
  styles?: {
    [key: string]: string;
  };
};

export type Keyboard = {
  buttons: {
    data?: Button[];
    styles: {
      [key: string]: {
        active: string;
        etc: string;
        main?: string;
      };
    };
  };
  vibrateEnabled?: boolean;
};