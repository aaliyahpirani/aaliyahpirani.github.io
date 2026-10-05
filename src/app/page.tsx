import Header from "@/components/Header";
import HomeSection from "@/components/Home";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import UgcPortfolio from "@/components/UgcPortfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FadeScroll from "@/components/FadeScroll";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <FadeScroll />
      <Header />

      <main>
        <HomeSection />

        <AboutMe />

        <Projects />

        <Experience />

        <UgcPortfolio />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}