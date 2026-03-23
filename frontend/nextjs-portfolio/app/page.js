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
import ContactCollaboration from '../sections/ContactCollaboration';
import Footer from '../sections/Footer';

export const metadata = {
  title: 'Manoj Agrahari | Portfolio',
  description:
    'Data Science Student | Web Developer | Android Developer. B.Tech CSE student at LPU building futuristic, data-driven solutions.',
};

export default function HomePage() {
  return (
    <>
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
      <ContactCollaboration />
      <Footer />
    </>
  );
}
