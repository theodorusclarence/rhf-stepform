import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useFormStore from '@/store/useFormStore';
import { stepThreeSchema } from '@/lib/yup';

import { StepThreeData } from '@/types';

import Seo from '@/components/Seo';
import Button from '@/components/Button';
import UnstyledLink from '@/components/UnstyledLink';
import Input from '@/components/Forms/Input';
import DatePicker from '@/components/Forms/DatePicker';
import Select from '@/components/Forms/Select';
// @ts-ignore
const CustomMap = dynamic(() => import('@/components/CustomMap'), {
  ssr: false,
});

export default function StepThreePage() {
  const router = useRouter();

  const { stepOne, stepTwo, stepThree, setData } = useFormStore();

  // useEffect(() => {
  //   if (!stepOne) {
  //     toast.error('Please fill step one first');
  //     router.push('/form/step-1');
  //   } else if (!stepTwo) {
  //     toast.error('Please fill step two first');
  //     router.push('/form/step-2');
  //   }
  // }, [router, stepOne, stepTwo]);

  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepThreeSchema),
    defaultValues: stepThree || {
      lat: -6.1754,
      lng: 106.8272,
    },
  });
  const { handleSubmit } = methods;
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = (data: StepThreeData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    setData({ step: 3, data });
    router.push('/form/recap');
  };
  //#endregion action

  return (
    <>
      <Seo templateTitle='Step 3' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Step 3</h1>
            <div className='flex items-start mt-4'>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/step-2'
              >
                <HiChevronLeft />
              </UnstyledLink>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/recap'
              >
                <HiChevronRight />
              </UnstyledLink>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <DatePicker
                  id='birth_date'
                  label='Birth Date'
                  placeholder='Select your birth date'
                />
                <Select id='gender' label='Gender' placeholder='Choose gender'>
                  <option value='L'>Male</option>
                  <option value='P'>Female</option>
                </Select>

                <div className='flex gap-4'>
                  <Input id='lat' label='Lat' />
                  <Input id='lng' label='Long' />
                </div>
                <div className='mt-8'>
                  <CustomMap />
                </div>

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
