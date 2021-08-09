import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { mapSchema } from '@/lib/yup';

import Seo from '@/components/Seo';
import Input from '@/components/Forms/Input';
// @ts-ignore
const CustomMap = dynamic(() => import('@/components/CustomMap'), {
  ssr: false,
});

export default function MapPage() {
  //#region //? forms ==================================
  const methods = useForm({
    mode: 'onTouched',
    defaultValues: {
      lat: -6.1754,
      lng: 106.8272,
    },
    resolver: yupResolver(mapSchema),
  });
  const { handleSubmit } = methods;
  //#endregion forms

  //#region //? action ==================================
  const onSubmit = (data: { lat: number; lng: number }) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  //#endregion action
  return (
    <>
      <Seo templateTitle='Map Component' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Map Component</h1>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-sm mt-8 space-y-4'
              >
                <div className='flex gap-4'>
                  <Input id='lat' label='Lat' />
                  <Input id='lng' label='Long' />
                </div>
                <div className='max-w-[500px] w-full mt-8'>
                  <CustomMap />
                </div>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
