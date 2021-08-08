import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import useFormStore from '@/store/useFormStore';

import { FormData } from '@/types';

import Seo from '@/components/Seo';
import Button from '@/components/Button';
import UnstyledLink from '@/components/UnstyledLink';
import DatePicker from '@/components/Forms/DatePicker';
import Select from '@/components/Forms/Select';
import Input from '@/components/Forms/Input';
import PasswordInput from '@/components/Forms/PasswordInput';
import CustomLink from '@/components/CustomLink';

export default function RecapPage() {
  const router = useRouter();

  const { stepOne, stepTwo, stepThree, setData } = useFormStore();

  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: { ...stepOne, ...stepTwo, ...stepThree },
  });
  const { handleSubmit } = methods;
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  //#endregion action

  return (
    <>
      <Seo templateTitle='Recap' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Recap</h1>
            <div className='flex items-start mt-4'>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='/form/step-3'
              >
                <HiChevronLeft />
              </UnstyledLink>
              <UnstyledLink
                className='p-2 text-lg transition-colors bg-white border border-gray-300 rounded hover:bg-gray-100'
                href='#'
              >
                <HiChevronRight />
              </UnstyledLink>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-8'
              >
                <div className='space-y-4'>
                  <h2 className='text-xl'>
                    <CustomLink
                      className='hover:text-blue-600'
                      href='/form/step-1'
                    >
                      Step 1
                    </CustomLink>
                  </h2>
                  <Input readOnly label='Nama' id='name' />
                  <Input readOnly id='email' label='Email' />
                  <PasswordInput readOnly id='password' label='Password' />
                  <Input readOnly id='age' label='Age' />
                  <Input
                    readOnly
                    id='phone'
                    label='Phone'
                    helperText='Use +62 format'
                  />
                </div>

                <div className='space-y-4'>
                  <h2 className='text-xl'>
                    <CustomLink
                      className='hover:text-blue-600'
                      href='/form/step-2'
                    >
                      Step 2
                    </CustomLink>
                  </h2>
                  <Input readOnly id='score_1' label='Score 1' />
                  <Input readOnly id='score_2' label='Score 2' />
                  <Input readOnly id='score_3' label='Score 3' />
                  <Input
                    readOnly
                    type='file'
                    id='score_file'
                    label='Score File'
                  />
                </div>

                <div className='space-y-4'>
                  <h2 className='text-xl'>
                    <CustomLink
                      className='hover:text-blue-600'
                      href='/form/step-3'
                    >
                      Step 3
                    </CustomLink>
                  </h2>
                  <DatePicker readOnly id='birth_date' label='Birth Date' />
                  <Select
                    readOnly
                    id='gender'
                    label='Gender'
                    placeholder='Choose gender'
                  >
                    <option value='L'>Male</option>
                    <option value='P'>Female</option>
                  </Select>
                </div>

                <Button type='submit'>console.log</Button>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
