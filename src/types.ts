export interface IVerb {
  id: number;
  nameRo: [string, number];
  nameRu: string;
  conjugation: {
    eu: string;
    tu: string;
    el: string;
    noi: string;
    voi: string;
    ei: string;
    eu1: string;
    tu1: string;
    el1: string;
    noi1: string;
    voi1: string;
    ei1: string;
    eu2?: string;
    tu2?: string;
    el2?: string;
    noi2?: string;
    voi2?: string;
    ei2?: string;
  };
  participle: string;
  impS: string;
  impP: string;
}

export enum Lang {
  ro = "Ro",
  ru = "Ru",
}

export enum Mode {
  dark = "dark",
  light = "light",
}
