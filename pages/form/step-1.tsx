import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import Seo from '@/components/Seo';
import Input from '@/components/Input';
import Button from '@/components/Button';

type StepOneData = {
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
};

const stepOneSchema: yup.SchemaOf<StepOneData> = yup.object().shape({
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

export default function StepOnePage() {
  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepOneSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: StepOneData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  //#endregion forms

  return (
    <>
      <Seo templateTitle='Step 1' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 1</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-12 space-y-4'
              >
                <Input label='Nama' id='name' />
                <Input id='email' label='Email' />
                <Input id='password' label='Password' />
                <Input id='age' label='Age' />
                <Input id='phone' label='Phone' helperText='Use +62 format' />

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
