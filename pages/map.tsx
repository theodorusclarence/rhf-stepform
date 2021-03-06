import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { mapSchema } from '@/lib/yup';

import Seo from '@/components/Seo';
import Input from '@/components/Forms/Input';
import LoadingMap from '@/components/CustomMap/LoadingMap';
import clsx from 'clsx';
// @ts-ignore
const CustomMap = dynamic(() => import('@/components/CustomMap'), {
  ssr: false,
  loading: LoadingMap,
});
// @ts-ignore
const ReadOnlyMap = dynamic(
  () => import('@/components/CustomMap/ReadOnlyMap'),
  {
    ssr: false,
    loading: LoadingMap,
  }
);

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
  const { handleSubmit, watch } = methods;
  const lat = watch('lat');
  const lng = watch('lng');
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
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-12 mt-8 md:flex-row'
              >
                <figure className='w-full space-y-4'>
                  <h2>Map Component</h2>
                  <div className='flex gap-4'>
                    <Input id='lat' label='Lat' />
                    <Input id='lng' label='Long' />
                  </div>
                  <div className='w-full mt-8'>
                    <CustomMap />
                  </div>
                </figure>

                <figure className='w-full space-y-4'>
                  <h2>Read Only</h2>
                  <div className='flex gap-4'>
                    <div className='w-full'>
                      <p className='block text-sm font-normal text-gray-700'>
                        Lat
                      </p>
                      <div className='relative mt-1'>
                        <div
                          className={clsx(
                            'bg-gray-100 px-3 py-2 focus:ring-0 border cursor-not-allowed border-gray-300 focus:border-gray-300',
                            'block w-full rounded-md shadow-sm'
                          )}
                        >
                          {lat}
                        </div>
                      </div>
                    </div>
                    <div className='w-full'>
                      <p className='block text-sm font-normal text-gray-700'>
                        Long
                      </p>
                      <div className='relative mt-1'>
                        <div
                          className={clsx(
                            'bg-gray-100 px-3 py-2 focus:ring-0 border cursor-not-allowed border-gray-300 focus:border-gray-300',
                            'block w-full rounded-md shadow-sm'
                          )}
                        >
                          {lng}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full mt-8'>
                    <ReadOnlyMap />
                  </div>
                </figure>
              </form>
            </FormProvider>
          </article>
        </section>
      </main>
    </>
  );
}
