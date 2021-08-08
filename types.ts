import { RequiredDateSchema } from 'yup/lib/date';

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
  score_file: any | File;
};

export type StepThreeData = {
  birth_date: any;
  gender: string | 'L' | 'P';
};
