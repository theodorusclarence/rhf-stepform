import * as yup from 'yup';
import { StepOneData, StepTwoData } from '@/types';

export const stepOneSchema: yup.SchemaOf<StepOneData> = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Need to be a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  age: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .integer('Must be a number')
    .required('Age is required'),
  phone: yup
    .string()
    .matches(/^\+628[1-9][0-9]{8,11}$/, 'Must use +62 format')
    .required('Phone is required'),
});

export const stepTwoSchema: yup.SchemaOf<StepTwoData> = yup.object().shape({
  score_1: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  score_2: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  score_3: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be a positive value')
    .lessThan(101, 'Max score is 100')
    .required('Age is required'),
  score_file: yup.mixed().required('File is required'),
});