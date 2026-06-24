import Comparison from "../../components/Comparison/Comparison";
import HeroWhy from "../../components/HeroWhy/HeroWhy";
import Problem from "../../components/Problem/Problem";
import Solution from "../../components/Solution/Solution";
import Stats from "../../components/Stats/Stats";
import { Helmet } from "react-helmet-async";
export default function WhyPage() {
  return (
    <>
      <HeroWhy />
      <Problem />
      <Solution />
      <Comparison />
      <Stats />
    </>
  );
}
