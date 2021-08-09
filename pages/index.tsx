import Seo from '@/components/Seo';
import CustomLink from '@/components/CustomLink';

export default function Home() {
  return (
    <>
      <Seo />

      <main>
        <section className='bg-dark'>
          <div className='flex flex-col items-center justify-center min-h-screen text-center text-white layout'>
            <h1>
              <CustomLink href='https://github.com/theodorusclarence/rhf-stepform'>
                Step Form Example
              </CustomLink>
            </h1>
            <p className='mt-2 font-medium text-gray-400'>
              Built using React Hook Form, Yup, Typescript, and Zustand
            </p>

            <CustomLink className='mt-4' href='/form/step-1'>
              Go to form →
            </CustomLink>

            <footer className='absolute text-gray-500 bottom-2'>
              © {new Date().getFullYear()} By{' '}
              <CustomLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </CustomLink>{' '}
              &{' '}
              <CustomLink href='https://github.com/rizqitsani'>
                Muhammad Rizqi Tsani
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
