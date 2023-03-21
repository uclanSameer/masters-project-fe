import { AuthContextProvider } from '@/context/auth-context'
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app'
import LandingLayout from '@/componenets/landing/layout';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <LandingLayout>
        <>
          <Component {...pageProps} />
        </>
      </LandingLayout>
      <ToastContainer />
    </AuthContextProvider>
  )
}
