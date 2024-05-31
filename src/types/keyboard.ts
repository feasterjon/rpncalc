export type Button = {
  aria: string;
  icon: { id?: string; styles?: string };
  id: number;
  label: string;
  order: string;
  stylesType: { etc: string; main?: string; active?: string };
  type: string;
  value: string;
};

export type ConfigButton = {
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
    data?: ConfigButton[];
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