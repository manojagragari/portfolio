import Hero from '../sections/Hero';
import Education from '../sections/Education';
import WebDevelopment from '../sections/WebDevelopment';
import DataScience from '../sections/DataScience';
import AndroidDevelopment from '../sections/AndroidDevelopment';
import Skills from '../sections/Skills';
import Achievements from '../sections/Achievements';
import Certifications from '../sections/Certifications';
import Hobbies from '../sections/Hobbies';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import PortfolioBackdrop from '../components/PortfolioBackdrop';

export const metadata = {
  title: 'Manoj Agrahari | Portfolio',
  description:
    'Data Science Student | Web Developer | Android Developer. B.Tech CSE student at LPU building futuristic, data-driven solutions.',
};

export default function HomePage() {
  return (
    <div className="relative">
      <PortfolioBackdrop />
      <div className="relative z-10">
        <Hero />
        <Education />
        <WebDevelopment />
        <DataScience />
        <AndroidDevelopment />
        <Skills />
        <Achievements />
        <Certifications />
        <Hobbies />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
