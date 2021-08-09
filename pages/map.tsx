import Seo from '@/components/Seo';
import dynamic from 'next/dynamic';

// @ts-ignore
const CustomMap = dynamic(() => import('@/components/CustomMap'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <>
      <Seo templateTitle='Map Component' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Map Component</h1>
            <div className='max-w-[500px] w-full mt-8'>
              <CustomMap />
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
