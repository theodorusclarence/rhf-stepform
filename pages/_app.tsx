import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import 'react-image-lightbox/style.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Toaster
          reverseOrder={false}
          position='top-center'
          toastOptions={{
            style: {
              borderRadius: '8px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
