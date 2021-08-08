import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useFormStore from '@/store/useFormStore';
import { stepOneSchema } from '@/lib/yup';

import { StepOneData } from '@/types';

import Seo from '@/components/Seo';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import UnstyledLink from '@/components/UnstyledLink';

export default function StepOnePage() {
  const router = useRouter();

  const { stepOne, setData } = useFormStore();

  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepOneSchema),
    defaultValues: stepOne || {},
  });
  const { handleSubmit } = methods;
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = (data: StepOneData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    setData({ step: 1, data });
    router.push('/form/step-2');
  };
  //#endregion action

  return (
    <>
      <Seo templateTitle='Step 1' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 1</h1>
            <div className='flex items-start mt-4'>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/'
              >
                <HiChevronLeft />
              </UnstyledLink>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/step-2'
              >
                <HiChevronRight />
              </UnstyledLink>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
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
