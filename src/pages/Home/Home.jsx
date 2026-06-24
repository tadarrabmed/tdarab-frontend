import React from "react";
import Hero from "../../components/Hero/Hero";
import CurriculaSection from "../../components/CurriculaSection/CurriculaSection";
import AboutSection from "../../components/AboutSection/AboutSection";
import PlanSection from "../../components/PlanSection/PlanSection";
export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <CurriculaSection />
      <PlanSection/>
    </div>
  );
}
