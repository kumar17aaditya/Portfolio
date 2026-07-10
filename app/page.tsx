import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Experience from "@/components/Experience/Experience";
import Education from "@/components/Education/Education";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Certifications from "@/components/Certifications/Certifications";
import Footer from "@/components/Footer/Footer";
import ScrollProgress from "@/components/UI/ScrollProgress";
import SectionRail from "@/components/UI/SectionRail";

export default function Home() {
  return (
    <main className="relative isolate overflow-x-hidden text-white">
      <ScrollProgress />
      <SectionRail />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5%] top-24 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute right-[-2%] top-[28rem] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-[-4%] top-[68rem] h-72 w-72 rounded-full bg-violet-400/[0.07] blur-3xl" />
        <div className="absolute right-[-3%] top-[96rem] h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-3xl" />
        <div className="absolute left-[8%] top-[124rem] h-72 w-72 rounded-full bg-amber-400/[0.05] blur-3xl" />
      </div>

      <Navbar />
      <Hero />

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Experience />
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Education />
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Projects />
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Skills />
      </div>

      <section id="certificates" className="section-shell scroll-mt-28 mt-8 py-4 sm:mt-10 sm:py-6 lg:mt-12 lg:py-8">
        <Certifications />
      </section>

      <div className="mt-8 sm:mt-10 lg:mt-12">
        <Footer />
      </div>
    </main>
  );
}
