import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useFormStore from '@/store/useFormStore';
import { stepTwoSchema } from '@/lib/yup';

import { StepTwoData } from '@/types';
type ParsedData = {
  identity_card_file: string[];
} & StepTwoData;

import Seo from '@/components/Seo';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import UnstyledLink from '@/components/UnstyledLink';
import DropzoneInput from '@/components/Forms/DropzoneInput';

export default function StepTwoPage() {
  const router = useRouter();
  const { stepOne, stepTwo, setData } = useFormStore();
  console.log(
    '🚀 ~ file: step-2.tsx ~ line 25 ~ StepTwoPage ~ stepTwo',
    stepTwo
  );

  const isPrefilled: boolean = stepTwo !== null;

  // useEffect(() => {
  //   if (!stepOne) {
  //     toast.error('Please fill step one first');
  //     router.push('/form/step-1');
  //   }
  // }, [router, stepOne, stepTwo]);

  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(stepTwoSchema),
    defaultValues: stepTwo || {},
  });
  const { handleSubmit, watch } = methods;

  const identity_card = watch('identity_card');
  console.log(
    '🚀 ~ file: step-2.tsx ~ line 48 ~ StepTwoPage ~ identity_card',
    identity_card
  );
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = async (data: StepTwoData) => {
    // eslint-disable-next-line no-console
    console.log(data);
    const parsedData: ParsedData = {
      ...data,
      identity_card_file: [URL.createObjectURL(data.identity_card[0])],
    };
    console.log(
      '🚀 ~ file: step-2.tsx ~ line 46 ~ onSubmit ~ parsedData',
      parsedData
    );
    setData({ step: 2, data: parsedData });

    var formData = new FormData();

    const blob = await fetch(parsedData.identity_card_file[0]).then((r) =>
      r.blob()
    );
    formData.append('identity_card', parsedData.identity_card[0]);
    formData.append('identity_card_file', blob);

    fetch('https://dummyapi.io/data/api/post', {
      // content-type header should not be specified!
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        // Do something with the successful response
      })
      .catch((error) => console.log(error));
    // router.push('/form/step-3');
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
                {/* <DropzoneInput
                  readOnly={isPrefilled}
                  label='Score File'
                  id='score_file'
                  accept='image/png, image/jpg, image/jpeg'
                  helperText='You can only drop .jpg, .jpeg, or .png file here'
                  maxFiles={3}
                /> */}
                <DropzoneInput
                  readOnly={isPrefilled && !!identity_card?.length}
                  editable={isPrefilled && !!identity_card?.length}
                  label='Identity Card'
                  id='identity_card'
                  accept='application/pdf'
                  helperText='You can only drop .pdf file here'
                  maxFiles={1}
                />

                <Button type='submit'>Next</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
