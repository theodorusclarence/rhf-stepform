import * as yup from 'yup';
import { LatLong, StepOneData, StepThreeData, StepTwoData } from '@/types';

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
  score_file: yup.mixed(),
  identity_card: yup.mixed().required('File is required'),
});

// @ts-ignore - override correct yup type
// https://github.com/jquense/yup/issues/1183
export const requiredDateSchema: yup.SchemaOf<Date> = yup
  .date()
  .required('Birth date is required');

export const stepThreeSchema: yup.SchemaOf<StepThreeData> = yup.object().shape({
  // yup date
  birth_date: requiredDateSchema,
  gender: yup.string().required('Gender is required'),
  lat: yup.number().typeError('Must be a number').required('Lat is required'),
  lng: yup.number().typeError('Must be a number').required('Long is required'),
});

export const mapSchema: yup.SchemaOf<LatLong> = yup.object().shape({
  lat: yup.number().typeError('Must be a number').required('Lat is required'),
  lng: yup.number().typeError('Must be a number').required('Long is required'),
});
