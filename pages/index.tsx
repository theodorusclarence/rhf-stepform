import Seo from '@/components/Seo';
import CustomLink from '@/components/CustomLink';

export default function Home() {
  return (
    <>
      <Seo />

      <main>
        <section className='bg-gray-100'>
          <div className='flex flex-col items-center justify-center min-h-screen text-center layout'>
            <h1>Step Form Example</h1>
            <p className='mt-2 text-gray-600'>
              Built using React Hook Form, Yup, Typescript, and Zustand
            </p>
            <p className='mt-2 text-sm font-semibold text-gray-600'>
              <CustomLink href='https://github.com/theodorusclarence/rhf-stepform'>
                See the repository
              </CustomLink>
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
