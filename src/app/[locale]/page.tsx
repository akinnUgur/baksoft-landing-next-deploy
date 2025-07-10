import { getDictionary, Locale } from "../lib/i18n";
import { getPageSEO } from "../lib/seo";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

interface HomePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
  const dict = await getDictionary(locale);
  return getPageSEO("home", dict, locale);
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  //const dict = await getDictionary(locale);

  return (
    <></>
    // <>
    //   <Hero dict={dict} locale={locale} />
    //   <Services dict={dict} locale={locale} />
    //   <About dict={dict} locale={locale} />
    //   <Projects dict={dict} locale={locale} />
    //   <Contact dict={dict} locale={locale} />
    // </>
  );
}
