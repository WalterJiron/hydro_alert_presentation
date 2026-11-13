import { Context } from "@/components/sections/context";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Install } from "@/components/sections/install";
import { Problem } from "@/components/sections/problem";
import { Showcase } from "@/components/sections/showcase";
import { Solution } from "@/components/sections/solution";

export default function Home() {
  return (
    <>
      <Hero />
      <Context />
      <Problem />
      <Solution />
      <Features />
      <Showcase />
      <Install />
      <Faq />
      <Cta />
    </>
  );
}
