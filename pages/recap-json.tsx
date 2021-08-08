import useFormStore from '@/store/useFormStore';

import Seo from '@/components/Seo';
import CustomLink from '@/components/CustomLink';

export default function RecapJSON() {
  const { stepOne, stepTwo, stepThree } = useFormStore();

  return (
    <>
      <Seo templateTitle='Recap JSON' />

      <main>
        <section className='bg-gray-100'>
          <article className='min-h-screen py-16 layout'>
            <h1>Recap JSON</h1>
            <CustomLink href='/form/recap' className='mt-2'>
              ← Back to recap
            </CustomLink>
            <pre className='mt-8 overflow-x-auto'>
              {JSON.stringify({ stepOne, stepTwo, stepThree }, null, 2)}
            </pre>
          </article>
        </section>
      </main>
    </>
  );
}
