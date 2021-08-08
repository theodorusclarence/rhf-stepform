import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useFormStore from '@/store/useFormStore';
import { stepTwoSchema } from '@/lib/yup';

import { StepTwoData } from '@/types';

import Seo from '@/components/Seo';
import Input from '@/components/Input';
import Button from '@/components/Button';
import UnstyledLink from '@/components/UnstyledLink';

export default function StepTwoPage() {
  const router = useRouter();

  const { stepTwo, setData } = useFormStore();

  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepTwoSchema),
    defaultValues: stepTwo || {},
  });
  const { handleSubmit } = methods;
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = (data: StepTwoData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    setData({ step: 2, data });
  };
  //#endregion action

  return (
    <>
      <Seo templateTitle='Step 2' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 2</h1>
            <div className='flex items-start mt-4'>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/step-1'
              >
                <HiChevronLeft />
              </UnstyledLink>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/step-3'
              >
                <HiChevronRight />
              </UnstyledLink>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <Input id='score_1' label='Score 1' />
                <Input id='score_2' label='Score 2' />
                <Input id='score_3' label='Score 3' />

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
