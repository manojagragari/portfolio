import { Space_Grotesk, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';
import ScrollProgress from '../components/ScrollProgress';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const bodyFont = Outfit({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Manoj Agrahari | Portfolio',
  description:
    'Data Science Student | Web Developer | Android Developer. B.Tech CSE student at Lovely Professional University building futuristic solutions.',
  keywords: [
    'Manoj Agrahari',
    'Portfolio',
    'Web Developer',
    'Data Science',
    'Android Developer',
    'React',
    'Next.js',
    'Django',
    'Python',
    'LPU',
  ],
  authors: [{ name: 'Manoj Agrahari' }],
  openGraph: {
    title: 'Manoj Agrahari | Portfolio',
    description: 'Data Science Student | Web Developer | Android Developer',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Agrahari | Portfolio',
    description: 'Data Science Student | Web Developer | Android Developer',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased overflow-x-hidden">
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
