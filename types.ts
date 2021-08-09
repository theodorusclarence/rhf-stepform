export type StepOneData = {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
};

export type StepTwoData = {
  score_1: number;
  score_2: number;
  score_3: number;
  score_file: any;
  identity_card: any;
};

export type StepThreeData = {
  birth_date: Date;
  gender: string;
  lat: number;
  lng: number;
};

export type FormData = StepOneData & StepTwoData & StepThreeData;

export type LatLong = {
  lat: number;
  lng: number;
};
