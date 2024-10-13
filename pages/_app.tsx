import type { AppProps } from "next/app";
import "../styles/index.css";
import { Shadows_Into_Light } from 'next/font/google';

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ['latin'],
  weight: '400', // The font weight available for "Shadows Into Light"
  display: 'swap', // Optional, for optimizing font display
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={shadowsIntoLight.className}>
      <Component {...pageProps} />
    </main>
  );
}
